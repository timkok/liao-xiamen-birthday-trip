import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-8.pages.dev"),
  title: "一起去厦门 · 奶奶七十岁家庭旅行",
  description: "久别一年，一家四口从美国回到广州，与爷爷奶奶一起去厦门。六天、三代、一次好好团圆。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "一起去厦门 · 奶奶七十岁家庭旅行",
    description: "六天、三代、一次好好团圆。风景很好，一家人在一起更好。",
    type: "website",
    locale: "zh_CN",
    images: [{
      url: "og.png",
      width: 1536,
      height: 1024,
      alt: "一起去厦门题字下的三代六人现代家庭旅行照片",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "一起去厦门 · 奶奶七十岁家庭旅行",
    description: "六天、三代、一次好好团圆。风景很好，一家人在一起更好。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
