import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Mao poetry trip experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>江山多娇 · 奶奶七秩家宴诗程<\/title>/i);
  assert.match(html, /读主席诗词/);
  assert.match(html, /长风浩荡/);
  assert.match(html, /主席诗词 · 六日诗引/);
  assert.match(html, /东方欲晓，莫道君行早/);
  assert.match(html, /不管风吹浪打，胜似闲庭信步/);
  assert.match(html, /待到山花烂漫时，她在丛中笑/);
  assert.match(html, /雄关漫道真如铁，而今迈步从头越/);
  assert.match(html, /奶奶病愈初安/);
  assert.match(html, /嘟嘟与楚楚已一年未见/);
  assert.match(html, /一家四口自美归穗/);
  assert.match(html, /三家餐厅 · 219 道风味/);
  assert.match(html, /8\/2 · 慢度假/);
  assert.doesNotMatch(html, /最后一晚|候选方案|待确认住宿/);
  assert.match(html, /id="itinerary"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /id="checklist"/);
  assert.doesNotMatch(html, /Your site is taking shape|Codex is working/);
});

test("keeps travel interactions and mobile image safeguards in source", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /xiamen-trip-checklist/);
  assert.match(page, /xiamen-trip-menu-selections/);
  assert.match(page, /xiamen-trip-full-menu-selections/);
  assert.match(page, /✓ 已复制/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /decoding="async"/);
  assert.match(page, /trip-overview\.webp/);
  assert.match(page, /href="trip-overview\.png" target="_blank"/);
  assert.match(layout, /江山多娇 · 奶奶七秩家宴诗程/);
  assert.match(layout, /liao-xiamen-birthday-trip-7\.pages\.dev/);
  assert.match(layout, /og\.png/);
  assert.match(css, /mao-poetry-family-hero-v7\.jpg/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
