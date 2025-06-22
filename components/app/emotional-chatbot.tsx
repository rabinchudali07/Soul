"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Sparkles, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface EmotionalChatbotProps {
  currentMood: string
}

export default function EmotionalChatbot({ currentMood }: EmotionalChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      content: currentMood
        ? `Hello! I can see you're feeling ${currentMood} today. I'm here to listen and support you. How can I help you right now? 💙`
        : "Hello! I'm your emotional support companion. I'm here to listen, understand, and help you navigate your feelings. What's on your mind today? 💙",
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [currentMood])

  // Smart scroll (only scrolls to bottom if already near bottom)
  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (!scrollArea) return

    const isAtBottom =
      scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight < 50

    if (isAtBottom) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage.trim(),
          currentMood,
          conversationHistory: messages.slice(-5),
        }),
      })

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. Remember, your feelings are valid and you're not alone. 💙",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-cyan-50/80 via-blue-50/80 to-indigo-50/80 dark:from-gray-800/80 dark:via-blue-900/20 dark:to-indigo-900/20 backdrop-blur-md h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <MessageCircle className="h-8 w-8" />
            <Sparkles className="h-4 w-4 absolute -top-1 -right-1 animate-pulse text-yellow-300" />
          </div>
          <div>
            <CardTitle className="text-2xl">Emotional Support Chat</CardTitle>
            <CardDescription className="text-cyan-100">
             Your AI companion is here to listen and support you 24/7.

            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages Area */}
        <ScrollArea
          className="flex-1 p-4 overflow-y-auto"
          ref={scrollAreaRef}
        >
          <div className="flex flex-col gap-4 break-words">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] break-words whitespace-pre-wrap rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "bot" && (
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mt-1">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                    )}
                    {message.sender === "user" && (
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mt-1 order-2">
                        <User className="h-3 w-3 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-purple-100"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 rounded-2xl px-4 py-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-600 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="flex-1 border-gray-300 dark:border-gray-600 focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl px-6"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Press Enter to send • Your conversations are private and secure
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
