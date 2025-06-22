"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Heart } from "lucide-react"
import type { JournalEntryType } from "@/types"

interface JournalEntryProps {
  onSubmit: (entry: Omit<JournalEntryType, "id" | "date">) => void
  entries: JournalEntryType[]
}

export default function JournalEntry({ onSubmit, entries }: JournalEntryProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit({
        title: title.trim() || "Untitled Entry",
        content: content.trim(),
        mood: mood || "neutral",
      })
      setTitle("")
      setContent("")
      setMood("")
    }
  }

  const moodColors = {
    happy: "bg-yellow-100 text-yellow-800",
    sad: "bg-blue-100 text-blue-800",
    anxious: "bg-orange-100 text-orange-800",
    excited: "bg-pink-100 text-pink-800",
    tired: "bg-gray-100 text-gray-800",
    grateful: "bg-green-100 text-green-800",
    stressed: "bg-red-100 text-red-800",
    peaceful: "bg-purple-100 text-purple-800",
    neutral: "bg-gray-100 text-gray-800",
  }

  return (
    <div className="space-y-6">
      {/* New Entry Form */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-2xl text-gray-800">Journal Entry</CardTitle>
          </div>
          <CardDescription>
            This is your private space to reflect, process, and grow. Write freely and honestly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Title (Optional)</label>
            <Input
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">How are you feeling right now?</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(moodColors).map((moodOption) => (
                <Button
                  key={moodOption}
                  variant={mood === moodOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMood(moodOption)}
                  className={`capitalize ${
                    mood === moodOption ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-blue-50"
                  }`}
                >
                  {moodOption}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Your thoughts</label>
            <Textarea
              placeholder="What's on your mind? Write about your day, your feelings, your dreams, your challenges... This is your safe space."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            size="lg"
          >
            Save Entry
          </Button>
        </CardContent>
      </Card>

      {/* Previous Entries */}
      {entries.length > 0 && (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              Your Journal History
            </CardTitle>
            <CardDescription>Reflect on your journey and see how far you've come</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {entries
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((entry) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{entry.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={moodColors[entry.mood as keyof typeof moodColors]}>{entry.mood}</Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {entry.content.length > 200 ? `${entry.content.substring(0, 200)}...` : entry.content}
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
