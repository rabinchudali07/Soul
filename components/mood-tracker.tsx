"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface MoodTrackerProps {
  onMoodSubmit: (mood: string, note?: string) => void
  hasCheckedInToday: boolean
  currentMood: string
}

const moods = [
  { emoji: "😊", label: "Happy", value: "happy", color: "bg-yellow-100 text-yellow-800" },
  { emoji: "😢", label: "Sad", value: "sad", color: "bg-blue-100 text-blue-800" },
  { emoji: "😰", label: "Anxious", value: "anxious", color: "bg-orange-100 text-orange-800" },
  { emoji: "🤩", label: "Excited", value: "excited", color: "bg-pink-100 text-pink-800" },
  { emoji: "😴", label: "Tired", value: "tired", color: "bg-gray-100 text-gray-800" },
  { emoji: "🙏", label: "Grateful", value: "grateful", color: "bg-green-100 text-green-800" },
  { emoji: "😤", label: "Stressed", value: "stressed", color: "bg-red-100 text-red-800" },
  { emoji: "😌", label: "Peaceful", value: "peaceful", color: "bg-purple-100 text-purple-800" },
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

  if (hasCheckedInToday) {
    const currentMoodData = moods.find((m) => m.value === currentMood)
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <CardTitle className="text-2xl text-gray-800">Check-in Complete!</CardTitle>
          </div>
          <CardDescription>You've already checked in today. Great job staying mindful!</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl mb-4">{currentMoodData?.emoji}</div>
          <Badge className={currentMoodData?.color}>Today you're feeling {currentMoodData?.label}</Badge>
          <p className="text-gray-600 mt-4">
            Come back tomorrow for your next check-in. Remember to take care of yourself! 💚
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800">How are you feeling today?</CardTitle>
        <CardDescription>
          Take a moment to check in with yourself. Your feelings are valid and important.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {moods.map((mood) => (
            <Button
              key={mood.value}
              variant={selectedMood === mood.value ? "default" : "outline"}
              className={`h-20 flex flex-col gap-2 transition-all duration-200 ${
                selectedMood === mood.value
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "hover:bg-purple-50 hover:border-purple-300"
              }`}
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-sm">{mood.label}</span>
            </Button>
          ))}
        </div>

        {selectedMood && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Want to share more about how you're feeling? (Optional)
              </label>
              <Textarea
                placeholder="What's on your mind today? This is a safe space for your thoughts..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
              size="lg"
            >
              Complete Check-in
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
