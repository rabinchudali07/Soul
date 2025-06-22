"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

interface MoodTrackerProps {
  onMoodSubmit: (mood: string, note?: string) => void
  hasCheckedInToday: boolean
  currentMood: string
}

const moods = [
  {
    emoji: "😊",
    label: "Happy",
    value: "happy",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  {
    emoji: "😢",
    label: "Sad",
    value: "sad",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    emoji: "😰",
    label: "Anxious",
    value: "anxious",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  },
  {
    emoji: "🤩",
    label: "Excited",
    value: "excited",
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  },
  {
    emoji: "😴",
    label: "Tired",
    value: "tired",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  },
  {
    emoji: "🙏",
    label: "Grateful",
    value: "grateful",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  {
    emoji: "😤",
    label: "Stressed",
    value: "stressed",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  },
  {
    emoji: "😌",
    label: "Peaceful",
    value: "peaceful",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  },
]

export default function MoodTracker({ onMoodSubmit, hasCheckedInToday, currentMood }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState("")
  const [note, setNote] = useState("")

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSubmit(selectedMood, note)
      setNote("")
      setSelectedMood("")
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const moodVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  }

  if (hasCheckedInToday) {
    const currentMoodData = moods.find((m) => m.value === currentMood)
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50/80 via-emerald-50/80 to-teal-50/80 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 backdrop-blur-md">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, ease: "easeInOut" }}>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </motion.div>
              <CardTitle className="text-3xl text-gray-800 dark:text-white">Check-in Complete!</CardTitle>
            </motion.div>
            <CardDescription className="text-lg">
              You've already checked in today. Great job staying mindful!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
              className="text-8xl mb-6"
            >
              {currentMoodData?.emoji}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Badge className={`${currentMoodData?.color} text-lg px-4 py-2`}>
                Today you're feeling {currentMoodData?.label}
              </Badge>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-600 dark:text-gray-300 mt-6 text-lg"
            >
              Come back tomorrow for your next check-in. Remember to take care of yourself! 💚
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-rose-50/80 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20 backdrop-blur-md">
        <CardHeader>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <CardTitle className="text-3xl text-gray-800 dark:text-white">How are you feeling today?</CardTitle>
            <CardDescription className="text-lg mt-2">
              Take a moment to check in with yourself. Your feelings are valid and important.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {moods.map((mood, index) => (
              <motion.div
                key={mood.value}
                variants={moodVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedMood === mood.value ? "default" : "outline"}
                  className={`h-24 flex flex-col gap-3 transition-all duration-300 ${
                    selectedMood === mood.value
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                      : "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600"
                  }`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <motion.span
                    className="text-3xl"
                    animate={selectedMood === mood.value ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {mood.emoji}
                  </motion.span>
                  <span className="text-sm font-medium">{mood.label}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="space-y-6"
            >
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                  Want to share more about how you're feeling? (Optional)
                </label>
                <Textarea
                  placeholder="What's on your mind today? This is a safe space for your thoughts..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[120px] resize-none border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 focus:ring-purple-400 text-base"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  Complete Check-in ✨
                </Button>
              </motion.div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
