import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-15.pages.dev"),
  title: "厦门盛夏 · 奶奶七十岁海岸假期",
  description: "一册有国际海岸度假感的中文家庭旅行特刊：三代六人，在厦门共度奶奶七十岁生日。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "厦门盛夏 · 奶奶七十岁海岸假期",
    description: "山海正盛，我们恰好团圆。三代六人的厦门盛夏家宴。",
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
    title: "厦门盛夏 · 奶奶七十岁海岸假期",
    description: "山海正盛，我们恰好团圆。三代六人的厦门盛夏家宴。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
