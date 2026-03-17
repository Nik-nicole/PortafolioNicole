import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeLanguageProvider } from "@/components/theme-language-provider"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nicole Páez - Full Stack Software Engineer",
  description: "Portfolio de Nicole Páez - Ingeniera de Software Full Stack especializada en IA y desarrollo web",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className={inter.className}>
        <ThemeLanguageProvider>
          <Header />
          {children}
        </ThemeLanguageProvider>
      </body>
    </html>
  )
}
