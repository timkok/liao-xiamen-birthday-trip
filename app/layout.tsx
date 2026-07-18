import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "厦门 70 岁生日家庭行程",
  description: "7 月 29 日至 8 月 3 日，六人厦门山海生日之旅。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "厦门 70 岁生日家庭行程",
    description: "山海之旅 · 6 天 5 晚 · 两老两大两小",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "厦门 70 岁生日家庭行程",
    description: "山海之旅 · 6 天 5 晚",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
