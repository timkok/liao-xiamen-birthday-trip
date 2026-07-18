import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grandma's 70th Birthday · Our Xiamen Adventure",
  description: "After a year apart, Dudu and Chuchu fly home to celebrate Grandma's 70th birthday between Xiamen's tea hills and island breezes.",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "Grandma's 70th Birthday · Our Xiamen Adventure",
    description: "A year apart. A journey home. Six days of tea mist, island breezes, and family laughter.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grandma's 70th Birthday · Our Xiamen Adventure",
    description: "A year apart. A journey home. Six days of tea mist, island breezes, and family laughter.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
