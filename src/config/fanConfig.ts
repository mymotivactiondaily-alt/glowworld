export interface CountryConfig {
  code: string;
  name: { fr: string; en: string; es: string; pt: string };
  flag: string;
  teamId: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    bgDark: string;
    border: string;
    muted: string;
  };
  slogan: { fr: string; en: string; es: string; pt: string };
  anthem: { title: string; year: string };
  lang: 'fr' | 'en' | 'es' | 'pt';
}

export const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  france: {
    code: 'FR',
    name: { fr: 'France', en: 'France', es: 'Francia', pt: 'França' },
    flag: '🇫🇷',
    teamId: 773,
    colors: {
      primary: '#002395',
      secondary: '#ED2939',
      accent: '#FFDF00',
      bg: '#05080F',
      bgDark: '#0A0F1E',
      border: '#1a2040',
      muted: '#6B7DB3',
    },
    slogan: { fr: 'Allez les Bleus !', en: 'Go Les Bleus!', es: '¡Vamos los Azules!', pt: 'Vai França!' },
    anthem: { title: 'La Marseillaise', year: '1792' },
    lang: 'fr',
  },
  brazil: {
    code: 'BR',
    name: { fr: 'Brésil', en: 'Brazil', es: 'Brasil', pt: 'Brasil' },
    flag: '🇧🇷',
    teamId: 764,
    colors: {
      primary: '#009C3B',
      secondary: '#FFDF00',
      accent: '#002776',
      bg: '#020D02',
      bgDark: '#051405',
      border: '#0a2a0a',
      muted: '#4a8a5a',
    },
    slogan: { fr: 'Allez le Brésil !', en: 'Go Brasil!', es: '¡Vamos Brasil!', pt: 'Vai Brasil!' },
    anthem: { title: 'Hino Nacional Brasileiro', year: '1831' },
    lang: 'pt',
  },
  usa: {
    code: 'US',
    name: { fr: 'USA', en: 'USA', es: 'EE.UU.', pt: 'EUA' },
    flag: '🇺🇸',
    teamId: 762,
    colors: {
      primary: '#B22234',
      secondary: '#3C3B6E',
      accent: '#FFFFFF',
      bg: '#0A0508',
      bgDark: '#140810',
      border: '#2a1020',
      muted: '#8a5a6a',
    },
    slogan: { fr: 'Go USA !', en: 'Go USA!', es: '¡Vamos USA!', pt: 'Vai EUA!' },
    anthem: { title: 'The Star-Spangled Banner', year: '1931' },
    lang: 'en',
  },
  argentina: {
    code: 'AR',
    name: { fr: 'Argentine', en: 'Argentina', es: 'Argentina', pt: 'Argentina' },
    flag: '🇦🇷',
    teamId: 762,
    colors: {
      primary: '#74ACDF',
      secondary: '#FFFFFF',
      accent: '#F6B40E',
      bg: '#030A10',
      bgDark: '#071525',
      border: '#0a2040',
      muted: '#5a8ab0',
    },
    slogan: { fr: 'Allez l\'Albiceleste !', en: 'Go Albiceleste!', es: '¡Vamos Argentina!', pt: 'Vai Argentina!' },
    anthem: { title: 'Himno Nacional Argentino', year: '1813' },
    lang: 'es',
  },
  mexico: {
    code: 'MX',
    name: { fr: 'Mexique', en: 'Mexico', es: 'México', pt: 'México' },
    flag: '🇲🇽',
    teamId: 764,
    colors: {
      primary: '#006847',
      secondary: '#CE1126',
      accent: '#FFFFFF',
      bg: '#020A05',
      bgDark: '#04140A',
      border: '#0a2a15',
      muted: '#4a8a6a',
    },
    slogan: { fr: 'Allez El Tri !', en: 'Go El Tri!', es: '¡Arriba México!', pt: 'Vai México!' },
    anthem: { title: 'Himno Nacional Mexicano', year: '1943' },
    lang: 'es',
  },
  canada: {
    code: 'CA',
    name: { fr: 'Canada', en: 'Canada', es: 'Canadá', pt: 'Canadá' },
    flag: '🇨🇦',
    teamId: 769,
    colors: {
      primary: '#FF0000',
      secondary: '#FFFFFF',
      accent: '#FF0000',
      bg: '#0A0202',
      bgDark: '#140505',
      border: '#2a0a0a',
      muted: '#8a5a5a',
    },
    slogan: { fr: 'Allez le Canada !', en: 'Go Canada!', es: '¡Vamos Canadá!', pt: 'Vai Canadá!' },
    anthem: { title: 'O Canada', year: '1980' },
    lang: 'en',
  },
  portugal: {
    code: 'PT',
    name: { fr: 'Portugal', en: 'Portugal', es: 'Portugal', pt: 'Portugal' },
    flag: '🇵🇹',
    teamId: 765,
    colors: {
      primary: '#006600',
      secondary: '#FF0000',
      accent: '#FFD700',
      bg: '#030A03',
      bgDark: '#071407',
      border: '#0a2a0a',
      muted: '#4a7a4a',
    },
    slogan: { fr: 'Allez le Portugal !', en: 'Go Portugal!', es: '¡Vamos Portugal!', pt: 'Vai Portugal!' },
    anthem: { title: 'A Portuguesa', year: '1910' },
    lang: 'pt',
  },
  spain: {
    code: 'ES',
    name: { fr: 'Espagne', en: 'Spain', es: 'España', pt: 'Espanha' },
    flag: '🇪🇸',
    teamId: 760,
    colors: {
      primary: '#AA151B',
      secondary: '#F1BF00',
      accent: '#FFFFFF',
      bg: '#0A0202',
      bgDark: '#150404',
      border: '#2a0808',
      muted: '#8a5a5a',
    },
    slogan: { fr: 'Allez La Roja !', en: 'Go La Roja!', es: '¡Vamos España!', pt: 'Vai Espanha!' },
    anthem: { title: 'Marcha Real', year: '1770' },
    lang: 'es',
  },
};
