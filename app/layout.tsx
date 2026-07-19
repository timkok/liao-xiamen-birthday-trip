import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-21.pages.dev"),
  title: "向海出发，向未来生长 · 厦门七十岁家庭之旅",
  description: "三代六人在厦门为奶奶庆祝七十岁，也写下给十年后全家的温暖明信片。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "向海出发，向未来生长 · 厦门七十岁家庭之旅",
    description: "七十不是抵达，是一家人下一程的起点。三代六人的厦门未来序章。",
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
    title: "向海出发，向未来生长 · 厦门七十岁家庭之旅",
    description: "七十不是抵达，是一家人下一程的起点。三代六人的厦门未来序章。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
