import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-17.pages.dev"),
  title: "山海为寿 · 奶奶七十岁厦门祝寿之旅",
  description: "三代六人的厦门祝寿行程：一家四口从美国归来，与爷爷一起陪奶奶在茶山、海岛与海湾庆祝七十岁生日。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "山海为寿 · 奶奶七十岁厦门祝寿之旅",
    description: "山海为寿，家人为福。三代六人的厦门七旬祝寿之旅。",
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
    title: "山海为寿 · 奶奶七十岁厦门祝寿之旅",
    description: "山海为寿，家人为福。三代六人的厦门七旬祝寿之旅。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
