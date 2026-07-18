import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "厦门 70 岁生日家庭行程",
  description: "从安溪茶雾到厦门海风，六位家人的七十岁生日山海之旅。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "厦门 70 岁生日家庭行程",
    description: "借一程山海，陪七十岁慢慢生光 · 六位家人的厦门生日之旅",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "厦门 70 岁生日家庭行程",
    description: "借一程山海，陪七十岁慢慢生光",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
