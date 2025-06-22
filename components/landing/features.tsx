"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Brain, BookOpen, TrendingUp, Sparkles, Shield } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Heart,
    title: "Daily Mood Tracking",
    description: "Check in with yourself daily using intuitive emoji-based mood selection and personalized insights.",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Sparkles,
    title: "AI-Generated Affirmations",
    description:
      "Receive personalized quotes and affirmations powered by Google's Gemini AI, tailored to your current mood.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Brain,
    title: "Mindfulness Exercises",
    description: "Guided breathing exercises, body scans, and grounding techniques to help you stay present and calm.",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: BookOpen,
    title: "Private Journaling",
    description: "Express your thoughts freely in a secure, private space that helps you process emotions and reflect.",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Progress Insights",
    description:
      "Visualize your emotional patterns and track your wellness journey with detailed analytics and trends.",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Complete Privacy",
    description: "Your data stays on your device. We prioritize your privacy with local storage and anonymous usage.",
    color: "text-gray-500",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    gradient: "from-gray-500 to-slate-500",
  },
]

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mental Wellness
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            SoulSync combines cutting-edge AI with proven wellness techniques to support your emotional well-being every
            day.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants} whileHover={{ y: -10, scale: 1.02 }} className="group">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 h-full overflow-hidden">
                <CardHeader>
                  <motion.div
                    whileHover="hover"
                    variants={iconVariants}
                    className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </motion.div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Decorative gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
