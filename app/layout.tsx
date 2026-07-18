import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-9.pages.dev"),
  title: "厦门开玩！· 奶奶七十岁家庭旅行",
  description: "一家四口从美国回到广州，和爷爷奶奶组队去厦门。六个人、六天、一个奶奶 C 位的生日旅行。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "厦门开玩！· 奶奶七十岁家庭旅行",
    description: "六个人、六天、一个奶奶 C 位的生日旅行。",
    type: "website",
    locale: "zh_CN",
    images: [{
      url: "og.png",
      width: 1536,
      height: 1024,
      alt: "厦门开玩题字下的三代六人年轻活力家庭旅行照片",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "厦门开玩！· 奶奶七十岁家庭旅行",
    description: "六个人、六天、一个奶奶 C 位的生日旅行。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
