"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, User, Bot, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useChatAssistant, type ChatMessage as Message } from "@/hooks/use-chat-assistant"

// Contexto de la IA con información detallada
const aiContext = {
  name: "Nicole Paez",
  role: "Desarrolladora enfocada en IA con visión por computador, frontend y experiencias digitales",
  experience: {
    education: [
      "🎓 Técnico en Programación de Software — SENA",
      "🎓 Tecnólogo en Análisis y Desarrollo de Software — SENA (Fábrica de Software)",
      "🏅 3er puesto en Competencia Nacional Senasoft",
      "🏅 3er puesto en Hackathon MinTIC"
    ],
    work: [
      "💼 1 año en Fábrica de Software (SENA) - Proyecto de IA y visión por computadora",
      "💼 1 año en Fundación Bolívar Davivienda - Prácticas profesionales"
    ],
    skills: {
      ai: ["YOLO", "TensorFlow", "MediaPipe", "OpenCV", "MobileNet", "Visión por Computadora", "Procesamiento de Imágenes"],
      backend: ["Java", "Spring Boot", "PostgreSQL", "DTOs", "Servicios", "Repositorios", "Modelado 3NF"],
      frontend: ["React", "Vite", "Tailwind", "styled-components", "Diseño Responsivo"],
      mobile: ["React Native", "Expo", "Expo Router", "Google Auth"],
      automation: ["Google AppScript", "Automatización de Procesos"],
      uiux: ["Diseño de interfaces", "Prototipado", "Experiencia de usuario", "Diseño Centrado en el Usuario"]
    },
    projects: [
      {
        name: "👐 Reconocimiento de Lengua de Señas Colombiana (LSC)",
        description: "Sistema avanzado de reconocimiento de lengua de señas usando visión por computadora y aprendizaje profundo.",
        technologies: ["YOLO", "TensorFlow", "MediaPipe", "OpenCV", "Python", "Numpy"],
        achievements: [
          "3er puesto en competencia nacional Senasoft",
          "Desarrollo de dataset propio con cientos de secuencias",
          "Implementación en tiempo real con predicción precisa",
          "Aprendizaje de LSC para mejor comprensión del contexto"
        ]
      },
      {
        name: "📱 Turnito - App de Gestión de Turnos",
        description: "Aplicación móvil para gestión de turnos con autenticación de Google y diseño intuitivo.",
        technologies: ["React Native", "Expo", "Google Auth", "UI/UX Design"],
        achievements: [
          "Diseño de interfaz limpia y funcional",
          "Implementación de navegación fluida",
          "Componentes reutilizables y optimizados"
        ]
      },
      {
        name: "🛡️ CiberHero - Plataforma de Aprendizaje en Ciberseguridad",
        description: "Plataforma gamificada para enseñanza de conceptos de ciberseguridad.",
        technologies: ["React", "Node.js", "MongoDB", "Gamificación"],
        achievements: [
          "3er puesto nacional en Hackathon MinTIC",
          "Diseño centrado en la experiencia de aprendizaje",
          "Implementación de mecánicas de juego educativas"
        ]
      }
    ],
    contests: [
      "🥉 3er puesto en competencia nacional Senasoft con un proyecto que ayudaba al medio ambiente reduciendo el desperdicio de comida",
      "🥉 3er puesto nacional en Hackathon MinTIC con CiberHero, una plataforma de aprendizaje en ciberseguridad",
    ],
  },
  level: "Desarrolladora junior con experiencia práctica en proyectos reales",
  salaryRange: "Entre 3'500.000 y 4'000.000 COP mensuales",
  strengths: [
    "Aprendo rápido tecnologías nuevas",
    "Me gusta mucho cuidar los detalles de diseño y experiencia de usuario",
    "Soy constante y no me rindo fácil cuando algo es difícil",
  ],
  weaknesses: [
    "A veces quiero que todo salga perfecto y tardo más de lo esperado",
    "Me cuesta delegar porque me gusta tener control del resultado",
  ],
  softSkills: [
    "Trabajo en equipo y comunicación con personas no técnicas",
    "Empatía y escucha activa",
    "Organización y responsabilidad con los entregables",
  ],
  languages: ["🇪🇸 Español (nativo)", "🇺🇸 Inglés (B1-B2)", "👐 Lengua de Señas Colombiana (LSC)"],
  interests: ["🎨 Pintar acuarela", "🎸 Tocar guitarra", "🎾 Jugar tenis", "💻 Crear interfaces hermosas y funcionales", "🧠 Aprender nuevas tecnologías"]
}

const SUGGESTED_QUESTIONS = [
  "¿Cuál es tu experiencia laboral?",
  "Háblame sobre tus proyectos",
  "¿Qué tecnologías manejas?",
  "¿Dónde has estudiado?",
  "¿Cuáles son tus intereses?"
]

