"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeLanguage } from "@/components/theme-language-provider"

const translations = {
  es: {
    gallery: "Galería",
    technologies: "Tecnologías Utilizadas",
    achievements: "Logros Destacados",
    github: "GitHub",
    demo: "Demo",
    inDevelopment: "En desarrollo"
  },
  en: {
    gallery: "Gallery",
    technologies: "Technologies Used",
    achievements: "Key Achievements",
    github: "GitHub",
    demo: "Demo",
    inDevelopment: "In Development"
  }
}

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
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
  } | null
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { language } = useThemeLanguage()
  const t = translations[language as keyof typeof translations]
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  
  if (!project) return null

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeImageModal = () => {
    setSelectedImageIndex(null)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!project.gallery || selectedImageIndex === null) return
    const newIndex = direction === 'prev' 
      ? (selectedImageIndex - 1 + project.gallery.length) % project.gallery.length
      : (selectedImageIndex + 1) % project.gallery.length
    setSelectedImageIndex(newIndex)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-slate-700">
                <div className="overflow-y-auto max-h-[90vh]">
                  {/* Header con imagen */}
                  <div className="relative h-64 md:h-80 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden">
                    {project.image && (
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      onClick={onClose}
                      className="absolute top-4 right-4 bg-white dark:bg-slate-900 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                    >
                      <X className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                    </button>
                  </div>

                {/* Contenido */}
                <div className="p-6 md:p-8">
                  {/* Título y descripción */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-gray-50">{project.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">{project.description}</p>

                  {/* Video o galería */}
                  {project.video && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      {project.video.includes('youtube.com') || project.video.includes('youtu.be') ? (
                        <iframe
                          width="100%"
                          height="315"
                          src={project.video}
                          title={project.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg"
                        />
                      ) : (
                        <video
                          width="100%"
                          height="315"
                          controls
                          className="rounded-lg"
                          title={project.title}
                        >
                          <source src={project.video} type="video/mp4" />
                          Tu navegador no soporta la reproducción de video.
                        </video>
                      )}
                    </div>
                  )}

                  {/* Galería de imágenes */}
                  {project.gallery && project.gallery.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-50">{t.gallery}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {project.gallery.map((img, idx) => (
                          <img
                            key={idx}
                            src={img || "/placeholder.svg"}
                            alt={`${project.title} - Imagen ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openImageModal(idx)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tecnologías */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-50">{t.technologies}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Logros */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-50">{t.achievements}</h3>
                    <ul className="space-y-2">
                      {project.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Enlaces */}
                  <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
                    {project.github || project.demo ? (
                      <div className="flex flex-col gap-3">
                        {/* GitHub Links */}
                        {project.github && (
                          <div className="flex gap-3">
                            {Array.isArray(project.github) ? (
                              project.github.map((githubUrl, index) => (
                                <Button key={index} asChild className={`flex-1 ${index === 0 ? 'bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black' : 'bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white'}`}>
                                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4 mr-2" /> {index === 0 ? 'Frontend' : 'Backend'}
                                  </a>
                                </Button>
                              ))
                            ) : (
                              <Button asChild className="flex-1 bg-black hover:bg-gray-800 text-white rounded-lg dark:bg-white dark:hover:bg-gray-200 dark:text-black">
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4 mr-2" /> {t.github}
                                </a>
                              </Button>
                            )}
                          </div>
                        )}
                        {/* Branch notice for SOL project */}
                        {project.key === "sol" && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                            <p className="text-blue-800 dark:text-blue-200 text-sm text-center">
                              <span className="font-semibold">Importante:</span> Por favor, entra a mi rama <span className="font-mono bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">nik-dev</span> para ver la versión más reciente.
                            </p>
                          </div>
                        )}
                        {/* Development notice for Gym project */}
                        {project.key === "mobile" && (
                          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                            <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                              <span className="font-semibold">🚧 Versión en Desarrollo:</span> Esta es una demostración preliminar del proyecto. Actualmente me encuentro implementando nuevas funcionalidades y mejoras para ofrecer una experiencia completa de gestión gimnástica. ¡Próximamente más características!
                            </p>
                          </div>
                        )}
                        {/* Demo Link or Development Status */}
                        {project.demo ? (
                          <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-lg">
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" /> {t.demo}
                            </a>
                          </Button>
                        ) : (
                          <div className="w-full bg-blue-500 text-white rounded-lg p-3 text-center font-medium">
                            🚧 {t.inDevelopment}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                        <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                          <span className="font-semibold">Por razones de seguridad:</span><br/>
                          Este proyecto no puede compartirse, ya que contiene información confidencial de la empresa.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de imagen completa */}
      <AnimatePresence>
        {selectedImageIndex !== null && project.gallery && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50"
              onClick={closeImageModal}
            />

            {/* Modal de imagen */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
                {/* Botón cerrar */}
                <button
                  onClick={closeImageModal}
                  className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition z-10"
                >
                  <X className="h-6 w-6 text-white" />
                </button>

                {/* Flecha anterior */}
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 bg-black/80 backdrop-blur-sm rounded-full p-3 hover:bg-black transition z-10"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>

                {/* Flecha siguiente */}
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 bg-black/80 backdrop-blur-sm rounded-full p-3 hover:bg-black transition z-10"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>

                {/* Imagen */}
                {selectedImageIndex !== null && (
                  <img
                    src={project.gallery[selectedImageIndex] || "/placeholder.svg"}
                    alt={`${project.title} - Imagen ${selectedImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                )}

                {/* Indicador de posición */}
                {selectedImageIndex !== null && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-white text-sm font-medium">
                      {selectedImageIndex + 1} / {project.gallery.length}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
