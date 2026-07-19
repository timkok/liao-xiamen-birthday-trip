import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-12.pages.dev"),
  title: "厦门慢慢来 · 奶奶七十岁 LOCAL 家庭旅行",
  description: "一家四口从美国归来，与爷爷奶奶按厦门本地人的节奏过生日：喝茶、坐船、骑楼觅食、围桌呷饭。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "厦门慢慢来 · 奶奶七十岁 LOCAL 家庭旅行",
    description: "六个人、六天，不赶打卡点，去红砖榕树与闽南烟火里好好团圆。",
    type: "website",
    locale: "zh_CN",
    images: [{
      url: "og.png",
      width: 1536,
      height: 1024,
      alt: "厦门慢慢来题字下，三代六人在榕树红砖院落吃早餐",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "厦门慢慢来 · 奶奶七十岁 LOCAL 家庭旅行",
    description: "六个人、六天，不赶打卡点，去红砖榕树与闽南烟火里好好团圆。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
