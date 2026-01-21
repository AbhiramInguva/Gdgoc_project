import { CybersecurityNewsSection } from "@/components/phish-aware/cybersecurity-news-section";
import { Header } from "@/components/phish-aware/header";

export default function NewsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <CybersecurityNewsSection />
      </main>
    </div>
  );
}
