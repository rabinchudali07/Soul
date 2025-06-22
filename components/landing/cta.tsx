import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Sparkles } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-4 left-4 opacity-20">
            <Heart className="h-16 w-16 animate-pulse" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-20">
            <Sparkles className="h-12 w-12 animate-bounce" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Mental Wellness?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of people who are already using SoulSync to build better emotional habits and find inner
              peace using SoulSync.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold"
              >
                <Link href="/app" className="flex items-center gap-2">
                  Start Your Journey Now 
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm opacity-80">Free forever • No signup required • Complete privacy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
