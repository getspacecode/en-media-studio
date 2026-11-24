import type { Metadata } from "next";
import Recenzije from "@/components/pages/Recenzije";
import { SITE_NAME } from "@/lib/site";

const title = "Recenzije";
const description =
  "Pročitajte iskustva klijenata EN Media Studio i ostavite svoju recenziju.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/recenzije" },
  openGraph: {
    type: "website",
    url: "/recenzije",
    siteName: SITE_NAME,
    title,
    description,
    locale: "sr_RS",
  },
};

export default function RecenzijePage() {
  return (
    <main>
      <Recenzije />
    </main>
  );
}
