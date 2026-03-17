"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Award, Calendar, Briefcase, Code, Trophy } from "lucide-react"
import { useThemeLanguage } from "@/components/theme-language-provider"

// Traducciones
const translations = {
  es: {
    title: "Experiencia y Logros",
    subtitle: "Mi trayectoria profesional y logros",
    education: "Educación",
    experience: "Experiencia",
    achievement: "Logros",
    events: [
      {
        title: "Fundación Bolívar Davivienda",
        date: "2025",
        description: "Ayudé a desarrollar un sistema con IA para el manejo de formularios de satisfacción y KPIs, generando sugerencias para mejoras.",
      },
      {
        title: "Software Factory (SENA)",
        date: "2024",
        description: "Trabajé en proyectos reales, incluyendo SOL: reconocimiento de señas con visión por computador usando Python.",
      },
      {
        title: "Hackathon MinTIC (3er puesto)",
        date: "2024",
        description: "Gané el 3er puesto con un videojuego en pixel art que enseñaba ciberseguridad a personas comunes para prevenir ataques frecuentes (JavaScript).",
      },
      {
        title: "Senasoft (3er puesto)",
        date: "2024",
        description: "Gané el 3er puesto con un proyecto para reutilizar comida próxima a vencerse: fundaciones podían recibir donaciones, empresas reducían impuestos y las personas obtenían bonos al comprar.",
      },
      {
        title: "Educación Técnica en Desarrollo de Software",
        date: "2020 - 2023",
        description: "Completé educación técnica en desarrollo de software con enfoque en tecnologías full-stack y aplicaciones de IA.",
      },
    ]
  },
  en: {
    title: "Experience",
    subtitle: "My professional journey and achievements",
    education: "Education",
    experience: "Experience",
    achievement: "Achievements",
    events: [
      {
        title: "Fundación Bolívar Davivienda",
        date: "2025",
        description: "I helped develop an AI system for managing satisfaction forms and KPIs, generating suggestions for improvements.",
      },
      {
        title: "Software Factory (SENA)",
        date: "2024",
        description: "I worked on real projects, including SOL: sign language recognition with computer vision using Python.",
      },
      {
        title: "MinTIC Hackathon (3rd place)",
        date: "2024",
        description: "I won 3rd place with a pixel art video game that taught cybersecurity to ordinary people to prevent frequent attacks (JavaScript).",
      },
      {
        title: "Senasoft (3rd place)",
        date: "2024",
        description: "I won 3rd place with a project to reuse food about to expire: foundations could receive donations, companies reduced taxes, and people got vouchers when purchasing.",
      },
      {
        title: "Technical Education in Software Development",
        date: "2020 - 2023",
        description: "I completed technical education in software development with a focus on full-stack technologies and AI applications.",
      },
    ]
  }
}

interface TimelineEvent {
  id: number
  title: string
  date: string
  description: string
  icon: React.ReactNode
  category: "education" | "experience" | "achievement"
}

const baseEvents = [
  {
    id: 1,
    icon: <Briefcase className="h-5 w-5" />,
    category: "experience" as const,
  },
  {
    id: 2,
    icon: <Code className="h-5 w-5" />,
    category: "experience" as const,
  },
  {
    id: 3,
    icon: <Trophy className="h-5 w-5" />,
    category: "achievement" as const,
  },
  {
    id: 4,
    icon: <Award className="h-5 w-5" />,
    category: "achievement" as const,
  },
  {
    id: 5,
    icon: <Calendar className="h-5 w-5" />,
    category: "education" as const,
  },
]

export default function Timeline() {
  const { language } = useThemeLanguage()
  const t = translations[language as keyof typeof translations]

  // Obtener eventos traducidos
  const getTranslatedEvents = (): TimelineEvent[] => {
    return baseEvents.map((baseEvent, index) => {
      const eventData = t.events[index]
      return {
        ...baseEvent,
        title: eventData.title,
        date: eventData.date,
        description: eventData.description,
      }
    })
  }

  const timelineEvents = getTranslatedEvents()

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors" id="timeline">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            <>
              <span>{t.title.split(' y ')[0]} y </span>
              <span className="text-pink-500">{t.title.split(' y ')[1] || t.title.split(' & ')[1]}</span>
            </>
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-center">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-slate-700"></div>

            {/* Timeline events */}
            {timelineEvents.map((event: TimelineEvent, index: number) => (
              <motion.div
                key={event.id}
                className={`mb-12 flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="md:w-1/2"></div>
                <div className="relative flex items-center justify-center z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center z-10 
                    ${
                      event.category === "education"
                        ? "bg-blue-100 text-blue-600"
                        : event.category === "experience"
                          ? "bg-pink-100 text-pink-600"
                          : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {event.icon}
                  </div>
                </div>
                <div className="md:w-1/2 pt-4 md:pt-0 md:px-6">
                  <div
                    className={`bg-white dark:bg-slate-950 p-6 rounded-xl shadow-md border-l-4 
                    ${
                      event.category === "education"
                        ? "border-blue-500"
                        : event.category === "experience"
                          ? "border-pink-500"
                          : "border-purple-500"
                    }`}
                  >
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full 
                      ${
                        event.category === "education"
                          ? "bg-blue-100 text-blue-700"
                          : event.category === "experience"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {event.date}
                    </span>
                    <h3 className="text-xl font-bold mt-3 text-black dark:text-white">{event.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
