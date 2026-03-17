"use client"

import { Button } from "@/components/ui/button"
import { Download, Linkedin, Github } from "lucide-react"
import { useEffect, useRef } from "react"
import { useThemeLanguage } from "@/components/theme-language-provider"

const translations = {
  es: {
    badge: "Ingeniera de Software Full Stack",
    title1: "Convirtiendo Ideas",
    title2: "en Realidad Digital",
    description: "Joven desarrolladora apasionada con experiencia en IA, desarrollo web y hambre de innovación.",
    downloadCV: "Descargar CV"
  },
  en: {
    badge: "Full Stack Software Engineer",
    title1: "Turning Ideas",
    title2: "into Digital Reality",
    description: "Passionate young developer with experience in AI, web development and hunger for innovation.",
    downloadCV: "Download CV"
  }
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { language } = useThemeLanguage()
  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const nodes: any[] = []
    const connections: any[] = []
    const nodeCount = 20
    const connectionRadius = 160

    class Node {
      x: number
      y: number
      radius: number
      speedX: number
      speedY: number
      private canvas: HTMLCanvasElement
      private ctx: CanvasRenderingContext2D

      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas
        this.ctx = ctx
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 2 + 1.5
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > this.canvas.width) this.x = 0
        if (this.x < 0) this.x = this.canvas.width

        if (this.y > this.canvas.height) this.y = 0
        if (this.y < 0) this.y = this.canvas.height
      }

      draw() {
        this.ctx.fillStyle = "rgba(236,72,153,0.8)"
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
      }
    }

    class Connection {
      a: any
      b: any
      private ctx: CanvasRenderingContext2D

      constructor(a: any, b: any, ctx: CanvasRenderingContext2D) {
        this.a = a
        this.b = b
        this.ctx = ctx
      }

      draw() {
        const dx = this.a.x - this.b.x
        const dy = this.a.y - this.b.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionRadius) {
          const opacity = 1 - distance / connectionRadius
          this.ctx.strokeStyle = `rgba(236,72,153,${opacity * 0.4})` 
          this.ctx.lineWidth = 1

          this.ctx.beginPath()
          this.ctx.moveTo(this.a.x, this.a.y)
          this.ctx.lineTo(this.b.x, this.b.y)
          this.ctx.stroke()
        }
      }
    }

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node(canvas, ctx))
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        connections.push(new Connection(nodes[i], nodes[j], ctx))
      }
    }

    function animate() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      connections.forEach((c) => c.draw())
      
      nodes.forEach((n) => {
        n.update()
        n.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)

    return () => window.removeEventListener("resize", resize)
  }, [])

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const img = imageRef.current
      if (!img) return

      const x = (window.innerWidth / 2 - e.clientX) / 40
      const y = (window.innerHeight / 2 - e.clientY) / 40

      img.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Text Section */}
          <div>
            <span className="inline-block mb-6 px-4 py-1 text-sm font-medium text-white bg-pink-500 rounded-full">
              {t.badge}
            </span>

            <h1 className="text-[38px] md:text-[58px] font-bold leading-[1.15] mb-6 max-w-[650px]">
              <span className="block">
                {t.title1}
              </span>
              <span className="block bg-gradient-to-r from-black to-pink-500 dark:from-white dark:to-pink-400 text-transparent bg-clip-text pb-2">
                {t.title2}
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              {t.description}
            </p>

            <div className="flex items-center gap-4">
              <Button
                asChild
                variant="outline"
                className="border-pink-500 text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10 px-6 py-2 rounded-full"
              >
                <a href="/CV-NicolePaezVasquez2026.pdf" download>
                  {t.downloadCV}
                  <Download className="ml-2 h-5 w-5"/>
                </a>
              </Button>

              <a
                href="https://www.linkedin.com/in/nicole-paez-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
              >
                <Linkedin size={20}/>
              </a>

              <a
                href="https://github.com/Nik-nicole"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
              >
                <Github size={20}/>
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative flex justify-center">
            <div
              ref={imageRef}
              className="relative flex items-center justify-center transition-transform duration-200"
            >
              {/* Glow Effect */}
              <div className="absolute w-[420px] h-[420px] rounded-full bg-pink-500 opacity-40 blur-[120px]" />

              {/* Pink Circle */}
              <div className="absolute w-[420px] h-[420px] rounded-full bg-pink-500/80 z-0" />

              {/* Profile Image */}
              <img
                src="/perfil.png"
                alt="Nicole"
                className="relative z-10 w-[340px] md:w-[400px] object-contain transition-transform duration-300 ease-in-out hover:scale-110"
              />

              {/* AI Icon */}
              <div className="absolute -top-4 left-24 bg-white dark:bg-zinc-900 shadow-md rounded-full p-2 z-20">
                <div className="bg-black dark:bg-white text-white dark:text-black rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                  IA
                </div>
              </div>

              {/* Code Icon */}
              <div className="absolute -bottom-4 left-1/4 bg-white dark:bg-zinc-900 shadow-md rounded-full p-2 z-20">
                <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                  &lt;/&gt;
                </div>
              </div>

              {/* JS Icon */}
              <div className="absolute right-4 top-1/2 bg-white dark:bg-zinc-900 shadow-md rounded-full p-2 z-20">
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                  JS
                </div>
              </div>

              {/* Another JS Icon */}
              <div className="absolute -top-4 right-24 bg-white dark:bg-zinc-900 shadow-md rounded-full p-2 z-20">
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                  JS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}