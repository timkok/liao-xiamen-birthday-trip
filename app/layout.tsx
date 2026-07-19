import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-13.pages.dev"),
  title: "厦门家宴之旅 · 十二版本珍藏馆",
  description: "以第一版完整行程为基础，集中收藏厦门七十岁生日家庭旅行的十二种视觉与文字版本。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "厦门家宴之旅 · 十二版本珍藏馆",
    description: "同一场六人团圆，十二种观看方式。选择你喜欢的版本。",
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
    title: "厦门家宴之旅 · 十二版本珍藏馆",
    description: "同一场六人团圆，十二种观看方式。选择你喜欢的版本。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
