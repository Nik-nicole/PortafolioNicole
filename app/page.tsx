import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import Projects from "@/components/projects"
import SkillsHexagon from "@/components/skills-hexagon"
import Timeline from "@/components/timeline"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors pt-16">
      <Hero />
      <AboutSection />
      <Projects />
      <SkillsHexagon />
      <Timeline />
      <ContactSection />
    </main>
  )
}
