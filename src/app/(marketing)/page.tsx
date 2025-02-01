import { HeroSection } from "@/components/marketing/hero-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { WhyUsSection } from "@/components/marketing/why-us-section"
import { Footer } from "@/components/marketing/footer"
import { MarketingNav } from "@/components/marketing/nav"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNav />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <WhyUsSection />
      </main>
      <Footer />
    </div>
  )
} 