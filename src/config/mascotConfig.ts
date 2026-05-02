export type CountryKey = 'france' | 'brazil' | 'argentina' | 'portugal' | 'spain' | 'usa' | 'mexico' | 'canada';

export interface MascotConfig {
  name: string;
  role: string;
  image: string;
  primaryColor: string;
  secondaryColor: string;
  headerGradient: string;
  inputSuggestions: string[];      // 6 phrases d'accroche en langue native
  quickReplies: string[];         // 3 boutons de réponse rapide (Compagnon)
  inputPlaceholder: string;
  welcomeMessage: string;
  ctaOpenChat: string;            // Texte du CTA pour ouvrir le panel
  closeButtonAriaLabel: string;
  deleteConfirmText: string;
  deleteButtonText: string;
  celebrationKeywords: string[];   // Mots-clés pour trigger confetti/anim
  braceletCard: {                  // Données pour la carte promotionnelle
    title: string;
    description: string;
    cta: string;
    image: string;
  };
}

export const MASCOT_CONFIG: Record<CountryKey, MascotConfig> = {
  france: {
    name: "GAUL'O",
    role: "Le coq tricolore",
    image: "/images/mascots/gaulo.png",
    primaryColor: "#002395",
    secondaryColor: "#ED2939",
    headerGradient: "linear-gradient(to right, #002395, #ED2939)",
    inputSuggestions: [
      "Cocorico ! Salut compatriote, viens discuter !",
      "Tu as une question sur les Bleus ?",
      "Allez ! On y croit pour ce Mondial !",
      "Pose-moi tes questions, je suis là !",
      "On parle un peu de l'équipe ?",
      "Notre milieu de terrain est solide cette année."
    ],
    quickReplies: ["On gagne en 2026 ?", "C'est qui le meilleur ?", "Parle-moi des Bleus"],
    inputPlaceholder: "Pose ta question à GAUL'O...",
    welcomeMessage: "Cocorico ! Salut compatriote ! Je suis GAUL'O, ton compagnon pour vibrer avec les Bleus tout au long de la Coupe du Monde 2026.",
    ctaOpenChat: "Discuter avec GAUL'O",
    closeButtonAriaLabel: "Fermer le chat",
    deleteConfirmText: "Effacer toute notre conversation ? Cette action est définitive.",
    deleteButtonText: "Effacer la conversation",
    celebrationKeywords: ["but", "buts", "victoire", "champion", "magnifique", "magique", "allez", "bravo", "incroyable"],
    braceletCard: {
      title: "Bracelet Émotionnel France",
      description: "Vibre au rythme des Bleus avec le bracelet connecté officiel.",
      cta: "Voir le produit",
      image: "/images/wristband_france.png"
    }
  },
  brazil: {
    name: "ZICO",
    role: "O tucano da alegria",
    image: "/images/mascots/zico.png",
    primaryColor: "#009C3B",
    secondaryColor: "#FFDF00",
    headerGradient: "linear-gradient(to right, #009C3B, #FFDF00)",
    inputSuggestions: [
      "Ôi, meu amigo! Vamos conversar?",
      "Que beleza ver você aqui!",
      "Tá pronto pro Mundial 2026?",
      "Quer falar da Seleção?",
      "Vamos dançar com a Canarinha!",
      "Pergunta o que quiser sobre o Brasil!"
    ],
    quickReplies: ["Hexa em 2026 ?", "Quem é o craque ?", "Fala da Seleção"],
    inputPlaceholder: "Faz uma pergunta para o ZICO...",
    welcomeMessage: "Ôi, meu amigo! Eu sou ZICO, seu tucano companheiro para vibrar com a Seleção Brasileira na Copa do Mundo 2026!",
    ctaOpenChat: "Conversar com ZICO",
    closeButtonAriaLabel: "Fechar o chat",
    deleteConfirmText: "Apagar toda a nossa conversa? Esta ação é definitiva.",
    deleteButtonText: "Apagar conversa",
    celebrationKeywords: ["gol", "gols", "vitória", "campeão", "vamos", "show", "lindo", "maravilhoso", "bravo"],
    braceletCard: {
      title: "Pulseira Emocional Brasil",
      description: "Sinta o ritmo da Seleção com a pulseira conectada oficial.",
      cta: "Ver produto",
      image: "/images/wristband_brazil.png"
    }
  },
  argentina: {
    name: "DIEGO",
    role: "El gaucho de las pampas",
    image: "/images/mascots/diego.png",
    primaryColor: "#74ACDF",
    secondaryColor: "#FFFFFF",
    headerGradient: "linear-gradient(to right, #74ACDF, #FFFFFF)",
    inputSuggestions: [
      "¡Che, mi amigo! ¿Charlamos?",
      "¡Bárbaro tenerte por acá!",
      "¿Listo para el Mundial 2026?",
      "Hablemos de la Albiceleste, dale.",
      "¿Quién es tu jugador favorito?",
      "¡Vamos, mi compadre, contame!"
    ],
    quickReplies: ["¿Ganamos en 2026?", "¿Quién es el 10?", "Habla de la Selección"],
    inputPlaceholder: "Hacé tu pregunta a DIEGO...",
    welcomeMessage: "¡Che, mi amigo! Soy DIEGO, tu compañero gaucho para vivir el Mundial 2026 con la Albiceleste. ¡Vamos!",
    ctaOpenChat: "Charlar con DIEGO",
    closeButtonAriaLabel: "Cerrar el chat",
    deleteConfirmText: "¿Borrar toda nuestra conversación? Esta acción es definitiva.",
    deleteButtonText: "Borrar conversación",
    celebrationKeywords: ["gol", "goles", "victoria", "campeón", "vamos", "épico", "increíble", "bravo"],
    braceletCard: {
      title: "Pulsera Emocional Argentina",
      description: "Viví la pasión de la Albiceleste con la pulsera conectada oficial.",
      cta: "Ver producto",
      image: "/images/wristband_argentina.png"
    }
  },
  portugal: {
    name: "FADO",
    role: "O galo de Barcelos",
    image: "/images/mascots/fado.png",
    primaryColor: "#FF0000",
    secondaryColor: "#006600",
    headerGradient: "linear-gradient(to right, #FF0000, #006600)",
    inputSuggestions: [
      "Olá, companheiro! Falamos?",
      "Força Portugal! Sempre.",
      "Pronto para o Mundial 2026?",
      "Vamos falar da Selecção!",
      "Quem é o teu favorito?",
      "Faz a tua pergunta, amigo."
    ],
    quickReplies: ["Ganhamos em 2026?", "Quem é o melhor?", "Fala da Seleção"],
    inputPlaceholder: "Faz uma pergunta ao FADO...",
    welcomeMessage: "Olá, companheiro! Eu sou FADO, o galo de Barcelos. Estou aqui para viver contigo o Mundial 2026 com a nossa Selecção. Força!",
    ctaOpenChat: "Conversar com FADO",
    closeButtonAriaLabel: "Fechar o chat",
    deleteConfirmText: "Apagar toda a nossa conversa? Esta acção é definitiva.",
    deleteButtonText: "Apagar conversa",
    celebrationKeywords: ["golo", "golos", "vitória", "campeão", "força", "lindo", "maravilhoso", "bravo"],
    braceletCard: {
      title: "Pulseira Emocional Portugal",
      description: "Sente o ritmo da Seleção com a pulseira conectada oficial.",
      cta: "Ver produto",
      image: "/images/wristband_portugal.png"
    }
  },
  spain: {
    name: "TIKI",
    role: "El toro noble de La Roja",
    image: "/images/mascots/tiki.png",
    primaryColor: "#C60B1E",
    secondaryColor: "#FFC400",
    headerGradient: "linear-gradient(to right, #C60B1E, #FFC400)",
    inputSuggestions: [
      "¡Hola amigo! ¿Hablamos un rato?",
      "¡Olé! Bienvenido a mi Fan Zone.",
      "¿Preparado para el Mundial 2026?",
      "Vamos a hablar de La Roja.",
      "¿Quién es tu jugador favorito?",
      "¡Magnífico tenerte por aquí!"
    ],
    quickReplies: ["¿Ganamos en 2026?", "¿Quién es el crack?", "Habla de la Roja"],
    inputPlaceholder: "Hazle tu pregunta a TIKI...",
    welcomeMessage: "¡Hola amigo! Soy TIKI, el toro noble de GlowWorld. Estoy aquí para vivir contigo el Mundial 2026 con La Roja. ¡Vamos!",
    ctaOpenChat: "Hablar con TIKI",
    closeButtonAriaLabel: "Cerrar el chat",
    deleteConfirmText: "¿Borrar toda nuestra conversación? Esta acción es definitiva.",
    deleteButtonText: "Borrar conversación",
    celebrationKeywords: ["gol", "goles", "victoria", "campeón", "vamos", "increíble", "bravo", "olé"],
    braceletCard: {
      title: "Pulsera Emocional España",
      description: "Siente la pasión de La Roja con la pulsera conectada oficial.",
      cta: "Ver producto",
      image: "/images/wristband_spain.png"
    }
  },
  usa: {
    name: "STARZ",
    role: "Your USMNT companion",
    image: "/images/mascots/starz.png",
    primaryColor: "#002868",
    secondaryColor: "#BF0A30",
    headerGradient: "linear-gradient(to right, #002868, #BF0A30)",
    inputSuggestions: [
      "Hey buddy, let's chat!",
      "Awesome to see you here!",
      "Ready for World Cup 2026?",
      "Let's talk Team USA!",
      "Who's your favorite player?",
      "Ask me anything about soccer!"
    ],
    quickReplies: ["Will we win in 2026?", "Who's the star?", "Tell me about USMNT"],
    inputPlaceholder: "Ask STARZ anything...",
    welcomeMessage: "Hey buddy! I'm STARZ, your bald eagle companion to cheer for Team USA at the 2026 World Cup. Let's go!",
    ctaOpenChat: "Chat with STARZ",
    closeButtonAriaLabel: "Close chat",
    deleteConfirmText: "Delete our entire conversation? This action is permanent.",
    deleteButtonText: "Delete conversation",
    celebrationKeywords: ["goal", "goals", "victory", "champion", "awesome", "amazing", "let's go", "bravo"],
    braceletCard: {
      title: "USA Emotional Wristband",
      description: "Feel the rhythm of Team USA with the official connected wristband.",
      cta: "View product",
      image: "/images/wristband_usa.png"
    }
  },
  mexico: {
    name: "TRI",
    role: "El águila real",
    image: "/images/mascots/tri.png",
    primaryColor: "#006847",
    secondaryColor: "#CE1126",
    headerGradient: "linear-gradient(to right, #006847, #CE1126)",
    inputSuggestions: [
      "¡Órale, compadre! ¿Platicamos?",
      "¡Qué padre verte por aquí!",
      "¿Listo para el Mundial 2026?",
      "¡Vamos a hablar del Tri!",
      "¿Quién es tu jugador favorito?",
      "¡Ándale, hazme una pregunta!"
    ],
    quickReplies: ["¿Ganamos en 2026?", "¿Quién es el jefe?", "Habla del Tri"],
    inputPlaceholder: "Hazle una pregunta a TRI...",
    welcomeMessage: "¡Órale, compadre! Soy TRI, tu águila real para vivir el Mundial 2026 con la Selección Mexicana. ¡Vamos!",
    ctaOpenChat: "Platicar con TRI",
    closeButtonAriaLabel: "Cerrar el chat",
    deleteConfirmText: "¿Borrar toda nuestra plática? Esta acción es definitiva.",
    deleteButtonText: "Borrar plática",
    celebrationKeywords: ["gol", "goles", "victoria", "campeón", "vamos", "increíble", "bravo", "chido"],
    braceletCard: {
      title: "Pulsera Emocional México",
      description: "Siente la pasión del Tri con la pulsera conectada oficial.",
      cta: "Ver producto",
      image: "/images/wristband_mexico.png"
    }
  },
  canada: {
    name: "HOCK",
    role: "Your Canada Soccer companion",
    image: "/images/mascots/hock.png",
    primaryColor: "#FF0000",
    secondaryColor: "#FFFFFF",
    headerGradient: "linear-gradient(to right, #FF0000, #FFFFFF)",
    inputSuggestions: [
      "Hey buddy, let's chat eh?",
      "Salut! On y croit pour 2026.",
      "Ready for World Cup 2026?",
      "Let's talk Canada Soccer!",
      "On parle de l'équipe ?",
      "Sorry to ask, but who's your fav player?"
    ],
    quickReplies: ["Will we win in 2026?", "Who's the best?", "Talk about Canada"],
    inputPlaceholder: "Ask HOCK anything... / Pose ta question",
    welcomeMessage: "Hey buddy, sorry to bother you! I'm HOCK, your friendly beaver. Salut compatriote! On vibre ensemble pour la Coupe du Monde 2026 avec Canada Soccer.",
    ctaOpenChat: "Chat with HOCK",
    closeButtonAriaLabel: "Close chat / Fermer",
    deleteConfirmText: "Delete our conversation? This is permanent. / Effacer notre conversation ? Définitif.",
    deleteButtonText: "Delete / Effacer",
    celebrationKeywords: ["goal", "goals", "victory", "champion", "awesome", "amazing", "let's go", "bravo", "but"],
    braceletCard: {
      title: "Canada Emotional Wristband",
      description: "Feel the rhythm of Canada Soccer with the official connected wristband.",
      cta: "View product",
      image: "/images/wristband_canada.png"
    }
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
