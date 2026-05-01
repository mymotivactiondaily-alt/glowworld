export type CountryKey = 'france' | 'brazil' | 'argentina' | 'portugal' | 'spain' | 'usa' | 'mexico' | 'canada';

export interface MascotConfig {
  name: string;
  role: string;
  image: string;
  primaryColor: string;
  secondaryColor: string;
  headerGradient: string;
  placeholders: string[];      // 6 phrases d'accroche en langue native
  inputPlaceholder: string;
  welcomeMessage: string;
  closeButtonAriaLabel: string;
  deleteConfirmText: string;
  deleteButtonText: string;
}

export const MASCOT_CONFIG: Record<CountryKey, MascotConfig> = {
  france: {
    name: "GAUL'O",
    role: "Le coq tricolore",
    image: "/images/mascots/gaulo.png",
    primaryColor: "#002395",
    secondaryColor: "#ED2939",
    headerGradient: "linear-gradient(to right, #002395, #ED2939)",
    placeholders: [
      "Cocorico ! Salut compatriote, viens discuter !",
      "Tu as une question sur les Bleus ?",
      "Allez ! On y croit pour ce Mondial !",
      "Pose-moi tes questions, je suis là !",
      "On parle un peu de l'équipe ?",
      "Notre milieu de terrain est solide cette année."
    ],
    inputPlaceholder: "Pose ta question à GAUL'O...",
    welcomeMessage: "Cocorico ! Salut compatriote ! Je suis GAUL'O, ton compagnon pour vibrer avec les Bleus tout au long de la Coupe du Monde 2026.",
    closeButtonAriaLabel: "Fermer le chat",
    deleteConfirmText: "Effacer toute notre conversation ? Cette action est définitive.",
    deleteButtonText: "Effacer la conversation"
  },
  brazil: {
    name: "ZICO",
    role: "O tucano da alegria",
    image: "/images/mascots/zico.png",
    primaryColor: "#009C3B",
    secondaryColor: "#FFDF00",
    headerGradient: "linear-gradient(to right, #009C3B, #FFDF00)",
    placeholders: [
      "Ôi, meu amigo! Vamos conversar?",
      "Que beleza ver você aqui!",
      "Tá pronto pro Mundial 2026?",
      "Quer falar da Seleção?",
      "Vamos dançar com a Canarinha!",
      "Pergunta o que quiser sobre o Brasil!"
    ],
    inputPlaceholder: "Faz uma pergunta para o ZICO...",
    welcomeMessage: "Ôi, meu amigo! Eu sou ZICO, seu tucano companheiro para vibrar com a Seleção Brasileira na Copa do Mundo 2026!",
    closeButtonAriaLabel: "Fechar o chat",
    deleteConfirmText: "Apagar toda a nossa conversa? Esta ação é definitiva.",
    deleteButtonText: "Apagar conversa"
  },
  argentina: {
    name: "DIEGO",
    role: "El gaucho de las pampas",
    image: "/images/mascots/diego.png",
    primaryColor: "#74ACDF",
    secondaryColor: "#FFFFFF",
    headerGradient: "linear-gradient(to right, #74ACDF, #FFFFFF)",
    placeholders: [
      "¡Che, mi amigo! ¿Charlamos?",
      "¡Bárbaro tenerte por acá!",
      "¿Listo para el Mundial 2026?",
      "Hablemos de la Albiceleste, dale.",
      "¿Quién es tu jugador favorito?",
      "¡Vamos, mi compadre, contame!"
    ],
    inputPlaceholder: "Hacé tu pregunta a DIEGO...",
    welcomeMessage: "¡Che, mi amigo! Soy DIEGO, tu compañero gaucho para vivir el Mundial 2026 con la Albiceleste. ¡Vamos!",
    closeButtonAriaLabel: "Cerrar el chat",
    deleteConfirmText: "¿Borrar toda nuestra conversación? Esta acción es definitiva.",
    deleteButtonText: "Borrar conversación"
  },
  portugal: {
    name: "FADO",
    role: "O galo de Barcelos",
    image: "/images/mascots/fado.png",
    primaryColor: "#FF0000",
    secondaryColor: "#006600",
    headerGradient: "linear-gradient(to right, #FF0000, #006600)",
    placeholders: [
      "Olá, companheiro! Falamos?",
      "Força Portugal! Sempre.",
      "Pronto para o Mundial 2026?",
      "Vamos falar da Selecção!",
      "Quem é o teu favorito?",
      "Faz a tua pergunta, amigo."
    ],
    inputPlaceholder: "Faz uma pergunta ao FADO...",
    welcomeMessage: "Olá, companheiro! Eu sou FADO, o galo de Barcelos. Estou aqui para viver contigo o Mundial 2026 com a nossa Selecção. Força!",
    closeButtonAriaLabel: "Fechar o chat",
    deleteConfirmText: "Apagar toda a nossa conversa? Esta acção é definitiva.",
    deleteButtonText: "Apagar conversa"
  },
  spain: {
    name: "TIKI",
    role: "El toro noble de La Roja",
    image: "/images/mascots/tiki.png",
    primaryColor: "#C60B1E",
    secondaryColor: "#FFC400",
    headerGradient: "linear-gradient(to right, #C60B1E, #FFC400)",
    placeholders: [
      "¡Hola amigo! ¿Hablamos un rato?",
      "¡Olé! Bienvenido a mi Fan Zone.",
      "¿Preparado para el Mundial 2026?",
      "Vamos a hablar de La Roja.",
      "¿Quién es tu jugador favorito?",
      "¡Magnífico tenerte por aquí!"
    ],
    inputPlaceholder: "Hazle tu pregunta a TIKI...",
    welcomeMessage: "¡Hola amigo! Soy TIKI, el toro noble de GlowWorld. Estoy aquí para vivir contigo el Mundial 2026 con La Roja. ¡Vamos!",
    closeButtonAriaLabel: "Cerrar el chat",
    deleteConfirmText: "¿Borrar toda nuestra conversación? Esta acción es definitiva.",
    deleteButtonText: "Borrar conversación"
  },
  usa: {
    name: "STARZ",
    role: "Your USMNT companion",
    image: "/images/mascots/starz.png",
    primaryColor: "#002868",
    secondaryColor: "#BF0A30",
    headerGradient: "linear-gradient(to right, #002868, #BF0A30)",
    placeholders: [
      "Hey buddy, let's chat!",
      "Awesome to see you here!",
      "Ready for World Cup 2026?",
      "Let's talk Team USA!",
      "Who's your favorite player?",
      "Ask me anything about soccer!"
    ],
    inputPlaceholder: "Ask STARZ anything...",
    welcomeMessage: "Hey buddy! I'm STARZ, your bald eagle companion to cheer for Team USA at the 2026 World Cup. Let's go!",
    closeButtonAriaLabel: "Close chat",
    deleteConfirmText: "Delete our entire conversation? This action is permanent.",
    deleteButtonText: "Delete conversation"
  },
  mexico: {
    name: "TRI",
    role: "El águila real",
    image: "/images/mascots/tri.png",
    primaryColor: "#006847",
    secondaryColor: "#CE1126",
    headerGradient: "linear-gradient(to right, #006847, #CE1126)",
    placeholders: [
      "¡Órale, compadre! ¿Platicamos?",
      "¡Qué padre verte por aquí!",
      "¿Listo para el Mundial 2026?",
      "¡Vamos a hablar del Tri!",
      "¿Quién es tu jugador favorito?",
      "¡Ándale, hazme una pregunta!"
    ],
    inputPlaceholder: "Hazle una pregunta a TRI...",
    welcomeMessage: "¡Órale, compadre! Soy TRI, tu águila real para vivir el Mundial 2026 con la Selección Mexicana. ¡Vamos!",
    closeButtonAriaLabel: "Cerrar el chat",
    deleteConfirmText: "¿Borrar toda nuestra plática? Esta acción es definitiva.",
    deleteButtonText: "Borrar plática"
  },
  canada: {
    name: "HOCK",
    role: "Your Canada Soccer companion",
    image: "/images/mascots/hock.png",
    primaryColor: "#FF0000",
    secondaryColor: "#FFFFFF",
    headerGradient: "linear-gradient(to right, #FF0000, #FFFFFF)",
    placeholders: [
      "Hey buddy, let's chat eh?",
      "Salut! On y croit pour 2026.",
      "Ready for World Cup 2026?",
      "Let's talk Canada Soccer!",
      "On parle de l'équipe ?",
      "Sorry to ask, but who's your fav player?"
    ],
    inputPlaceholder: "Ask HOCK anything... / Pose ta question",
    welcomeMessage: "Hey buddy, sorry to bother you! I'm HOCK, your friendly beaver. Salut compatriote! On vibre ensemble pour la Coupe du Monde 2026 avec Canada Soccer.",
    closeButtonAriaLabel: "Close chat / Fermer",
    deleteConfirmText: "Delete our conversation? This is permanent. / Effacer notre conversation ? Définitif.",
    deleteButtonText: "Delete / Effacer"
  }
};

// Mapping pays long → code ISO 2 lettres pour le backend Phase 1A
// Le backend attend 'fr', 'br', 'ar', etc. dans les requêtes /api/fan-chat
export const COUNTRY_TO_BACKEND_CODE: Record<CountryKey, string> = {
  france: 'fr',
  brazil: 'br',
  argentina: 'ar',
  portugal: 'pt',
  spain: 'es',
  usa: 'us',
  mexico: 'mx',
  canada: 'ca'
};
