import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-18.pages.dev"),
  title: "走得再远，牵挂总在身边 · 厦门亲情之旅",
  description: "一家四口从美国归来，与爷爷奶奶久别重逢；三代六人在厦门重新好好相处的家庭旅程。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "走得再远，牵挂总在身边 · 厦门亲情之旅",
    description: "隔山隔海，还是一家。三代六人的厦门久别重逢之旅。",
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
    title: "走得再远，牵挂总在身边 · 厦门亲情之旅",
    description: "隔山隔海，还是一家。三代六人的厦门久别重逢之旅。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
