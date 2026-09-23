import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/ContactSection";
import { site } from "@/lib/site";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: site.seo.title,
    template: `%s · ${site.shortName}`,
  },
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    type: "website",
  },
  icons: {
    icon: "/images/favicon.avif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="site-atmosphere flex min-h-full flex-col font-sans text-fog">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
