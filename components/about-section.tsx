"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Code, Brain, Coffee, Music, Book, ArrowRight } from "lucide-react"
import ChatWidget from "./chat-widget"
import { useThemeLanguage } from "@/components/theme-language-provider"

// Traducciones
const translations = {
  es: {
    title: "¿Quién soy?",
    subtitle: "Una joven desarrolladora con grandes sueños y habilidades técnicas sólidas",
    passionate: "Desarrolladora Apasionada",
    about1: "Soy desarrolladora Full-Stack con más de 2 años de experiencia creando soluciones tecnológicas enfocadas en optimizar procesos y mejorar la productividad. He desarrollado proyectos propios que van desde sistemas de gestión y dashboards de análisis de datos hasta aplicaciones con inteligencia artificial, utilizando tecnologías como React, Vite, Spring Boot y Python.",
    about2: "Me destaco por construir aplicaciones completas, seguras y escalables, y por mi enfoque humano: disfruto entender la capa de negocio para aportar soluciones más estratégicas, he fortalecido mis habilidades en hackathons donde aprendí a identificar oportunidades y trabajar bajo presión, y valoro el trabajo en equipo como una oportunidad constante de aprendizaje y crecimiento conjunto.",
    about3: "Mi trayectoria en tecnología está impulsada por la curiosidad y el deseo de generar un impacto positivo. Constantemente estoy aprendiendo, experimentando con nuevas tecnologías y superando mis límites.",
    skills: {
      programming: "Programación",
      ai: "IA & ML",
      coffee: "Café",
      music: "Música",
      learning: "Aprendizaje",
      creating: "Crear"
    },
    knowMeBetter: "Conóceme Mejor"
  },
  en: {
    title: "Who am I?",
    subtitle: "A young developer with big dreams and solid technical skills",
    passionate: "Passionate Developer",
    about1: "At just 19 years old, I'm a full-stack developer passionate with a particular interest in artificial intelligence and creating meaningful technological solutions.",
    about2: "I'm a Full-Stack developer with over 2 years of experience creating technological solutions focused on optimizing processes and improving productivity. I've developed my own projects ranging from management systems and data analysis dashboards to applications with artificial intelligence, using technologies like React, Vite, Spring Boot, and Python.",
    about3: "I stand out for building complete, secure, and scalable applications, and for my human approach: I enjoy understanding the business layer to provide more strategic solutions. I've strengthened my skills in hackathons where I learned to identify opportunities and work under pressure, and I value teamwork as a constant opportunity for learning and joint growth.",
    skills: {
      programming: "Programming",
      ai: "AI & ML",
      coffee: "Coffee",
      music: "Music",
      learning: "Learning",
      creating: "Creating"
    },
    knowMeBetter: "Know Me Better"
  }
}

export default function AboutSection() {
  const { language } = useThemeLanguage()
  const t = translations[language as keyof typeof translations]
  const sectionRef = useRef<HTMLElement>(null)

  const handleKnowMeBetter = () => {
    // Scroll suave a la propia sección "¿Quién soy?" donde está el chat
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    // Disparar mensaje automático de contacto en el chat
    window.dispatchEvent(new CustomEvent("open-contact-chat"))
  }

  return (
    <section
      ref={sectionRef}
      className="pt-12 md:pt-16 pb-20 bg-white text-gray-900 dark:bg-slate-950 dark:text-gray-50 transition-colors"
      id="about"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto md:pl-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
              <span className="text-pink-500">
                {t.title}
              </span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-center">
              {t.subtitle}
            </p>
          </div>

          {/* Chat AI justo debajo del título */}
          <div className="mb-10">
            <ChatWidget />
          </div>

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

          {/* Main About Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start mt-8">
            {/* Profile Image - Ocupa 5 columnas en pantallas medianas y grandes */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-5 flex justify-center md:justify-start"
            >
              <div className="relative w-full max-w-xs">
                <div className="absolute -top-4 -left-4 w-20 h-20 md:w-24 md:h-24 bg-pink-200 rounded-full opacity-50"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-pink-200 rounded-full opacity-50"></div>
                <div className="relative z-10 bg-white p-1 border-2 border-black rounded-2xl overflow-hidden">
                  <img 
                    src="/profile-photo.jpg" 
                    alt={t.passionate} 
                    className="w-full h-auto rounded-xl object-cover"
                    style={{
                      aspectRatio: '1/1.2',
                      objectPosition: 'top center'
                    }}
                  />
                </div>
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur shadow-lg rounded-lg px-3 py-2 md:px-4 md:py-2.5 border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 md:h-5 md:w-5 text-pink-500 flex-shrink-0" />
                    <span className="text-xs md:text-sm font-medium whitespace-nowrap">{t.passionate}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Content - Ocupa 7 columnas en pantallas medianas y grandes */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-7"
            >
              <div className="space-y-4 text-gray-600 mb-8">
                <p className="text-base md:text-lg leading-relaxed">
                  {t.about1}
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  {t.about2}
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  {t.about3}
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
                {[
                  { icon: <Code className="h-4 w-4 md:h-5 md:w-5 text-white" />, text: t.skills.programming },
                  { icon: <Brain className="h-4 w-4 md:h-5 md:w-5 text-white" />, text: t.skills.ai },
                  { icon: <Coffee className="h-4 w-4 md:h-5 md:w-5 text-white" />, text: t.skills.coffee },
                  { icon: <Music className="h-4 w-4 md:h-5 md:w-5 text-white" />, text: t.skills.music },
                  { icon: <Book className="h-4 w-4 md:h-5 md:w-5 text-white" />, text: t.skills.learning },
                  { icon: <Heart className="h-4 w-4 md:h-5 md:w-5 text-white" />, text: t.skills.creating },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 transition-colors p-3 rounded-lg shadow-sm"
                  >
                    {item.icon}
                    <span className="text-xs md:text-sm font-medium text-white">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleKnowMeBetter}
                className="w-full md:w-auto bg-black hover:bg-gray-800 text-white px-6 md:px-8 py-2 md:py-2 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                {t.knowMeBetter}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
