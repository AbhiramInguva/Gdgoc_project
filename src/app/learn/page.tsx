import { PhishingEducationSection } from "@/components/phish-aware/phishing-education-section";
import { Header } from "@/components/phish-aware/header";

export default function LearnPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <PhishingEducationSection />
      </main>
    </div>
  );
}
