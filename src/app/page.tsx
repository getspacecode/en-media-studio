import Faq from "@/components/pages/FAQ";
import HomePage from "@/components/pages/Home";
import Paketi from "@/components/pages/Paketi";
import Proces from "@/components/pages/Proces";
import Rezultati from "@/components/pages/Rezultati";
import Usluge from "@/components/pages/Usluge";

export default function Home() {
  return (
    <main>
      <HomePage />
      <Usluge />
      <Rezultati />
      <Proces />
      <Paketi />
      <Faq />
    </main>
  );
}
