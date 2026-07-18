import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "奶奶 70 岁生日 · 厦门家庭之旅",
  description: "奶奶大病初愈，一家四口跨越重洋回来祝寿。山海之间，悠然七旬；茶雾岛风，笑语相伴。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "奶奶 70 岁生日 · 厦门家庭之旅",
    description: "久别一年，跨越重洋回来祝寿。山海之间，悠然七旬；茶雾岛风，笑语相伴。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "奶奶 70 岁生日 · 厦门家庭之旅",
    description: "久别一年，跨越重洋回来祝寿。山海之间，悠然七旬；茶雾岛风，笑语相伴。",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
