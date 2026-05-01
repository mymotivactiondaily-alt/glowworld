export type CountryCode = 'fr' | 'br' | 'ar' | 'pt' | 'es' | 'us' | 'mx' | 'ca';

export interface MascotConfig {
  code: CountryCode;
  name: string;
  imagePath: string;
  themeColor: string;
  catchphrases: string[];
}

export const MASCOTS: Record<CountryCode, MascotConfig> = {
  fr: {
    code: 'fr',
    name: "GAUL'O",
    imagePath: "/images/mascots/fr.svg",
    themeColor: "#002395",
    catchphrases: [
      "Prêt pour le match, mon ami ? 🐓",
      "Allez les Bleus ! 🇫🇷",
      "Viens discuter de la compo !"
    ]
  },
  br: {
    code: 'br',
    name: "ZICO",
    imagePath: "/images/mascots/br.svg",
    themeColor: "#009c3b",
    catchphrases: [
      "Que beleza ! Vamos Brasil ! 🇧🇷",
      "Pronto para o samba no campo ? 🦜",
      "Vem falar da Seleção !"
    ]
  },
  ar: {
    code: 'ar',
    name: "DIEGO",
    imagePath: "/images/mascots/ar.svg",
    themeColor: "#74acdf",
    catchphrases: [
      "¡Che, vamos Argentina! 🇦🇷",
      "¿Hablamos de fútbol, amigo? ☀️",
      "¡La pasión no se explica!"
    ]
  },
  pt: {
    code: 'pt',
    name: "FADO",
    imagePath: "/images/mascots/pt.svg",
    themeColor: "#ff0000",
    catchphrases: [
      "Força Portugal ! 🇵🇹",
      "Pronto para a vitória ? 🐓",
      "Vem falar com o Fado !"
    ]
  },
  es: {
    code: 'es',
    name: "TIKI",
    imagePath: "/images/mascots/es.svg",
    themeColor: "#c60b1e",
    catchphrases: [
      "¡Vamos La Roja! 🇪🇸",
      "¿Hablamos de tiki-taka? 🐂",
      "¡A por ellos!"
    ]
  },
  us: {
    code: 'us',
    name: "STARZ",
    imagePath: "/images/mascots/us.svg",
    themeColor: "#0a3161",
    catchphrases: [
      "Let's go USA! 🇺🇸",
      "Ready for the World Cup? 🦅",
      "Come chat about soccer!"
    ]
  },
  mx: {
    code: 'mx',
    name: "TRI",
    imagePath: "/images/mascots/mx.svg",
    themeColor: "#006341",
    catchphrases: [
      "¡Viva México, compadre! 🇲🇽",
      "¿Hablamos del Tri? 🌵",
      "¡Órale, vamos a ganar!"
    ]
  },
  ca: {
    code: 'ca',
    name: "HOCK",
    imagePath: "/images/mascots/ca.svg",
    themeColor: "#ff0000",
    catchphrases: [
      "Go Canada Go! 🇨🇦",
      "Ready for the match, eh? 🍁",
      "Viens jaser foot, buddy!"
    ]
  }
};
