"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Download, Globe } from "lucide-react"
import { useThemeLanguage } from "@/components/theme-language-provider"

const translations = {
  es: {
    title: "Seleccionar idioma del CV",
    description: "Elige en qué idioma deseas descargar el currículum",
    spanish: "Español",
    english: "Inglés",
    download: "Descargar",
    close: "Cerrar"
  },
  en: {
    title: "Select CV Language",
    description: "Choose in which language you want to download the resume",
    spanish: "Spanish",
    english: "English", 
    download: "Download",
    close: "Close"
  }
}

export function CVDownloadDialog() {
  const [open, setOpen] = useState(false)
  const { language } = useThemeLanguage()
  const t = translations[language as keyof typeof translations]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-pink-500 text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10 px-6 py-2 rounded-full"
        >
          {language === 'es' ? 'Descargar CV' : 'Download CV'}
          <Download className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t.title}
          </DialogTitle>
          <DialogDescription>
            {t.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-24 p-4"
            onClick={() => {
              window.open('/CV-NicolePaezVasquez2026.pdf', '_blank')
              setOpen(false)
            }}
          >
            <span className="text-2xl">🇪🇸</span>
            <span className="font-medium">{t.spanish}</span>
            <span className="text-xs text-muted-foreground">CV en español</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-24 p-4"
            onClick={() => {
              window.open('/CV-SoftwareEngineerNicolePaezVasquez.pdf', '_blank')
              setOpen(false)
            }}
          >
            <span className="text-2xl">🇬🇧</span>
            <span className="font-medium">{t.english}</span>
            <span className="text-xs text-muted-foreground">CV in English</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
