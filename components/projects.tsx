"use client"

import { useState } from "react"
import { ExternalLink, Github, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import ProjectModal from "./project-modal"
import { useThemeLanguage } from "@/components/theme-language-provider"

// Traducciones
const translations = {
  es: {
    title: "Proyectos",
    titleHighlight: "Destacados",
    subtitle: "Una muestra de mis habilidades técnicas y capacidad para resolver problemas a través de aplicaciones del mundo real.",
    viewProject: "Ver Proyecto",
    technologies: "Tecnologías",
    achievements: "Logros",
    featuredAchievement: "Logro destacado",
    viewDetails: "Ver Detalles",
    close: "Cerrar",
    projects: {
      sol: {
        title: "SOL (Sistema de Reconocimiento de Lenguaje de Señas)",
        description: "Desarrollé un sistema de inteligencia artificial para reconocimiento de lenguaje de señas, usando YOLO, TensorFlow y MediaPipe para análisis de gestos en tiempo real.",
        achievements: [
          "89.2% de precisión en el conjunto de datos de prueba",
          "Creé un conjunto de datos de más de 1000 imágenes",
          "Usé técnicas de deep learning para mejorar la precisión del sistema",
        ]
      },
      ecommerce: {
        title: "Videojuego de Ciberseguridad - Ciber Heroes",
        description: "Desarrollé un videojuego educativo para aprender ciberseguridad en equipo de 6 personas, tercer lugar en la hackathon MINTIC.",
        achievements: [
          "3er lugar en Hackathon MINTIC",
          "Integración con IA Gemini para preguntas",
          "Campaña de marketing con +500 votos",
          "Estrategias de divulgación sobre ciberseguridad",
        ]
      },
      dashboard: {
        title: "Dashboard de KPIs con Análisis de Sentimientos IA",
        description: "Desarrollé un dashboard automatizado con Apps Script que extrae y procesa datos de Google Forms, donde las personas beneficiarias de los programas de la fundación evalúan su experiencia. A partir de esta información, estructurada en Google Sheets, se calculan indicadores como NPS e INS, y se integran sugerencias generadas con IA para el análisis de respuestas abiertas y detección de emociones.",
        achievements: [
          "Automatización completa con AppsScript (Google Forms → Sheets)",
          "Cálculo en tiempo real de NPS e INS",
          "Análisis de sentimientos con IA en comentarios abiertos",
          "Sistema de recomendaciones basado en feedback",
        ]
      },
      mobile: {
        title: "Sistema de Administración Gym",
        description: "Desarrollé un sistema integral de software para la administración completa de gimnasios, diseñado para optimizar la gestión operativa y mejorar la experiencia del cliente.",
        achievements: [
          "Gestión de sedes y ubicaciones múltiples",
          "Sistema completo de membresías y planes",
          "Control de inventario y productos",
          "Administración de usuarios y roles",
          "Procesamiento de órdenes y pagos",
          "Actualmente en pruebas para implementación en cadena de gimnasios EnergyM",
        ]
      },
      taskmanager: {
        title: "Gestor de Proyectos Empresarial",
        description: "Creé una plataforma completa para gestión de proyectos empresariales con asignación de tareas y colaboración en equipo.",
        achievements: [
          "Gestión de equipos y roles",
          "Sistema de notificaciones en tiempo real",
          "Canvas kanban para gestión de tareas",
          "Sistema de reporte de bugs y incidencias",
          "Panel de administración para super admin con gestión de empresas, proyectos, tareas y usuarios",
          "Estado: En desarrollo",
        ]
      }
    }
  },
  en: {
    title: "Featured",
    titleHighlight: "Projects",
    subtitle: "A showcase of my technical skills and problem-solving ability through real-world applications.",
    viewProject: "View Project",
    technologies: "Technologies",
    achievements: "Achievements",
    featuredAchievement: "Featured achievement",
    viewDetails: "View Details",
    close: "Close",
    projects: {
      sol: {
        title: "SOL (Sign Language Recognition System)",
        description: "I developed an artificial intelligence system for sign language recognition, using YOLO, TensorFlow and MediaPipe for real-time gesture analysis.",
        achievements: [
          "89.2% accuracy on test dataset",
          "Created a dataset of over 1000 images",
          "Used deep learning techniques to improve system accuracy",
        ]
      },
      ecommerce: {
        title: "Cybersecurity Game - Ciber Heroes",
        description: "I developed an educational video game to learn cybersecurity in a 6-person team, third place in the MINTIC hackathon.",
        achievements: [
          "3rd place in MINTIC Hackathon",
          "Integration with Gemini AI for questions",
          "Marketing campaign with 500+ votes",
          "Cybersecurity awareness strategies",
        ]
      },
      dashboard: {
        title: "KPIs Dashboard with AI Sentiment Analysis",
        description: "I developed an automated dashboard with Apps Script that extracts and processes data from Google Forms, where foundation program beneficiaries evaluate their experience. From this information, structured in Google Sheets, indicators like NPS and INS are calculated, and AI-generated suggestions are integrated for analyzing open responses and emotion detection.",
        achievements: [
          "Full automation with AppsScript (Google Forms → Sheets)",
          "Real-time NPS and INS calculation",
          "AI-powered sentiment analysis for open comments",
          "Feedback-based recommendation system",
        ]
      },
      mobile: {
        title: "Gym Management System",
        description: "I developed a comprehensive software system for complete gym administration, designed to optimize operational management and enhance customer experience.",
        achievements: [
          "Management of multiple locations and branches",
          "Complete membership and plan system",
          "Inventory and product control",
          "User and role administration",
          "Order processing and payment management",
          "Currently in testing for implementation in EnergyM gym chain",
        ]
      },
      taskmanager: {
        title: "Enterprise Project Manager",
        description: "I created a comprehensive platform for enterprise project management with task assignment and team collaboration.",
        achievements: [
          "Team and role management",
          "Real-time notification system",
          "Kanban canvas for task management",
          "Bug and incident reporting system",
          "Super admin panel for enterprise management with companies, projects, tasks, and users",
          "Status: In development",
        ]
      }
    }
  }
}

interface Project {
  id: number
  key: string
  title: string
  description: string
  image: string
  technologies: string[]
  achievements: string[]
  github?: string | string[]
  demo?: string
  video?: string
  gallery?: string[]
}

const baseProjects = [
  {
    id: 1,
    key: "sol",
    image: "/Sol.png",
    technologies: ["Python", "TensorFlow", "YOLO", "OpenCV","mediapipe", "pandas"],
    video: "/solmodelo.mp4",
    gallery: ["/Sol.png", "/YOLOAI.png", "/AIprueba.png", "/ToolsAI.png"],
    github: "https://github.com/Nik-nicole/AISol",
  },
  {
    id: 2,
    key: "ecommerce",
    image: "/ecommerce-platform.jpg",
    technologies: ["React", "JavaScript", "Gemini AI", "Vercel"],
    gallery: ["/ecommerce-1.jpg", "/ecommerce-2.jpg", "/ecommerce-3.jpg", "/ecommerce-4.jpg"],
    github: ["https://github.com/JonathanE2607/Ciber_Heroes_front", "https://github.com/Nik-nicole/CiberHero-Back"],
    demo: "https://ciber-heroes-clone.vercel.app/",
  },
  {
    id: 3,
    key: "dashboard",
    image: "/data-dashboard.jpg",
    technologies: ["JavaScript", "AppsScript", "SQL", "Google Sheets API", "AI"],
    video: "/Fundacion.mp4",
    gallery: ["/dashboard-1.jpg", "/dashboard-2.jpg", "/dashboard-3.jpg", "/dashboard-4.jpg"],
  },
  {
    id: 4,
    key: "mobile",
    image: "/Gym1.png",
    technologies: ["Next.js", "React", "TypeScript", "Vite", "PostgreSQL", "Aiven", "Cloudinary", "Vercel"],
    gallery: ["/Gym2.png", "/Gym3.png", "/Gym4.png", "/Gym5.png"],
    github: "https://github.com/Nik-nicole/energym1",
    demo: "https://energym1-6umz6xnsr-paezvasqueznicole18-gmailcoms-projects.vercel.app?_vercel_share=ZhjjPQ9nmelffDOvViyuozkU7QwMjNa7",
  },
  {
    id: 5,
    key: "taskmanager",
    image: "/GestorEmpresarial1.png",
    technologies: ["React", "TypeScript", "JWT", "Java Spring Boot", "PostgreSQL", "Postman"],
    gallery: ["/GestorEmpresarial2.png", "/GestorEmpresarial3.png", "/GestorEmpresarial4.png", "/GestorEmpresarial5.png"],
    github: ["https://github.com/Nik-nicole/IkellFront", "https://github.com/Nik-nicole/Ikernell"],
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { language } = useThemeLanguage()
  const t = translations[language as keyof typeof translations]

  // Obtener proyectos traducidos
  const getTranslatedProjects = (): Project[] => {
    return baseProjects.map((baseProject) => {
      const projectData = t.projects[baseProject.key as keyof typeof t.projects]
      return {
        ...baseProject,
        title: projectData.title,
        description: projectData.description,
        achievements: projectData.achievements,
      }
    })
  }

  const projects = getTranslatedProjects()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-slate-900 transition-colors" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white text-balance">
            {t.title} <span className="text-pink-500">{t.titleHighlight}</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-2 text-center">
            {t.subtitle}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <div
                className="group relative h-80 md:h-[400px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 transition-all duration-500 group-hover:scale-110">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-20 p-4 md:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {project.technologies[0]}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        {project.github && (
                          <a
                            href={Array.isArray(project.github) ? project.github[0] : project.github}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 dark:bg-slate-900/90 p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors"
                          >
                            <Github className="h-4 w-4 text-black dark:text-white" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 dark:bg-slate-900/90 p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4 text-black dark:text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none">
                      {project.description}
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mt-2">
                      <h4 className="text-xs font-semibold text-white/90 mb-2">{t.technologies}</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech: string) => (
                          <span key={tech} className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                          <Trophy className="h-4 w-4 text-white" />
                        </div>
                        <div className="ml-2">
                          <p className="text-xs text-white/70">{t.featuredAchievement}</p>
                          <p className="text-sm text-white font-medium">{project.achievements[0]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} project={selectedProject} />
    </section>
  )
}
