import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-23.pages.dev"),
  title: "山海之间，万般皆是团圆 · 厦门二十二版本集成馆",
  description: "奶奶七十岁厦门家庭旅行最终集成版：二十二种设计风格与一份完整可互动行程。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "山海之间，万般皆是团圆 · 厦门二十二版本集成馆",
    description: "从原版到华侨版，二十二种风格、同一场六人团圆。",
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
    title: "山海之间，万般皆是团圆 · 厦门二十二版本集成馆",
    description: "从原版到华侨版，二十二种风格、同一场六人团圆。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
