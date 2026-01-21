import { Header } from "@/components/phish-aware/header";
import { InfographicSection } from "@/components/phish-aware/infographic/infographic-section";

export default function StatsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <InfographicSection />
      </main>
    </div>
  );
}
