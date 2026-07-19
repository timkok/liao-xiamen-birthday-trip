import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-19.pages.dev"),
  title: "六个人，终于又在一起 · 厦门团聚之旅",
  description: "爷爷、奶奶、爸爸、妈妈、嘟嘟和楚楚全员到齐，三代六人的厦门团聚行程。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "六个人，终于又在一起 · 厦门团聚之旅",
    description: "六个人，一个都不少。三代六人的厦门全员团聚之旅。",
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
    title: "六个人，终于又在一起 · 厦门团聚之旅",
    description: "六个人，一个都不少。三代六人的厦门全员团聚之旅。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
