import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import HowItWorks from "@/components/landing/how-it-works"
import Testimonials from "@/components/landing/testimonials"
import DeveloperCard from "@/components/landing/developer-card"
import CTA from "@/components/landing/cta"
import Footer from "@/components/landing/footer"
import Navbar from "@/components/landing/navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-cyan-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <DeveloperCard />
      <CTA />
      <Footer />
    </div>
  )
}