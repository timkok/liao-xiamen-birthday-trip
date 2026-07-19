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

test("server-renders the integrated version archive", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>厦门家宴之旅 · 十二版本珍藏馆<\/title>/i);
  assert.match(html, /山海之间/);
  assert.match(html, /十二种讲法/);
  assert.match(html, /同一趟旅程，十二种观看方式/);
  assert.match(html, /原版 · 山海之间/);
  assert.match(html, /现代中文版/);
  assert.match(html, /厦门 Local 版/);
  assert.match(html, /页面会有不同/);
  assert.match(html, /一家四口从美国回到广州/);
  assert.match(html, /三家餐厅 · 219 道风味/);
  assert.match(html, /8\/2 · 慢度假/);
  assert.doesNotMatch(html, /最后一晚|候选方案|待确认住宿/);
  assert.match(html, /id="itinerary"/);
  assert.match(html, /id="versions"/);
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
  assert.match(page, /liao-xiamen-birthday-trip-1\.pages\.dev/);
  assert.match(page, /liao-xiamen-birthday-trip-12\.pages\.dev/);
  assert.match(layout, /厦门家宴之旅 · 十二版本珍藏馆/);
  assert.match(layout, /liao-xiamen-birthday-trip-13\.pages\.dev/);
  assert.match(layout, /og\.png/);
  assert.match(css, /edition-grid/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
