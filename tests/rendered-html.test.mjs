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

test("server-renders the 1950s Chinese family edition", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>厦门留影 · 奶奶七十岁家庭旅行<\/title>/i);
  assert.match(html, /一九五〇年代画报/);
  assert.match(html, /从她出生的年代/);
  assert.match(html, /一程山海，六帧旧时光/);
  assert.match(html, /茶山来信/);
  assert.match(html, /渡船开航/);
  assert.match(html, /七旬家宴/);
  assert.match(html, /七十年走过/);
  assert.match(html, /一家四口从美国回到广州/);
  assert.match(html, /三家餐厅 · 219 道风味/);
  assert.match(html, /8\/2 · 慢度假/);
  assert.doesNotMatch(html, /最后一晚|候选方案|待确认住宿/);
  assert.match(html, /id="itinerary"/);
  assert.match(html, /id="album"/);
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
  assert.match(page, /fiftiesChapters/);
  assert.match(layout, /厦门留影 · 奶奶七十岁家庭旅行/);
  assert.match(layout, /liao-xiamen-birthday-trip-14\.pages\.dev/);
  assert.match(layout, /og\.png/);
  assert.match(css, /fifties-story-grid/);
  assert.match(css, /fifties-family-hero-v14\.jpg/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
