"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, Smile, Target } from "lucide-react"
import type { MoodEntry } from "@/types"

interface ProgressDashboardProps {
  moodEntries: MoodEntry[]
}

export default function ProgressDashboard({ moodEntries }: ProgressDashboardProps) {
  // Calculate statistics
  const last7Days = moodEntries.filter((entry) => {
    const entryDate = new Date(entry.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return entryDate >= weekAgo
  })

  const last30Days = moodEntries.filter((entry) => {
    const entryDate = new Date(entry.date)
    const monthAgo = new Date()
    monthAgo.setDate(monthAgo.getDate() - 30)
    return entryDate >= monthAgo
  })

  const moodCounts = last7Days.reduce(
    (acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const mostFrequentMood = Object.entries(moodCounts).reduce(
    (max, [mood, count]) => (count > max.count ? { mood, count } : max),
    { mood: "", count: 0 },
  )

  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    anxious: "😰",
    excited: "🤩",
    tired: "😴",
    grateful: "🙏",
    stressed: "😤",
    peaceful: "😌",
  }

  const moodColors = {
    happy: "bg-yellow-100 text-yellow-800 border-yellow-200",
    sad: "bg-blue-100 text-blue-800 border-blue-200",
    anxious: "bg-orange-100 text-orange-800 border-orange-200",
    excited: "bg-pink-100 text-pink-800 border-pink-200",
    tired: "bg-gray-100 text-gray-800 border-gray-200",
    grateful: "bg-green-100 text-green-800 border-green-200",
    stressed: "bg-red-100 text-red-800 border-red-200",
    peaceful: "bg-purple-100 text-purple-800 border-purple-200",
  }

  const streakDays = () => {
    if (moodEntries.length === 0) return 0

    let streak = 0
    const today = new Date()

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() - i)

      const hasEntry = moodEntries.some((entry) => new Date(entry.date).toDateString() === checkDate.toDateString())

      if (hasEntry) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  const currentStreak = streakDays()

  if (moodEntries.length === 0) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <CardTitle className="text-2xl text-gray-800">Your Progress Journey</CardTitle>
          <CardDescription>Start tracking your mood to see your progress over time</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600">
            Once you begin checking in daily, you'll see insights about your emotional patterns and growth here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
            <Target className="h-5 w-5 text-purple-500 mx-auto mt-2" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{last7Days.length}</div>
            <div className="text-sm text-gray-600">Check-ins This Week</div>
            <Calendar className="h-5 w-5 text-blue-500 mx-auto mt-2" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-2">{moodEmojis[mostFrequentMood.mood as keyof typeof moodEmojis] || "😊"}</div>
            <div className="text-sm text-gray-600">Most Common Mood</div>
            <Smile className="h-5 w-5 text-green-500 mx-auto mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Weekly Mood Breakdown */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            This Week's Mood Pattern
          </CardTitle>
          <CardDescription>Understanding your emotional patterns helps you grow</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(moodCounts).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(moodCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([mood, count]) => (
                  <div key={mood} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{moodEmojis[mood as keyof typeof moodEmojis]}</span>
                      <span className="capitalize font-medium text-gray-700">{mood}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(count / last7Days.length) * 100}%` }}
                        />
                      </div>
                      <Badge className={moodColors[mood as keyof typeof moodColors]}>
                        {count} {count === 1 ? "day" : "days"}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No mood data for this week yet. Keep checking in daily!</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Entries Timeline */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Recent Check-ins</CardTitle>
          <CardDescription>Your mood journey over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {last7Days
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 7)
              .map((entry) => (
                <div key={entry.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{moodEmojis[entry.mood as keyof typeof moodEmojis]}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="capitalize font-medium text-gray-800">{entry.mood}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    {entry.note && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{entry.note}</p>}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Encouragement */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6 text-center">
          <div className="text-2xl mb-3">🌟</div>
          <h3 className="font-semibold text-gray-800 mb-2">Keep Going!</h3>
          <p className="text-gray-600 text-sm">
            {currentStreak > 0
              ? `You're on a ${currentStreak}-day streak! Consistency is key to understanding your emotional patterns.`
              : "Every check-in is a step toward better self-awareness. You're doing great!"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
