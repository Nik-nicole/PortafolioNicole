"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type Language = "es" | "en"

interface ThemeLanguageContextValue {
  theme: Theme
  language: Language
  toggleTheme: () => void
  setLanguage: (lang: Language) => void
}

const ThemeLanguageContext = createContext<ThemeLanguageContextValue | undefined>(undefined)

export function useThemeLanguage() {
  const ctx = useContext(ThemeLanguageContext)
  if (!ctx) {
    throw new Error("useThemeLanguage must be used within ThemeLanguageProvider")
  }
  return ctx
}

interface ProviderProps {
  children: React.ReactNode
}

export function ThemeLanguageProvider({ children }: ProviderProps) {
  const [theme, setTheme] = useState<Theme>("light")
  const [language, setLanguage] = useState<Language>("es")

  // Cargar preferencias iniciales
  useEffect(() => {
    if (typeof window === "undefined") return

    const storedTheme = window.localStorage.getItem("theme") as Theme | null
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme: Theme = storedTheme ?? (prefersDark ? "dark" : "light")
    setTheme(initialTheme)

    const storedLang = window.localStorage.getItem("language") as Language | null
    if (storedLang) {
      setLanguage(storedLang)
    }
  }, [])

  // Sincronizar theme con <html>
  useEffect(() => {
    if (typeof document === "undefined") return
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    window.localStorage.setItem("theme", theme)
  }, [theme])

  // Sincronizar idioma con atributo lang
  useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.lang = language === "es" ? "es" : "en"
    window.localStorage.setItem("language", language)
  }, [language])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const value: ThemeLanguageContextValue = {
    theme,
    language,
    toggleTheme,
    setLanguage,
  }

  return (
    <ThemeLanguageContext.Provider value={value}>
      {children}
    </ThemeLanguageContext.Provider>
  )
}
