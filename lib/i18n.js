import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      // Hero
      hero: {
        badge: "Ingeniera de Software Full Stack",
        title: "Convirtiendo Ideas<br/>en Realidad Digital",
        description: "Joven desarrolladora apasionada con experiencia en IA, desarrollo web y hambre de innovación.",
        downloadCV: "Descargar CV"
      },
      // About
      about: {
        title: "¿Quién soy?",
        subtitle: "Una joven desarrolladora con grandes sueños y habilidades técnicas sólidas",
        passionate: "Desarrolladora Apasionada",
        about1: "Con solo 19 años, soy una ingeniera de software full-stack apasionada con un interés particular en la inteligencia artificial y la creación de soluciones tecnológicas significativas.",
        about2: "A pesar de mi corta edad, ya he acumulado conocimientos técnicos significativos y experiencia práctica a través de proyectos, hackathons e iniciativas colaborativas. Creo que la edad es solo un número cuando se trata de innovación y resolución de problemas.",
        about3: "Mi trayectoria en tecnología está impulsada por la curiosidad y el deseo de generar un impacto positivo. Constantemente estoy aprendiendo, experimentando con nuevas tecnologías y superando mis límites.",
        skills: {
          programming: "Programación",
          ai: "IA & ML",
          coffee: "Café",
          music: "Música",
          learning: "Aprendizaje",
          creating: "Crear"
        },
        knowMeBetter: "Conóceme Mejor"
      },
      // Projects
      projects: {
        title: "Proyectos",
        subtitle: "Explora mis trabajos más recientes",
        viewProject: "Ver Proyecto",
        technologies: "Tecnologías",
        achievements: "Logros",
        viewDetails: "Ver Detalles",
        close: "Cerrar"
      },
      // Skills
      skills: {
        title: "Habilidades Técnicas",
        subtitle: "Tecnologías que domino y con las que trabajo",
        languages: "Lenguajes",
        frameworks: "Frameworks",
        ai: "IA & ML",
        tools: "Herramientas"
      },
      // Timeline
      timeline: {
        title: "Experiencia y Logros",
        subtitle: "Mi trayectoria profesional y logros",
        education: "Educación",
        experience: "Experiencia",
        achievement: "Logros"
      },
      // Contact
      contact: {
        title: "Contacta Conmigo",
        subtitle: "¿Tienes un proyecto en mente? Hablemos",
        name: "Nombre",
        email: "Email",
        subject: "Asunto",
        message: "Mensaje",
        send: "Enviar Mensaje",
        sending: "Enviando...",
        errorSending: "Error al enviar el correo",
        errorGmail: "Error: Necesitas reconectar tu cuenta de Gmail en EmailJS",
        errorEmail: "Error: El email no es válido",
        success: "¡Mensaje enviado correctamente!"
      },
      // Header
      header: {
        home: "Inicio",
        about: "Sobre Mí",
        projects: "Proyectos",
        skills: "Habilidades",
        experience: "Experiencia",
        contact: "Contacto"
      },
      // Chat AI
      chat: {
        welcome: "¡Hola! Soy Nicole (bueno, mi versión asistente IA ✨). Estoy aquí para que puedas conocer rápido mi experiencia, mis proyectos y en qué te puedo aportar. ¿Por dónde te gustaría empezar?",
        clearWelcome: "¡Hola! Soy Nicole (mi versión asistente IA ✨). Si quieres, te cuento de mis proyectos de IA con visión por computador, mis experiencias en hackathons o mi trabajo en Fundación Bolívar Davivienda.",
        contactTitle: "Contacto directo conmigo",
        contactSubtitle: "Elige el canal que prefieras y hablamos.",
        contactText: "Puedes contactarme directamente a través de estos canales seguros:",
        contactButton: "Formulario",
        whatsapp: "WhatsApp",
        email: "Email"
      }
    }
  },
  en: {
    translation: {
      // Hero
      hero: {
        badge: "Full Stack Software Engineer",
        title: "Turning Ideas<br/>into Digital Reality",
        description: "Passionate young developer with experience in AI, web development and hunger for innovation.",
        downloadCV: "Download CV"
      },
      // About
      about: {
        title: "Who am I?",
        subtitle: "A young developer with big dreams and solid technical skills",
        passionate: "Passionate Developer",
        about1: "At just 19 years old, I'm a full-stack software engineer passionate with a particular interest in artificial intelligence and creating meaningful technological solutions.",
        about2: "Despite my young age, I've already accumulated significant technical knowledge and practical experience through projects, hackathons and collaborative initiatives. I believe age is just a number when it comes to innovation and problem-solving.",
        about3: "My journey in technology is driven by curiosity and the desire to make a positive impact. I'm constantly learning, experimenting with new technologies and pushing my limits.",
        skills: {
          programming: "Programming",
          ai: "AI & ML",
          coffee: "Coffee",
          music: "Music",
          learning: "Learning",
          creating: "Creating"
        },
        knowMeBetter: "Know Me Better"
      },
      // Projects
      projects: {
        title: "Projects",
        subtitle: "Explore my latest work",
        viewProject: "View Project",
        technologies: "Technologies",
        achievements: "Achievements",
        viewDetails: "View Details",
        close: "Close"
      },
      // Skills
      skills: {
        title: "Technical Skills",
        subtitle: "Technologies I master and work with",
        languages: "Languages",
        frameworks: "Frameworks",
        ai: "AI & ML",
        tools: "Tools"
      },
      // Timeline
      timeline: {
        title: "Experience",
        subtitle: "My professional journey and achievements",
        education: "Education",
        experience: "Experience",
        achievement: "Achievements"
      },
      // Contact
      contact: {
        title: "Get in Touch",
        subtitle: "Have a project in mind? Let's talk",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send Message",
        sending: "Sending...",
        errorSending: "Error sending email",
        errorGmail: "Error: You need to reconnect your Gmail account in EmailJS",
        errorEmail: "Error: Email is not valid",
        success: "Message sent successfully!"
      },
      // Header
      header: {
        home: "Home",
        about: "About",
        projects: "Projects",
        skills: "Skills",
        experience: "Experience",
        contact: "Contact"
      },
      // Chat AI
      chat: {
        welcome: "Hello! I'm Nicole (well, my AI assistant version ✨). I'm here to help you quickly learn about my experience, my projects, and what I can contribute to you. Where would you like to start?",
        clearWelcome: "Hello! I'm Nicole (my AI assistant version ✨). If you want, I can tell you about my AI projects with computer vision, my hackathon experiences, or my work at Fundación Bolívar Davivienda.",
        contactTitle: "Contact me directly",
        contactSubtitle: "Choose the channel you prefer and let's talk.",
        contactText: "You can contact me directly through these secure channels:",
        contactButton: "Form",
        whatsapp: "WhatsApp",
        email: "Email"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
