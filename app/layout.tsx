import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liao-xiamen-birthday-trip-4.pages.dev"),
  title: "Grandma at 70 · Our Little Xiamen Story",
  description: "A bright, breezy family story for Dudu and Chuchu—six slow days of tea hills, island air, and Grandma's 70th birthday.",
  icons: { icon: "favicon.svg" },
  openGraph: {
    title: "Grandma at 70 · Our Little Xiamen Story",
    description: "Tea-green hills, sea-blue skies, and the happiest family hug.",
    images: [{ url: "fresh-family-hero-v4.jpg", width: 1536, height: 1024, alt: "Our family of six between Xiamen's tea hills and the sea" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grandma at 70 · Our Little Xiamen Story",
    description: "Tea-green hills, sea-blue skies, and the happiest family hug.",
    images: ["fresh-family-hero-v4.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
