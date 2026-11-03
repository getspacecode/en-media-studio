import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const font = Inter({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-inter",
});
const title = "EN Media Studio | Marketing agencija";
const description =
  "EN Media Studio je marketing agencija: upravljanje društvenim mrežama, video i Reels, plaćeno oglašavanje i brending. Zakažite besplatan poziv."; // keep it ~150-160 characters

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL), // required so OG image URLs resolve
  title: { default: title, template: `%s | ${SITE_NAME}` },
  description,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title,
    description,
    locale: "sr_RS",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-image-preview": "large", "max-snippet": -1 },
  },
  // verification: { google: "CODE_FROM_SEARCH_CONSOLE" },
};
export const viewport: Viewport = {
  themeColor: "#0b0a09",
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EN Media Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  sameAs: ["https://www.instagram.com/en_media_studio"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${font.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
