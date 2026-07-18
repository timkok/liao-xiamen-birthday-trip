import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "厦门 70 岁生日家庭行程",
  description: "7 月 29 日至 8 月 2 日，六人厦门山海生日之旅。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "厦门 70 岁生日家庭行程",
    description: "山海之旅 · 5 天 4 晚 · 两老两大两小",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "厦门 70 岁生日家庭行程" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "厦门 70 岁生日家庭行程",
    description: "山海之旅 · 5 天 4 晚",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
