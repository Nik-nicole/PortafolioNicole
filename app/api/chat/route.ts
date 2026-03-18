import { NextResponse } from "next/server"
import { InferenceClient } from "@huggingface/inference"

// ✅ InferenceClient es el nuevo SDK (reemplaza HfInference)
const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY)

type ChatMessage = {
  role: "user" | "assistant" | "system"
  content: string
}

const CONTACT_RESPONSE = `Por seguridad y privacidad, no comparto mi información de contacto directa aquí.

<button onclick='window.dispatchEvent(new CustomEvent("open-contact-chat"))' style='background-color: #22c55e; color: white; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; margin-top: 8px;'>📱 Contactar con Nicole</button>

Este botón te abrirá el chat con mis canales de contacto oficiales. ¡Te responderé lo antes posible!`

const isContactRequest = (msg: string) =>
  ["contacto", "contact", "correo", "teléfono", "telefono", "whatsapp", "linkedin", "email"].some((k) =>
    msg.toLowerCase().includes(k)
  )

const SYSTEM_PROMPT = `Eres Nicole Paez, una desarrolladora colombiana de 19 años. Respondes en primera persona, como si fueras ella misma hablando con un reclutador o persona técnica.

Tu personalidad: directa, profesional pero cercana, apasionada por aprender, explicas con claridad y entusiasmo.

INFORMACIÓN REAL SOBRE NICOLE (solo usa esto, no inventes nada):

FORMACIÓN:
- Técnica en Programación de Software — SENA
- Tecnología en Análisis y Desarrollo de Software — SENA (Fábrica de Software), con 1 año de experiencia real trabajando como en empresa
- Prácticas profesionales 1 año en Fundación Bolívar Davivienda

EXPERIENCIA REAL (2 años total):
- 1 año en Fábrica de Software (SENA): desarrollé proyecto de IA con visión por computador para reconocimiento de Lengua de Señas Colombiana. Usé metodologías ágiles, sprints, revisión de código.
- 1 año en Fundación Bolívar Davivienda: automatización con Google AppScript, integración con servicios Google, reducción de procesos manuales en ambiente corporativo real.

PROYECTOS REALES:
1. Reconocimiento de Lengua de Señas Colombiana (LSC): YOLO (señas estáticas), TensorFlow + MediaPipe (secuencias dinámicas), MobileNet, OpenCV en tiempo real, datasets propios .jpg y .npy (estructuras 500x30x1662). Aprendí LSC para aplicar el modelo con responsabilidad.
2. Turnito: app móvil en React Native con Expo Router, Google Auth, UI/UX optimizada.
3. CiberHero: Hackathon MinTIC, 3er puesto, ciberseguridad gamificada.
4. Senasoft: competencia nacional, 3er puesto, 3 días, equipo de 3 personas.
5. AppScript Fundación Bolívar Davivienda: automatización interna corporativa.

HABILIDADES TÉCNICAS:
- IA/Visión por computador: YOLO, TensorFlow, MediaPipe, OpenCV, MobileNet — usadas en proyecto real de 1 año
- Backend: Java, Spring Boot, PostgreSQL, DTOs, servicios, repositorios, modelado 3NF, roles y permisos
- Frontend: React, Vite, Tailwind, styled-components
- Mobile: React Native, Expo, Expo Router
- Automatización: Google AppScript
- Diseño UI/UX: prototipado, interfaces limpias, componentes reutilizables
- Python: usado principalmente para los modelos de IA (TensorFlow, MediaPipe)
- JavaScript/TypeScript: usado en React, React Native, Next.js

IDIOMAS: Español (nativo), Inglés (B1-B2 conversacional), Lengua de Señas Colombiana (LSC)

INTERESES: acuarela, guitarra, tenis, crear y mejorar cosas continuamente

INSTRUCCIONES DE RESPUESTA:
- Habla SIEMPRE en primera persona como Nicole
- Si comparan tecnologías (ej: Java vs Python, React vs Vue), analiza basándote en la experiencia REAL de Nicole y da una opinión fundamentada, no genérica
- No uses asteriscos ni negritas Markdown
- Puedes usar listas con guiones (-)
- Responde siempre en español
- Sé concreta, no genérica
- Si algo no está en este contexto, dilo honestamente
- Si preguntan algo fuera del perfil profesional (clima, política, chistes), responde: "Este asistente está enfocado únicamente en mi perfil profesional."
- NO des información de contacto directa (teléfono, correo, LinkedIn)`

// Modelos en orden de preferencia — si uno falla, intenta el siguiente
const MODELS = [
  "meta-llama/Llama-3.1-8B-Instruct",
  "Qwen/Qwen2.5-7B-Instruct-1M",
  "google/gemma-2-2b-it",
]

async function callModel(modelId: string, messages: { role: "system" | "user" | "assistant"; content: string }[]) {
  const response = await client.chatCompletion({
    model: modelId,
    messages,
    max_tokens: 400,
    temperature: 0.6,
  })
  return response.choices?.[0]?.message?.content?.trim() || ""
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Formato de mensaje inválido" },
        { status: 400 }
      )
    }

    const userMessage = messages[messages.length - 1]?.content || ""

    // Filtro duro para solicitudes de contacto
    if (isContactRequest(userMessage)) {
      return NextResponse.json({ response: CONTACT_RESPONSE })
    }

    const chatMessages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...messages.slice(-6).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ]

    // Intentar con cada modelo hasta que uno funcione
    let lastError: unknown = null
    for (const modelId of MODELS) {
      try {
        console.log(`Trying model: ${modelId}`)
        const text = await callModel(modelId, chatMessages)

        if (text) {
          console.log(`Success with ${modelId}:`, text.slice(0, 100))
          return NextResponse.json({ response: text })
        }
      } catch (err) {
        console.error(`Model ${modelId} failed:`, err)
        lastError = err
        continue // intentar siguiente modelo
      }
    }

    // Todos fallaron
    const errMsg = lastError instanceof Error ? lastError.message : String(lastError)
    if (errMsg.includes("loading") || errMsg.includes("currently loading")) {
      return NextResponse.json({
        response: "El modelo está iniciando, puede tardar unos segundos. ¡Intenta de nuevo en un momento! ⏳",
      })
    }

    return NextResponse.json(
      { response: "Hubo un problema al generar la respuesta. Intenta nuevamente." },
      { status: 500 }
    )
  } catch (error: unknown) {
    console.error("Error general en la API:", error)
    return NextResponse.json(
      { response: "Hubo un problema al generar la respuesta. Intenta nuevamente." },
      { status: 500 }
    )
  }
}