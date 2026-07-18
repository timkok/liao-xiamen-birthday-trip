import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-6.pages.dev"),
  title: "山海有诗 · 奶奶七秩家宴诗笺",
  description: "奶奶病愈初安，一家四口自美归穗，三代六人同赴鹭岛。六日六阕，以山海为韵，以团圆收笔。",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "山海有诗 · 奶奶七秩家宴诗笺",
    description: "六日风物写成六阕小诗，句句是久别，行行皆团圆。",
    type: "website",
    locale: "zh_CN",
    images: [{
      url: "og.png",
      width: 1536,
      height: 1024,
      alt: "山海有诗团圆成章的三代六人厦门家庭旅行诗画",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "山海有诗 · 奶奶七秩家宴诗笺",
    description: "六日风物写成六阕小诗，句句是久别，行行皆团圆。",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
