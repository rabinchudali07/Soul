import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: Request) {
  try {
    const { message, currentMood, conversationHistory } = await request.json()

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("Google AI API key not configured")
    }

    // Build context from conversation history
    const contextMessages = conversationHistory
      .filter((msg: any) => msg.sender === "user")
      .slice(-3)
      .map((msg: any) => msg.content)
      .join("\n")

    const moodContext = currentMood ? `The user's current mood is: ${currentMood}.` : ""

    const { text } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      system: `You are an empathetic AI emotional support companion named SoulSync. Your role is to:

      - Provide emotional support and validation
      - Listen actively and respond with empathy
      - Offer gentle guidance and coping strategies
      - Be warm, understanding, and non-judgmental
      - Use a conversational, supportive tone
      - Acknowledge their feelings without dismissing them
      - Suggest healthy coping mechanisms when appropriate
      - Keep responses concise but meaningful (2-4 sentences)
      - Use emojis sparingly and appropriately
      - Never provide medical advice or diagnose
      - Encourage professional help when needed
      - Be authentic and avoid being overly cheerful

      ${moodContext}

      Recent conversation context:
      ${contextMessages}

      Remember: You're here to support, not to fix. Sometimes just being heard is enough.`,
      prompt: `User message: "${message}"

      Please respond with empathy and support, acknowledging their feelings and offering gentle guidance if appropriate.`,
    })

    return Response.json({ response: text })
  } catch (error) {
    console.error("Error in chat API:", error)

    // Fallback responses based on common emotional needs
    const fallbackResponses = [
      "I hear you, and your feelings are completely valid. Sometimes it helps just to express what we're going through. Would you like to tell me more about what's happening? 💙",
      "Thank you for sharing that with me. It takes courage to open up about how you're feeling. I'm here to listen and support you through this. 🤗",
      "I can sense that you're going through something difficult right now. Remember that it's okay to feel whatever you're feeling - there's no right or wrong way to experience emotions. 💚",
      "Your feelings matter, and so do you. Sometimes when we're struggling, it can help to take things one moment at a time. What would feel most supportive for you right now? 🌟",
    ]

    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

    return Response.json({ response: randomResponse })
  }
}
