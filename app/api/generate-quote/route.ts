import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: Request) {
  try {
    const { mood } = await request.json()

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("Google AI API key not configured")
    }

    const { text } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      system: `You are a compassionate AI companion that generates personalized, uplifting quotes and affirmations based on someone's current mood. Your responses should be:
      - Empathetic and understanding
      - Encouraging but not dismissive of their feelings
      - Brief (1-2 sentences max)
      - Authentic and not overly cheery
      - Focused on self-compassion and growth
      - Include a relevant emoji at the end
      - Avoid clichés and generic motivational quotes
      - Make it feel personal and genuine`,
      prompt: `Generate a personalized, encouraging quote or affirmation for someone who is feeling ${mood} today. Make it feel genuine, supportive, and tailored to their emotional state.`,
    })

    return Response.json({ quote: text })
  } catch (error) {
    console.error("Error generating quote:", error)

    // Fallback quotes based on mood
    const fallbackQuotes = {
      happy: "Your joy is contagious. Keep spreading those positive vibes! ✨",
      sad: "It's okay to feel sad. Every emotion is valid, and tomorrow brings new possibilities. 🌅",
      anxious: "Take a deep breath. You are stronger than your worries, and this feeling will pass. 🌸",
      excited: "Your enthusiasm is beautiful! Channel that energy into something meaningful today. 🚀",
      tired: "Rest is not a luxury, it's a necessity. Be gentle with yourself today. 🌙",
      grateful: "Gratitude transforms ordinary moments into extraordinary blessings. 🙏",
      stressed: "You've overcome challenges before, and you'll overcome this too. One step at a time. 🌱",
      peaceful: "In this moment of peace, you've found something precious. Carry it with you. 🕊️",
    }

    const { mood } = await request.json()
    const fallbackQuote =
      fallbackQuotes[mood as keyof typeof fallbackQuotes] || "Every day is a new opportunity to grow and heal. 💚"

    return Response.json({ quote: fallbackQuote })
  }
}
