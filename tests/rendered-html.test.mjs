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

test("server-renders the relaxed resort Chinese family edition", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>慢享厦门 · 奶奶七十岁家庭假期<\/title>/i);
  assert.match(html, /SIX DAYS OF SUN, SEA &amp; FAMILY/);
  assert.match(html, /这一程，不赶风景/);
  assert.match(html, /六天，把时间还给家人/);
  assert.match(html, /茶山舒展/);
  assert.match(html, /海岛散步/);
  assert.match(html, /家宴时光/);
  assert.match(html, /六个人都笑得很轻松/);
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
  assert.match(page, /resortChapters/);
  assert.match(layout, /慢享厦门 · 奶奶七十岁家庭假期/);
  assert.match(layout, /liao-xiamen-birthday-trip-16\.pages\.dev/);
  assert.match(layout, /og\.png/);
  assert.match(css, /resort-story-grid/);
  assert.match(css, /resort-family-hero-v16\.jpg/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
