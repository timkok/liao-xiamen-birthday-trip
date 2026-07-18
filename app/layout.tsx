import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-7.pages.dev"),
  title: "江山多娇 · 奶奶七秩家宴诗程",
  description: "借毛主席诗词中的红日、长风、青山与沧海，记录三代六人的厦门团圆之旅。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "江山多娇 · 奶奶七秩家宴诗程",
    description: "读主席诗词，看山海今朝，贺奶奶七秩。",
    type: "website",
    locale: "zh_CN",
    images: [{
      url: "og.png",
      width: 1536,
      height: 1024,
      alt: "江山如此多娇题字下的三代六人厦门家庭旅行画卷",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "江山多娇 · 奶奶七秩家宴诗程",
    description: "读主席诗词，看山海今朝，贺奶奶七秩。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