export default function ChatWidget() {
  // El historial comienza oculto; solo se ve la barra hasta que el usuario expande el chat
  const [isOpen, setIsOpen] = useState(false)
  const {
    messages,
    inputValue,
    isLoading,
    setInputValue,
    handleSendMessage,
    handleSuggestedQuestion,
    clearChat,
    sendContactMessage,
  } = useChatAssistant()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    // Solo desplazamos el contenedor interno, nunca la página completa
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      })
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior, block: "end" })
    }
  }, [])

  useEffect(() => {
    if (!messagesContainerRef.current) return

    const container = messagesContainerRef.current
    const isScrolledToBottom =
      container.scrollHeight - container.scrollTop <= container.clientHeight + 60

    // Solo auto-scroll si el usuario ya estaba cerca del final
    if (isScrolledToBottom) {
      const timer = setTimeout(() => {
        scrollToBottom("smooth")
      }, 80)
      return () => clearTimeout(timer)
    }
  }, [messages, scrollToBottom])

  useEffect(() => {
    const handler = () => {
      if (!isOpen) {
        setIsOpen(true)
      }
      sendContactMessage()
      setTimeout(() => {
        scrollToBottom("smooth")
      }, 150)
    }

    window.addEventListener("open-contact-chat", handler)
    return () => {
      window.removeEventListener("open-contact-chat", handler)
    }
  }, [isOpen, sendContactMessage, scrollToBottom])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mb-10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative">
        {/* Botón de cerrar chat, visible solo cuando está abierto */}
        {isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute -top-3 right-0 flex items-center gap-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 text-[11px] md:text-xs text-gray-600 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-3 w-3" />
            <span className="hidden sm:inline">Cerrar chat</span>
          </button>
        )}

        {/* Fondo suave tipo hero detrás del chat */}
        <div className="pointer-events-none absolute -inset-x-8 -top-6 h-32 bg-gradient-to-r from-pink-100/60 via-white to-pink-50/60 dark:from-pink-500/20 dark:via-slate-900 dark:to-pink-500/20 blur-2xl opacity-80" />

        <div className="relative">
          {/* Historial de mensajes dentro de un contenedor con altura limitada */}
          {isOpen && (
            <div
              ref={messagesContainerRef}
              className="chat-scroll mb-4 max-h-80 md:max-h-96 overflow-y-auto pr-1 space-y-3"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex max-w-[90%] items-end gap-2">
                    {message.sender === "ai" && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm md:text-[0.9rem] leading-relaxed whitespace-pre-wrap shadow-sm ${
                        message.sender === "user"
                          ? "bg-pink-500 text-white rounded-br-none"
                          : "bg-gray-50 text-gray-900 border border-pink-100/60 rounded-tl-none dark:bg-slate-900 dark:text-gray-100 dark:border-pink-500/50"
                      }`}
                    >
                      {message.html ? (
                        <div
                          className="[&_a]:underline [&_a]:decoration-pink-400 [&_a]:decoration-2 [&_a]:underline-offset-2"
                          dangerouslySetInnerHTML={{ __html: message.html }}
                        />
                      ) : (
                        message.content
                      )}
                    </div>
                    {message.sender === "user" && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white shadow-sm">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm mr-2">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl bg-gray-50 dark:bg-slate-900 border border-pink-100/70 dark:border-pink-500/40 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Barra principal tipo input, sin caja alrededor */}
          <div
            className="relative flex items-center w-full rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-4 py-2 md:py-3 cursor-text"
            onClick={() => {
              if (!isOpen) setIsOpen(true)
            }}
          >
        {/* Icono robot lado izquierdo (limpiar) */}
        <button
          type="button"
          onClick={clearChat}
          className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm hover:bg-pink-600 transition-colors"
          title="Limpiar conversación"
        >
          <Bot className="h-4 w-4" />
        </button>

        <input
          type="text"
          placeholder="Interactúa con la IA para conocer mejor a la desarrolladora..."
          className="flex-1 bg-transparent text-sm md:text-base text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage()
            }
          }}
          disabled={isLoading}
        />

        {/* Botón para plegar/desplegar historial */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          title={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
          {isOpen ? <X className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
        </button>

        <button
          type="button"
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
          className={`ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm transition-colors ${
            !inputValue.trim() || isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-pink-600"
          }`}
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Preguntas sugeridas como chips debajo de la barra */}
      {isOpen && SUGGESTED_QUESTIONS.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestedQuestion(question)}
              className="text-xs md:text-sm px-3 py-1 rounded-full border border-pink-200 text-pink-600 bg-pink-50 hover:bg-pink-100 transition-colors dark:border-pink-500/60 dark:bg-pink-500/10 dark:text-pink-300 dark:hover:bg-pink-500/20"
            >
              {question}
            </button>
          ))}
        </div>
      )}
        </div>
      </div>
    </motion.div>
  )
}
