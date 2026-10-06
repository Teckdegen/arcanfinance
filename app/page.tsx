import { Applications } from "@/components/Applications";
import { Checks } from "@/components/Checks";
import { Coordination } from "@/components/Coordination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { UseCases } from "@/components/UseCases";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <UseCases />
      <Checks />
      <Coordination />
      <Applications />
      <Footer />
    </div>
  );
}
