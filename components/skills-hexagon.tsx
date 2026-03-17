"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useThemeLanguage } from "@/components/theme-language-provider"

// Traducciones
const translations = {
  es: {
    title: "Habilidades Técnicas",
    subtitle: "Tecnologías que domino y con las que trabajo",
    languages: "Lenguajes",
    frameworks: "Frameworks",
    ai: "IA & ML",
    tools: "Herramientas"
  },
  en: {
    title: "Technical Skills",
    subtitle: "Technologies I master and work with",
    languages: "Languages",
    frameworks: "Frameworks",
    ai: "AI & ML",
    tools: "Tools"
  }
}

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [
  // Lenguajes de programación
  { name: "Python", level: 90, category: "languages" },
  { name: "JavaScript", level: 85, category: "languages" },
  { name: "TypeScript", level: 75, category: "languages" },
  { name: "Java", level: 65, category: "languages" },

  // Frameworks & Librerías
  { name: "React", level: 85, category: "frameworks" },
  { name: "Astro", level: 80, category: "frameworks" },
  { name: "Flask", level: 75, category: "frameworks" },
  { name: "Spring Boot", level: 65, category: "frameworks" },
  { name: "Next.js", level: 70, category: "frameworks" },

  // AI & ML
  { name: "TensorFlow", level: 80, category: "ai" },
  { name: "YOLO", level: 85, category: "ai" },
  { name: "Matplotlib", level: 90, category: "ai" },
  { name: "NumPy", level: 85, category: "ai" },

  // Herramientas
  { name: "Git", level: 90, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "Google Colab", level: 95, category: "tools" },
  { name: "VS Code", level: 85, category: "tools" },

  // Bases de datos
  { name: "PostgreSQL", level: 75, category: "databases" },
  { name: "MongoDB", level: 70, category: "databases" },
  { name: "SQLite", level: 85, category: "databases" },
  { name: "Firebase", level: 80, category: "databases" },

  // Idiomas
  { name: "Español", level: 100, category: "languages-human" },
  { name: "Inglés", level: 65, category: "languages-human" },
  { name: "Lengua de Señas", level: 80, category: "languages-human" },
]

// Colores por categoría
const categoryColors: Record<string, string> = {
  languages: "#3B82F6", // blue-500
  frameworks: "#10B981", // emerald-500
  ai: "#8B5CF6", // violet-500
  tools: "#F59E0B", // amber-500
  databases: "#EF4444", // red-500
  "languages-human": "#EC4899", // pink-500
}

const iconSlugs: Record<string, string> = {
  Python: "python",
  JavaScript: "javascript",
  TypeScript: "typescript",
  Java: "java",
  React: "react",
  Astro: "astro",
  Flask: "flask",
  "Spring Boot": "springboot",
  "Next.js": "nextdotjs",
  TensorFlow: "tensorflow",
  Matplotlib: "matplotlib",
  NumPy: "numpy",
  YOLO: "ultralytics",
  Git: "git",
  Docker: "docker",
  "Google Colab": "googlecolab",
  "VS Code": "visualstudiocode",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  SQLite: "sqlite",
  Firebase: "firebase",
}

function SkillIcon({ name }: { name: string }) {
  const slug = iconSlugs[name]
  if (!slug) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white text-xs font-bold">
        {name
          .split(" ")
          .map((p) => p[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </div>
    )
  }

  // Special case for Matplotlib: use official white logo
  if (name === "Matplotlib") {
    return (
      <img
        src="/matplotlib-logo-white.svg"
        alt={name}
        className="h-10 w-10"
        loading="lazy"
      />
    )
  }

  // Special case for VS Code: use official white logo
  if (name === "VS Code") {
    return (
      <img
        src="/visual-studio-code-icons/vscode-alt.svg"
        alt={name}
        className="h-10 w-10"
        loading="lazy"
      />
    )
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/white`}
      alt={name}
      className="h-10 w-10"
      loading="lazy"
    />
  )
}

export default function SkillsHexagon() {
  const { language } = useThemeLanguage()
  const t = translations[language as keyof typeof translations]
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const categories = [
    { id: "all", name: language === "es" ? "Todas" : "All" },
    { id: "languages", name: t.languages },
    { id: "frameworks", name: t.frameworks },
    { id: "ai", name: t.ai },
    { id: "tools", name: t.tools },
    { id: "databases", name: language === "es" ? "Bases de Datos" : "Databases" },
    { id: "languages-human", name: language === "es" ? "Idiomas" : "Languages" },
  ]

  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors" id="skills">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            <span>{t.title.split(" ")[0]}</span>{" "}
            <span className="text-pink-500">{t.title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-center">
            {t.subtitle}
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
          <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-slate-900 rounded-full">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-pink-500 text-white shadow-md"
                    : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Visualización de habilidades en hexágonos */}
        <div className="flex flex-wrap justify-center gap-4">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Hexágono */}
              <div
                className="hexagon relative w-32 h-32 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                style={{
                  background: categoryColors[skill.category] || "#EC4899",
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div className="text-white text-center p-2 flex flex-col items-center gap-2">
                  <SkillIcon name={skill.name} />
                  <div className="font-bold text-sm leading-tight">{skill.name}</div>
                </div>

                {/* Borde brillante */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(45deg, transparent 0%, white 50%, transparent 100%)`,
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    animation: "rotate 3s linear infinite",
                  }}
                ></div>
              </div>

              {/* Tooltip */}
              {hoveredSkill === skill.name && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-900 p-2 rounded-lg shadow-lg z-10 w-48">
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-gray-50">{skill.name}</div>
                    <div className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                      {categories.find((c) => c.id === skill.category)?.name}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Leyenda de categorías */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {categories
            .filter((c) => c.id !== "all")
            .map((category) => (
              <div key={category.id} className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: categoryColors[category.id] || "#EC4899" }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{category.name}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Estilos para la animación */}
      <style jsx>{`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  )
}
