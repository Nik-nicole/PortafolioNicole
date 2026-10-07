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
        title: "Ingeniería de Software (Politécnico Gran Colombiano, 6to semestre)",
        date: "2026 - 2027",
        description: "Actualmente estoy cursando Ingeniería de Software en el Politécnico Gran Colombiano, en sexto semestre, y me gradúo en 2027.",
      },
      {
        title: "Fundación Bolívar Davivienda",
        date: "2025",
        description: "Ayudé a desarrollar un sistema con IA para el manejo de formularios de satisfacción y KPIs, generando sugerencias para mejoras.",
      },
      {
        title: "Senasoft (3er puesto)",
        date: "2024",
        description: "Gané el 3er puesto con un proyecto para reutilizar comida próxima a vencerse: fundaciones podían recibir donaciones, empresas reducían impuestos y las personas obtenían bonos al comprar.",
      },
      {
        title: "Hackathon MinTIC (3er puesto)",
        date: "2024",
        description: "Gané el 3er puesto con un videojuego en pixel art que enseñaba ciberseguridad a personas comunes para prevenir ataques frecuentes (JavaScript).",
      },
      {
        title: "Software Factory (SENA)",
        date: "2024",
        description: "Trabajé en proyectos reales, incluyendo SOL: reconocimiento de señas con visión por computador usando Python.",
      },
      {
        title: "Tecnólogo en Análisis y Desarrollo de Software",
        date: "2024 - 2026",
        description: "Completé mi tecnólogo en Análisis y Desarrollo de Software y luego homologué mi formación para continuar con Ingeniería de Software.",
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
        title: "Software Engineering (Politécnico Gran Colombiano, 6th semester)",
        date: "2026 - 2027",
        description: "I am currently studying Software Engineering at Politécnico Gran Colombiano in my sixth semester and I expect to graduate in 2027.",
      },
      {
        title: "Fundación Bolívar Davivienda",
        date: "2025",
        description: "I helped develop an AI system for managing satisfaction forms and KPIs, generating suggestions for improvements.",
      },
      {
        title: "Senasoft (3rd place)",
        date: "2024",
        description: "I won 3rd place with a project to reuse food about to expire: foundations could receive donations, companies reduced taxes, and people got vouchers when purchasing.",
      },
      {
        title: "MinTIC Hackathon (3rd place)",
        date: "2024",
        description: "I won 3rd place with a pixel art video game that taught cybersecurity to ordinary people to prevent frequent attacks (JavaScript).",
      },
      {
        title: "Software Factory (SENA)",
        date: "2024",
        description: "I worked on real projects, including SOL: sign language recognition with computer vision using Python.",
      },
      {
        title: "Technologist in Software Analysis and Development",
        date: "2024 - 2026",
        description: "I completed my technologist program in Software Analysis and Development and then homologated my training to continue with Software Engineering.",
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
  {
    id: 6,
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
    <section className="py-20 md:py-28 pb-24 md:pb-32 bg-gray-50 dark:bg-slate-900 transition-colors" id="timeline">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
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
                className={`mb-20 md:mb-24 flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
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
                    className={`bg-white dark:bg-slate-950 p-6 md:p-7 rounded-xl shadow-md border-l-4 
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
