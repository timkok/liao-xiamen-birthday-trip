import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-11.pages.dev"),
  title: "海风轻轻 · 奶奶七十岁家庭旅行",
  description: "一家四口从美国归来，与爷爷奶奶去厦门慢慢相聚。六个人、六天，一场轻松明亮的七十岁生日旅行。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "海风轻轻 · 奶奶七十岁家庭旅行",
    description: "六个人、六天，在茶山、岛风与海湾之间慢慢相聚。",
    type: "website",
    locale: "zh_CN",
    images: [{
      url: "og.png",
      width: 1536,
      height: 1024,
      alt: "海风轻轻题字下的三代六人厦门家庭旅行照片",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "海风轻轻 · 奶奶七十岁家庭旅行",
    description: "六个人、六天，在茶山、岛风与海湾之间慢慢相聚。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
