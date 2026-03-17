"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useThemeLanguage } from "@/components/theme-language-provider"

// Traducciones
const translations = {
  es: {
    welcome: "¡Hola! Soy Nicole (bueno, mi versión asistente IA ✨). Estoy aquí para que puedas conocer rápido mi experiencia, mis proyectos y en qué te puedo aportar. ¿Por dónde te gustaría empezar?",
    clearWelcome: "¡Hola! Soy Nicole (mi versión asistente IA ✨). Si quieres, te cuento de mis proyectos de IA con visión por computador, mis experiencias en hackathons o mi trabajo en Fundación Bolívar Davivienda.",
    contactTitle: "Contacto directo conmigo",
    contactSubtitle: "Elige el canal que prefieras y hablamos.",
    contactText: "Puedes contactarme directamente a través de estos canales seguros:",
    contactButton: "Formulario",
    whatsapp: "WhatsApp",
    email: "Email"
  },
  en: {
    welcome: "Hello! I'm Nicole (well, my AI assistant version ✨). I'm here to help you quickly learn about my experience, my projects, and what I can contribute to you. Where would you like to start?",
    clearWelcome: "Hello! I'm Nicole (my AI assistant version ✨). If you want, I can tell you about my AI projects with computer vision, my hackathon experiences, or my work at Fundación Bolívar Davivienda.",
    contactTitle: "Contact me directly",
    contactSubtitle: "Choose the channel you prefer and let's talk.",
    contactText: "You can contact me directly through these secure channels:",
    contactButton: "Form",
    whatsapp: "WhatsApp",
    email: "Email"
  }
}

export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  html?: string
}

interface UseChatAssistantResult {
  messages: ChatMessage[]
  inputValue: string
  isLoading: boolean
  setInputValue: (value: string) => void
  handleSendMessage: () => Promise<void>
  handleSuggestedQuestion: (question: string) => void
  clearChat: () => void
  sendContactMessage: () => void
}

export function useChatAssistant(): UseChatAssistantResult {
  const { toast } = useToast()
  const { language } = useThemeLanguage()
  const t = translations[language as keyof typeof translations]

  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: "welcome",
    content: t.welcome,
    sender: "ai",
    timestamp: new Date(),
  }])

  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim()
    if (!trimmedInput || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: trimmedInput,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev.slice(-4), userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const payload = {
        messages: [...messages, userMessage].map((m) => ({
          role: m.sender === "ai" ? "assistant" : "user",
          content: m.content,
        })),
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Error al comunicarse con el asistente IA")
      }

      const data = await res.json()

      const aiResponse = typeof data.response === "string" && data.response.trim().length > 0
        ? data.response
        : "Por ahora no pude responderte bien desde la IA, pero si quieres puedes preguntarme sobre mi experiencia, proyectos o habilidades técnicas."

      // Check if response contains HTML button
      const hasHtmlButton = aiResponse.includes('<button onclick=')
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: hasHtmlButton ? aiResponse.split('<button')[0].trim() : aiResponse,
        html: hasHtmlButton ? aiResponse : undefined,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev.slice(-4), aiMessage])
    } catch (error) {
      console.error("Error al enviar mensaje:", error)
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      content: t.clearWelcome,
      sender: "ai",
      timestamp: new Date(),
    }])
    setInputValue("")
  }

  const sendContactMessage = () => {
    const protectionMessage = "Por seguridad y privacidad, no comparto mi información de contacto directa aquí. Puedes contactarme fácilmente usando los botones de WhatsApp y correo que encontrarás en mi portafolio. ¡Te responderé lo antes posible!"

    const contactHtml = `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 100%; padding-left: 42px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-left: -42px;">
          <img src="/profile-photo.jpg" alt="Profile Photo" style="height: 32px; width: 32px; border-radius: 9999px; object-fit: cover; flex-shrink: 0;"/>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <span style="font-size: 14px; font-weight: 600; color: #111827;">${t.contactTitle}</span>
            <span style="font-size: 12px; color: #6b7280;">${t.contactSubtitle}</span>
          </div>
        </div>

        <div style="font-size: 13px; color: #111827; margin-top: 4px; line-height: 1.5;">
          ${protectionMessage}
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
          <button
            onclick="window.open('https://wa.me/573172865521', '_blank')"
            style="padding: 8px 14px; border-radius: 9999px; background-color: #22c55e; color: white; font-size: 12px; font-weight: 600; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 8px 16px rgba(34,197,94,0.25); transition: all 0.2s ease;"
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 10px 20px rgba(34,197,94,0.3)';"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 16px rgba(34,197,94,0.25)';"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>${t.whatsapp}</span>
          </button>
          <button
            onclick="window.open('/#contact', '_self')"
            style="padding: 8px 14px; border-radius: 9999px; background-color: #020617; color: white; font-size: 12px; font-weight: 600; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 8px 16px rgba(15,23,42,0.25); transition: all 0.2s ease;"
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 10px 20px rgba(15,23,42,0.3)';"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 16px rgba(15,23,42,0.25)';"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m22 7-10 5L2 7"></path>
            </svg>
            <span>${t.email}</span>
          </button>
        </div>
      </div>
    `

    const contactMessage: ChatMessage = {
      id: `contact-${Date.now()}`,
      content: protectionMessage,
      html: contactHtml,
      sender: "ai",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev.slice(-4), contactMessage])
  }

  return {
    messages,
    inputValue,
    isLoading,
    setInputValue,
    handleSendMessage,
    handleSuggestedQuestion,
    clearChat,
    sendContactMessage,
  }
}
