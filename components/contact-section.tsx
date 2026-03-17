"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, User, MessageSquare } from "lucide-react"
import emailjs from '@emailjs/browser'
import { useThemeLanguage } from "@/components/theme-language-provider"

// Configuración de EmailJS
const EMAILJS_PUBLIC_KEY = "fOWQC4gwxAIr02Qsc"
const EMAILJS_SERVICE_ID = "service_b18aqlr"
const EMAILJS_TEMPLATE_ID = "template_e7n0y88"
const EMAILJS_TO_EMAIL = "paezvasqueznicole18@gmail.com"

const translations = {
  es: {
    title: "Contacta <span class='text-pink-500'>Conmigo</span>",
    subtitle: "¿Tienes un proyecto en mente? ¿Quieres colaborar? ¡Me encantaría saber de ti!",
    name: "Nombre",
    email: "Correo",
    subject: "Asunto",
    message: "Mensaje",
    namePlaceholder: "Tu nombre completo",
    emailPlaceholder: "tu@email.com",
    subjectPlaceholder: "¿Sobre qué es tu mensaje?",
    messagePlaceholder: "Cuéntame más sobre tu proyecto o idea...",
    sending: "Enviando...",
    sendMessage: "Enviar Mensaje",
    messageSent: "¡Mensaje Enviado!",
    successMessage: "Gracias por contactarme. Te responderé lo más pronto posible.",
    contactInfo: "Responderé tu mensaje dentro de 24-48 horas hábiles.",
    errorFields: "Por favor completa todos los campos",
    errorEmail: "Por favor ingresa un email válido",
    errorSending: "Hubo un error al enviar el mensaje. Por favor intenta de nuevo.",
    errorGmail:
      "⚠️ Error de conexión con Gmail. Por favor:\n1. Ve a emailjs.com\n2. Reconecta tu cuenta de Gmail\n3. Intenta enviar el formulario de nuevo",
  },
  en: {
    title: "Get in <span class='text-pink-500'>Touch</span>",
    subtitle: "Have a project in mind? Want to collaborate? I'd love to hear from you!",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    namePlaceholder: "Your full name",
    emailPlaceholder: "your@email.com",
    subjectPlaceholder: "What's your message about?",
    messagePlaceholder: "Tell me more about your project or idea...",
    sending: "Sending...",
    sendMessage: "Send Message",
    messageSent: "Message Sent!",
    successMessage: "Thank you for reaching out. I'll get back to you as soon as possible.",
    contactInfo: "I'll respond to your message within 24-48 business hours.",
    errorFields: "Please complete all fields",
    errorEmail: "Please enter a valid email",
    errorSending: "There was an error sending the message. Please try again.",
    errorGmail:
      "⚠️ Gmail connection error. Please:\n1. Go to emailjs.com\n2. Reconnect your Gmail account\n3. Try sending the form again",
  },
}

export default function ContactSection() {
  const { language } = useThemeLanguage()
  const t = translations[language as keyof typeof translations]
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Inicializar EmailJS cuando el componente se monta
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validar que todos los campos estén completos
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error(t.errorFields)
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error(t.errorEmail)
      }

      // Enviar correo usando EmailJS (sin depender de Gmail)
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: EMAILJS_TO_EMAIL,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email
      }

      console.log("Enviando correo con parámetros:", templateParams)
      console.log("Service ID:", EMAILJS_SERVICE_ID)
      console.log("Template ID:", EMAILJS_TEMPLATE_ID)

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )
      
      console.log("Respuesta de EmailJS:", response)
      
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
      
      // Resetear el mensaje de éxito después de 5 segundos
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error: any) {
      console.error("Error detallado al enviar el correo:", error)
      console.error("String del error:", JSON.stringify(error))
      console.error("Mensaje de error:", error?.message || "Sin mensaje")
      
      let errorMessage = t.errorSending
      
      if (error?.text?.includes("Invalid grant") || error?.text?.includes("reconnect your Gmail account")) {
        errorMessage = t.errorGmail
      } else if (error?.message?.includes("email")) {
        errorMessage = t.errorEmail
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50 dark:from-slate-900 dark:to-pink-900/20 transition-colors" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white text-balance"
              dangerouslySetInnerHTML={{ __html: t.title }}
            />
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-2 text-center">
              {t.subtitle}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t.messageSent}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <User className="h-4 w-4" />
                      {t.name}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t.namePlaceholder}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Mail className="h-4 w-4" />
                      {t.email}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t.emailPlaceholder}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Mail className="h-4 w-4" />
                    {t.subject}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t.subjectPlaceholder}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <MessageSquare className="h-4 w-4" />
                    {t.message}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t.messagePlaceholder}
                    rows={6}
                    className="w-full resize-none"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t.sending}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        <span>{t.sendMessage}</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Información adicional */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              
              <span>🌐 www.nicolepaez.dev</span>
            </div>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
              {t.contactInfo}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
