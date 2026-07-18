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

test("server-renders the literary trip experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Grandma&#x27;s 70th Birthday · Our Xiamen Adventure<\/title>/i);
  assert.match(html, /Between Mountains &amp; Sea/);
  assert.match(html, /Grandma Turns 70/);
  assert.match(html, /Dudu, 12, and Chuchu, 9/);
  assert.match(html, /have not seen her for a whole year/);
  assert.match(html, /our family of four flies home from America/);
  assert.match(html, /3 RESTAURANTS · 219 ORIGINAL DISHES/);
  assert.match(html, /Aug 2 · Slow Day/);
  assert.doesNotMatch(html, /最后一晚|候选方案|待确认住宿|final night/i);
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
  assert.match(page, /✓ Copied/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /decoding="async"/);
  assert.match(page, /trip-overview\.webp/);
  assert.match(page, /href="trip-overview\.png" target="_blank"/);
  assert.match(layout, /Grandma's 70th Birthday/);
  assert.match(css, /--gold:#c79a55/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
