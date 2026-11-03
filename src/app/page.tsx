import HomePage from "@/components/pages/Home";
import Rezultati from "@/components/pages/Rezultati";
import Usluge from "@/components/pages/Usluge";

export default function Home() {
  return (
    <main>
      <HomePage />
      <Usluge />
      <Rezultati />
    </main>
  );
}
