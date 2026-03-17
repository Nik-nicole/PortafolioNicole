"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeLanguage } from "@/components/theme-language-provider"

const translations = {
  es: {
    portfolio: "Portafolio",
    nav: {
      home: "Inicio",
      about: "Sobre Mí",
      projects: "Proyectos",
      skills: "Habilidades",
      experience: "Experiencia",
      contact: "Contacto",
    },
  },
  en: {
    portfolio: "Portfolio",
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    },
  },
}

const navItems = [
  { name: "header.home", href: "#hero" },
  { name: "header.about", href: "#about" },
  { name: "header.projects", href: "#projects" },
  { name: "header.skills", href: "#skills" },
  { name: "header.experience", href: "#timeline" },
  { name: "header.contact", href: "#contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme, language, setLanguage } = useThemeLanguage()
  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const toggleLanguage = () => {
    const newLang = language === "es" ? "en" : "es"
    setLanguage(newLang)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{"</ >"}</span>
            </div>
            <span className="text-xl font-bold text-black dark:text-white">
              {t.portfolio}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors font-medium"
              >
                {(t.nav as any)[item.name.replace("header.", "")]}
              </button>
            ))}
          </nav>

          {/* Theme & Language Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 h-auto"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="p-2 h-auto"
            >
              <Languages className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === "es" ? "ES" : "EN"}
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 h-auto"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-950 shadow-lg border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors font-medium text-left"
                  >
                    {(t.nav as any)[item.name.replace("header.", "")]}
                  </button>
                ))}
              </nav>

              {/* Mobile Theme & Language Toggle */}
              <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="p-2 h-auto"
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="p-2 h-auto"
                >
                  <Languages className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === "es" ? "ES" : "EN"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
