"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Heart, Brain, Zap, Stars } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20"
        />
        <motion.div
          variants={pulseVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
          className="absolute bottom-40 right-10 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20"
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            variants={textVariants}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 px-6 py-3 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700 shadow-lg"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Zap className="h-4 w-4 text-yellow-500" />
            </motion.div>
            AI-Powered Mental Wellness Revolution
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <Stars className="h-4 w-4 text-yellow-500" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            Your{" "}
            <motion.span
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              AI Companion
            </motion.span>
            <br />
            for{" "}
            <motion.span
              className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: 1,
              }}
            >
              Mental Wellness
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={textVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Experience the future of emotional wellness with{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">SoulSync</span> - your personalized AI
            companion that understands, supports, and grows with you every day.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={textVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-10 py-6 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                <Link href="/app" className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Heart className="h-5 w-5" />
                  </motion.div>
                  Start Your Journey
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-10 py-6 rounded-full border-2 border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
              >
                <Link href="#features" className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Brain className="h-5 w-5" />
                  </motion.div>
                  Explore Features
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={textVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-gray-200 dark:border-gray-700"
          >
            <motion.div whileHover={{ scale: 1.1, y: -5 }} className="text-center group cursor-default">
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                10,000+
              </motion.div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Daily Check-ins</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, y: -5 }} className="text-center group cursor-default">
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              >
                95%
              </motion.div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Feel More Mindful</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, y: -5 }} className="text-center group cursor-default">
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
              >
                24/7
              </motion.div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">AI Support</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 opacity-30 dark:opacity-20"
        >
          <Heart className="h-16 w-16 text-pink-400" />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
          className="absolute top-40 right-10 opacity-30 dark:opacity-20"
        >
          <Brain className="h-12 w-12 text-purple-400" />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-20 left-1/4 opacity-30 dark:opacity-20"
        >
          <Sparkles className="h-14 w-14 text-yellow-400" />
        </motion.div>
      </div>
    </section>
  )
}
