import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Aakash Sakhya",
    role: "College Student",
    content: "SoulSync helped me manage my anxiety during finals week. The breathing exercises are a game-changer!",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Aakirti Bhandari",
    role: "Software Developer",
    content:
      "I love how the AI gives me different affirmations based on my mood. It feels like having a personal therapist.",
    rating: 5,
    avatar: "MJ",
  },
  {
    name: "Bikalpa Kunwar",
    role: "Teacher",
    content:
      "The progress tracking feature showed me patterns I never noticed. It's incredibly insightful and motivating.",
    rating: 5,
    avatar: "ER",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Community
            </span>{" "}
            Says
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from people who've transformed their mental wellness journey with SoulSync.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-purple-400 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
