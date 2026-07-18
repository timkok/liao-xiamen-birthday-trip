import { readFile, writeFile } from "node:fs/promises";

const source = new URL("../data/restaurant-menus.tsv", import.meta.url);
const target = new URL("../app/restaurant-menus.json", import.meta.url);
const text = await readFile(source, "utf8");
const lines = text.trim().split(/\r?\n/);

const rows = lines.slice(1).map((line, index) => {
  const [restaurant, section, name, price, unit, notes = ""] = line.split("\t");
  return {
    id: index,
    restaurant: restaurant.trim(),
    section: section.trim(),
    name: name.trim(),
    price: Number(price),
    unit: unit.trim(),
    notes: notes.trim(),
    spicy: /辣|🌶️/.test(notes),
    preorder: /提前|预定|预订/.test(notes),
  };
});

await writeFile(target, `${JSON.stringify(rows, null, 2)}\n`);
console.log(`Generated ${rows.length} menu items.`);
