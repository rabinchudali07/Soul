"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Sparkles } from "lucide-react"

const exercises = [
  {
    id: 1,
    title: "4-7-8 Breathing",
    description: "A calming breath technique to reduce anxiety and promote relaxation",
    duration: 60, // seconds
    instructions: [
      "Inhale through your nose for 4 counts",
      "Hold your breath for 7 counts",
      "Exhale through your mouth for 8 counts",
      "Repeat this cycle",
    ],
  },
  {
    id: 2,
    title: "Body Scan Meditation",
    description: "Release tension by focusing on each part of your body",
    duration: 180,
    instructions: [
      "Start at the top of your head",
      "Slowly move your attention down your body",
      "Notice any tension or sensations",
      "Breathe into areas of tension and let them relax",
    ],
  },
  {
    id: 3,
    title: "5-4-3-2-1 Grounding",
    description: "Ground yourself in the present moment using your senses",
    duration: 120,
    instructions: [
      "Name 5 things you can see",
      "Name 4 things you can touch",
      "Name 3 things you can hear",
      "Name 2 things you can smell",
      "Name 1 thing you can taste",
    ],
  },
]

export default function MindfulnessExercise() {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0])
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(selectedExercise.duration)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      // Exercise completed
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(selectedExercise.duration)
    setCurrentStep(0)
  }

  const selectExercise = (exercise: (typeof exercises)[0]) => {
    setSelectedExercise(exercise)
    setTimeLeft(exercise.duration)
    setIsActive(false)
    setCurrentStep(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((selectedExercise.duration - timeLeft) / selectedExercise.duration) * 100

  return (
    <div className="space-y-6">
      {/* Exercise Selection */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-2xl text-gray-800">Mindfulness Exercises</CardTitle>
          </div>
          <CardDescription>Take a few minutes to center yourself with these guided exercises</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {exercises.map((exercise) => (
              <Button
                key={exercise.id}
                variant={selectedExercise.id === exercise.id ? "default" : "outline"}
                className={`p-4 h-auto text-left justify-start ${
                  selectedExercise.id === exercise.id
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "hover:bg-purple-50"
                }`}
                onClick={() => selectExercise(exercise)}
              >
                <div>
                  <div className="font-medium">{exercise.title}</div>
                  <div className="text-sm opacity-80 mt-1">{exercise.description}</div>
                  <div className="text-xs opacity-60 mt-1">{formatTime(exercise.duration)}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exercise Player */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-gray-800">{selectedExercise.title}</CardTitle>
          <CardDescription>{selectedExercise.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-purple-600 mb-4">{formatTime(timeLeft)}</div>
            <Progress value={progress} className="w-full h-2" />
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleTimer}
              size="lg"
              className={`${
                isActive ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {isActive ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            <Button onClick={resetTimer} size="lg" variant="outline" className="hover:bg-gray-50">
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium text-purple-800 mb-3">Instructions:</h4>
            <ul className="space-y-2">
              {selectedExercise.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-2 text-purple-700">
                  <span className="text-purple-500 mt-1">•</span>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>

          {timeLeft === 0 && (
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-green-800 font-medium mb-2">🎉 Exercise Complete!</div>
              <p className="text-green-700 text-sm">Great job taking time for yourself. How do you feel now?</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
