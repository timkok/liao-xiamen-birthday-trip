import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-22.pages.dev"),
  title: "越过重洋，归来有家 · 厦门华侨归乡之旅",
  description: "一家四口从美国归来，与爷爷奶奶在厦门团聚，为奶奶庆祝七十岁生日。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "越过重洋，归来有家 · 厦门华侨归乡之旅",
    description: "从美国到广州再到厦门，六个人用一场旅行写成跨洋家书。",
    type: "website",
    locale: "zh_CN",
    images: [{
      url: "og.png",
      width: 1536,
      height: 1024,
      alt: "厦门七十岁生日六日家庭行程总览",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "越过重洋，归来有家 · 厦门华侨归乡之旅",
    description: "从美国到广州再到厦门，六个人用一场旅行写成跨洋家书。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
