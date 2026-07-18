import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "厦门 70 岁生日家庭行程",
  description: "一家四口从美国归来，与父母相聚。山海之间，悠然七旬；茶雾岛风，笑语相伴。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "厦门 70 岁生日家庭行程",
    description: "跨越重洋来相聚。山海之间，悠然七旬；茶雾岛风，笑语相伴。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "厦门 70 岁生日家庭行程",
    description: "跨越重洋来相聚。山海之间，悠然七旬；茶雾岛风，笑语相伴。",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
