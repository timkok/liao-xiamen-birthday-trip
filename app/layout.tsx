import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-10.pages.dev"),
  title: "南洋花影 · 奶奶七十岁家庭纪行",
  description: "一家四口自美国归来，与爷爷奶奶赴厦门过七十岁生日。沿茶雾、骑楼与海风，写下六人的南洋家庭纪行。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "南洋花影 · 奶奶七十岁家庭纪行",
    description: "六个人、六天，在茶雾、骑楼与海风之间赴一席七旬家宴。",
    type: "website",
    locale: "zh_CN",
    images: [{
      url: "og.png",
      width: 1536,
      height: 1024,
      alt: "南洋花影题字下的三代六人厦门家庭旅行照片",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "南洋花影 · 奶奶七十岁家庭纪行",
    description: "六个人、六天，在茶雾、骑楼与海风之间赴一席七旬家宴。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
