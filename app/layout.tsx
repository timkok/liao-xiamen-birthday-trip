import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-5.pages.dev"),
  title: "山海入画 · 奶奶七秩家宴行笺",
  description: "奶奶病愈初安，一家四口自美归穗，三代六人同赴鹭岛。茶烟作引，海风为伴，把久别写成团圆。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "山海入画 · 奶奶七秩家宴行笺",
    description: "山海入画，七秩生辉；三代同游，共贺团圆。",
    type: "website",
    locale: "zh_CN",
    images: [{
      url: "ancient-family-hero-v5.jpg",
      width: 1536,
      height: 1024,
      alt: "三代六人行于安溪茶山与厦门海湾之间的青绿山水画",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "山海入画 · 奶奶七秩家宴行笺",
    description: "山海入画，七秩生辉；三代同游，共贺团圆。",
    images: ["ancient-family-hero-v5.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
