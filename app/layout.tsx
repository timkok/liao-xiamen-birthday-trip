import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-16.pages.dev"),
  title: "慢享厦门 · 奶奶七十岁家庭假期",
  description: "三代六人的厦门度假休闲行程：少走慢游、午休优先，在茶山、海岛与海湾共度奶奶七十岁生日。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "慢享厦门 · 奶奶七十岁家庭假期",
    description: "这一程，不赶风景，只享团圆。三代六人的轻松厦门假期。",
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
    title: "慢享厦门 · 奶奶七十岁家庭假期",
    description: "这一程，不赶风景，只享团圆。三代六人的轻松厦门假期。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
