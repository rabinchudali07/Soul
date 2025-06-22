import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Heart, Brain, TrendingUp } from "lucide-react"

const steps = [
  {
    step: 1,
    icon: Heart,
    title: "Check In Daily",
    description: "Start each day by selecting how you're feeling with our intuitive mood tracker.",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    step: 2,
    icon: Brain,
    title: "Get AI Support",
    description: "Receive personalized affirmations and mindfulness exercises tailored to your current state.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    step: 3,
    icon: TrendingUp,
    title: "Track Progress",
    description: "Watch your emotional patterns emerge and celebrate your growth over time.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">SoulSync</span>{" "}
            Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, effective, and designed to fit seamlessly into your daily routine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-pink-300 to-purple-300 transform -translate-y-1/2"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 transform -translate-y-1/2"></div>

          {steps.map((step, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 relative"
            >
              <CardContent className="p-8 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mx-auto mb-6 mt-4`}
                >
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="h-4 w-4" />
            Free to use, no signup required
          </div>
        </div>
      </div>
    </section>
  )
}
