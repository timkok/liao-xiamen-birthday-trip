import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-14.pages.dev"),
  title: "厦门留影 · 奶奶七十岁家庭旅行",
  description: "一册有旧胶片温度的厦门家庭画报：三代六人，在奶奶出生年代的色彩里，共度七十岁生日。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "厦门留影 · 奶奶七十岁家庭旅行",
    description: "从她出生的年代，走到今天的团圆。一册三代六人的厦门家庭画报。",
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
    title: "厦门留影 · 奶奶七十岁家庭旅行",
    description: "从她出生的年代，走到今天的团圆。一册三代六人的厦门家庭画报。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
