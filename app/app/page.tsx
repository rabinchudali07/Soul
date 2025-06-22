"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Brain, BookOpen, TrendingUp, Sparkles, ArrowLeft, MessageCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import MoodTracker from "@/components/app/mood-tracker"
import MindfulnessExercise from "@/components/app/mindfulness-exercise"
import JournalEntry from "@/components/app/journal-entry"
import ProgressDashboard from "@/components/app/progress-dashboard"
import EmotionalChatbot from "@/components/app/emotional-chatbot"
import type { MoodEntry, JournalEntryType } from "@/types"

export default function SoulSyncApp() {
  const [currentMood, setCurrentMood] = useState<string>("")
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [journalEntries, setJournalEntries] = useState<JournalEntryType[]>([])
  const [dailyQuote, setDailyQuote] = useState<string>("")
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedMoodEntries = localStorage.getItem("soulsync-moods")
    const savedJournalEntries = localStorage.getItem("soulsync-journal")

    if (savedMoodEntries) {
      setMoodEntries(JSON.parse(savedMoodEntries))
    }

    if (savedJournalEntries) {
      setJournalEntries(JSON.parse(savedJournalEntries))
    }

    // Check if user has already checked in today
    const today = new Date().toDateString()
    const todayEntry = JSON.parse(savedMoodEntries || "[]").find(
      (entry: MoodEntry) => new Date(entry.date).toDateString() === today,
    )

    if (todayEntry) {
      setCurrentMood(todayEntry.mood)
      generateDailyQuote(todayEntry.mood)
    }
  }, [])

  const generateDailyQuote = async (mood: string) => {
    setIsGeneratingQuote(true)
    try {
      const response = await fetch("/api/generate-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood }),
      })

      const data = await response.json()
      setDailyQuote(data.quote)
    } catch (error) {
      console.error("Error generating quote:", error)
      // Fallback quotes based on mood
      const fallbackQuotes = {
        happy: "Your joy is contagious. Keep spreading those positive vibes and keep laughing! ✨",
        sad: "It's okay to feel sad.Let the sadness run out and be energitic 🌅",
        anxious: "Take a deep breath. You are stronger than your worries, and this feeling will pass and i am sure you will do it . 🌸",
        excited: "Your enthusiasm is beautiful! Channel that energy into something meaningful today. 🚀",
        tired: "Rest is not a luxury, it's a necessity. Be gentle with yourself today. 🌙",
        grateful: "Gratitude transforms ordinary moments into extraordinary blessings. 🙏",
        stressed: "You've overcome challenges before, and you'll overcome this too. One step at a time. 🌱",
        peaceful: "In this moment of peace, you've found something precious. Carry it with you. 🕊️",
      }
      setDailyQuote(
        fallbackQuotes[mood as keyof typeof fallbackQuotes] || "Every day is a new opportunity to grow and heal. 💚",
      )
    } finally {
      setIsGeneratingQuote(false)
    }
  }

  const handleMoodSubmit = (mood: string, note?: string) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      note: note || "",
      date: new Date().toISOString(),
    }

    const updatedEntries = [...moodEntries, newEntry]
    setMoodEntries(updatedEntries)
    setCurrentMood(mood)
    localStorage.setItem("soulsync-moods", JSON.stringify(updatedEntries))

    generateDailyQuote(mood)
  }

  const handleJournalSubmit = (entry: Omit<JournalEntryType, "id" | "date">) => {
    const newEntry: JournalEntryType = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    }

    const updatedEntries = [...journalEntries, newEntry]
    setJournalEntries(updatedEntries)
    localStorage.setItem("soulsync-journal", JSON.stringify(updatedEntries))
  }

  const today = new Date().toDateString()
  const hasCheckedInToday = moodEntries.some((entry) => new Date(entry.date).toDateString() === today)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-cyan-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            asChild
            variant="ghost"
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Heart className="h-10 w-10 text-pink-500" />
              <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              SoulSync
            </h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Daily Quote Card */}
        {currentMood && (
          <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-cyan-500/20 backdrop-blur-md">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-6 w-6 text-yellow-500 animate-spin" />
                <CardTitle className="text-2xl text-gray-800 dark:text-white">
                  Today's AI-Generated Inspiration
                </CardTitle>
                <Sparkles className="h-6 w-6 text-yellow-500 animate-spin" />
              </div>
            </CardHeader>
            <CardContent>
              {isGeneratingQuote ? (
                <div className="flex items-center justify-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span className="ml-3 text-gray-600 dark:text-gray-300">Generating your personalized message...</span>
                </div>
              ) : (
                <blockquote className="text-center text-xl text-gray-700 dark:text-gray-200 italic font-medium leading-relaxed bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  "{dailyQuote}"
                </blockquote>
              )}
            </CardContent>
          </Card>
        )}

        {/* Main Tabs */}
        <Tabs defaultValue="mood" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg rounded-2xl p-2">
            <TabsTrigger
              value="mood"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              <Heart className="h-4 w-4" />
              Mood
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="mindfulness"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              <Brain className="h-4 w-4" />
              Mindfulness
            </TabsTrigger>
            <TabsTrigger
              value="journal"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4" />
              Journal
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mood">
            <MoodTracker
              onMoodSubmit={handleMoodSubmit}
              hasCheckedInToday={hasCheckedInToday}
              currentMood={currentMood}
            />
          </TabsContent>

          <TabsContent value="chat">
            <EmotionalChatbot currentMood={currentMood} />
          </TabsContent>

          <TabsContent value="mindfulness">
            <MindfulnessExercise />
          </TabsContent>

          <TabsContent value="journal">
            <JournalEntry onSubmit={handleJournalSubmit} entries={journalEntries} />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressDashboard moodEntries={moodEntries} />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
            Remember: You are not alone in this journey. Every step forward matters. 💚
          </p>
        </div>
      </div>
    </div>
  )
}
