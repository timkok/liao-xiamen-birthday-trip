import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-20.pages.dev"),
  title: "班先不上了，家人先见了 · 厦门班味清零之旅",
  description: "合上电脑、静音工作群，三代六人在厦门陪奶奶过七十岁生日的班味清零行程。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "班先不上了，家人先见了 · 厦门班味清零之旅",
    description: "工作永远做不完，奶奶七十岁只有这一回。三代六人的厦门离线假期。",
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
    title: "班先不上了，家人先见了 · 厦门班味清零之旅",
    description: "工作永远做不完，奶奶七十岁只有这一回。三代六人的厦门离线假期。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
