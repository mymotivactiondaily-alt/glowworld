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
  squad: Array<{
    id: number;
    num: number;
    name: string;
    pos: string;
    posKey: 'gk' | 'def' | 'mid' | 'att';
    club: string;
    age: number;
    caps: number;
    goals: number;
  }>;
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
    squad: [
      { id:1, num:1, name:'Mike Maignan', pos:'Gardien', posKey:'gk', club:'AC Milan', age:28, caps:34, goals:0 },
      { id:2, num:2, name:'Jules Koundé', pos:'Défenseur', posKey:'def', club:'FC Barcelone', age:25, caps:48, goals:2 },
      { id:3, num:22, name:'Théo Hernandez', pos:'Défenseur', posKey:'def', club:'AC Milan', age:26, caps:29, goals:5 },
      { id:4, num:5, name:'Dayot Upamecano', pos:'Défenseur', posKey:'def', club:'Bayern Munich', age:25, caps:33, goals:2 },
      { id:5, num:4, name:'William Saliba', pos:'Défenseur', posKey:'def', club:'Arsenal FC', age:23, caps:18, goals:1 },
      { id:6, num:8, name:'Aurélien Tchouaméni', pos:'Milieu', posKey:'mid', club:'Real Madrid', age:24, caps:36, goals:3 },
      { id:7, num:14, name:'Eduardo Camavinga', pos:'Milieu', posKey:'mid', club:'Real Madrid', age:21, caps:22, goals:1 },
      { id:8, num:7, name:'Ousmane Dembélé', pos:'Milieu', posKey:'mid', club:'PSG', age:27, caps:54, goals:12 },
      { id:9, num:10, name:'Kylian Mbappé', pos:'Attaquant', posKey:'att', club:'Real Madrid', age:25, caps:80, goals:48 },
      { id:10, num:9, name:'Marcus Thuram', pos:'Attaquant', posKey:'att', club:'Inter Milan', age:26, caps:31, goals:10 },
      { id:11, num:11, name:'Antoine Griezmann', pos:'Attaquant', posKey:'att', club:'Atlético Madrid', age:33, caps:137, goals:44 },
    ]
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
    squad: [
      { id:1, num:1, name:'Alisson Becker', pos:'Goalkeeper', posKey:'gk', club:'Liverpool FC', age:31, caps:78, goals:1 },
      { id:2, num:2, name:'Danilo', pos:'Defender', posKey:'def', club:'Juventus FC', age:32, caps:55, goals:3 },
      { id:3, num:3, name:'Marquinhos', pos:'Defender', posKey:'def', club:'PSG', age:29, caps:82, goals:12 },
      { id:4, num:4, name:'Gabriel Magalhães', pos:'Defender', posKey:'def', club:'Arsenal FC', age:26, caps:22, goals:4 },
      { id:5, num:6, name:'Renan Lodi', pos:'Defender', posKey:'def', club:'Nottingham Forest', age:26, caps:17, goals:2 },
      { id:6, num:5, name:'Bruno Guimarães', pos:'Midfielder', posKey:'mid', club:'Newcastle United', age:26, caps:29, goals:3 },
      { id:7, num:8, name:'Lucas Paquetá', pos:'Midfielder', posKey:'mid', club:'West Ham United', age:26, caps:50, goals:10 },
      { id:8, num:18, name:'Gerson', pos:'Midfielder', posKey:'mid', club:'Flamengo', age:26, caps:18, goals:2 },
      { id:9, num:10, name:'Vinicius Jr', pos:'Forward', posKey:'att', club:'Real Madrid', age:23, caps:52, goals:14 },
      { id:10, num:9, name:'Endrick', pos:'Forward', posKey:'att', club:'Real Madrid', age:18, caps:12, goals:5 },
      { id:11, num:11, name:'Rodrygo', pos:'Forward', posKey:'att', club:'Real Madrid', age:23, caps:38, goals:11 },
    ]
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
    squad: [
      { id:1, num:1, name:'Matt Turner', pos:'Goalkeeper', posKey:'gk', club:'Crystal Palace', age:29, caps:38, goals:0 },
      { id:2, num:2, name:'Sergiño Dest', pos:'Defender', posKey:'def', club:'PSV Eindhoven', age:23, caps:36, goals:2 },
      { id:3, num:5, name:'Tim Ream', pos:'Defender', posKey:'def', club:'Fulham FC', age:36, caps:55, goals:1 },
      { id:4, num:4, name:'Chris Richards', pos:'Defender', posKey:'def', club:'Crystal Palace', age:24, caps:18, goals:1 },
      { id:5, num:3, name:'Antonee Robinson', pos:'Defender', posKey:'def', club:'Fulham FC', age:26, caps:42, goals:3 },
      { id:6, num:8, name:'Tyler Adams', pos:'Midfielder', posKey:'mid', club:'Bournemouth', age:25, caps:48, goals:2 },
      { id:7, num:6, name:'Weston McKennie', pos:'Midfielder', posKey:'mid', club:'Juventus FC', age:25, caps:51, goals:10 },
      { id:8, num:7, name:'Gio Reyna', pos:'Midfielder', posKey:'mid', club:'Borussia Dortmund', age:21, caps:28, goals:5 },
      { id:9, num:10, name:'Christian Pulisic', pos:'Forward', posKey:'att', club:'AC Milan', age:25, caps:67, goals:27 },
      { id:10, num:9, name:'Josh Sargent', pos:'Forward', posKey:'att', club:'Norwich City', age:23, caps:32, goals:9 },
      { id:11, num:11, name:'Tim Weah', pos:'Forward', posKey:'att', club:'Juventus FC', age:24, caps:29, goals:5 },
    ]
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
    squad: [
      { id:1, num:1, name:'Emiliano Martínez', pos:'Goalkeeper', posKey:'gk', club:'Aston Villa', age:31, caps:42, goals:0 },
      { id:2, num:26, name:'Nahuel Molina', pos:'Defender', posKey:'def', club:'Atlético Madrid', age:26, caps:38, goals:5 },
      { id:3, num:13, name:'Cristian Romero', pos:'Defender', posKey:'def', club:'Tottenham Hotspur', age:26, caps:34, goals:3 },
      { id:4, num:6, name:'Germán Pezzella', pos:'Defender', posKey:'def', club:'Real Betis', age:32, caps:36, goals:3 },
      { id:5, num:3, name:'Nicolás Tagliafico', pos:'Defender', posKey:'def', club:'Olympique Lyon', age:31, caps:52, goals:4 },
      { id:6, num:5, name:'Leandro Paredes', pos:'Midfielder', posKey:'mid', club:'Roma', age:29, caps:58, goals:5 },
      { id:7, num:7, name:'Rodrigo De Paul', pos:'Midfielder', posKey:'mid', club:'Atlético Madrid', age:29, caps:62, goals:9 },
      { id:8, num:20, name:'Alexis Mac Allister', pos:'Midfielder', posKey:'mid', club:'Liverpool FC', age:25, caps:32, goals:8 },
      { id:9, num:10, name:'Lionel Messi', pos:'Forward', posKey:'att', club:'Inter Miami', age:37, caps:187, goals:109 },
      { id:10, num:9, name:'Julián Álvarez', pos:'Forward', posKey:'att', club:'Atlético Madrid', age:24, caps:38, goals:24 },
      { id:11, num:11, name:'Ángel Di María', pos:'Forward', posKey:'att', club:'Benfica', age:36, caps:145, goals:31 },
    ]
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
    squad: [
      { id:1, num:1, name:'Guillermo Ochoa', pos:'Portero', posKey:'gk', club:'América', age:38, caps:143, goals:0 },
      { id:2, num:2, name:'Jorge Sánchez', pos:'Defensa', posKey:'def', club:'Ajax', age:23, caps:28, goals:1 },
      { id:3, num:3, name:'César Montes', pos:'Defensa', posKey:'def', club:'Espanyol', age:26, caps:34, goals:3 },
      { id:4, num:4, name:'Johan Vásquez', pos:'Defensa', posKey:'def', club:'Genoa', age:24, caps:22, goals:2 },
      { id:5, num:23, name:'Jesús Gallardo', pos:'Defensa', posKey:'def', club:'Monterrey', age:28, caps:56, goals:4 },
      { id:6, num:6, name:'Edson Álvarez', pos:'Mediocampista', posKey:'mid', club:'West Ham United', age:26, caps:68, goals:8 },
      { id:7, num:8, name:'Carlos Rodríguez', pos:'Mediocampista', posKey:'mid', club:'Cruz Azul', age:25, caps:32, goals:3 },
      { id:8, num:10, name:'Héctor Herrera', pos:'Mediocampista', posKey:'mid', club:'Houston Dynamo', age:33, caps:103, goals:18 },
      { id:9, num:7, name:'Hirving Lozano', pos:'Delantero', posKey:'att', club:'PSV Eindhoven', age:28, caps:79, goals:17 },
      { id:10, num:9, name:'Raúl Jiménez', pos:'Delantero', posKey:'att', club:'Fulham FC', age:32, caps:109, goals:36 },
      { id:11, num:11, name:'Alexis Vega', pos:'Delantero', posKey:'att', club:'Chivas', age:26, caps:34, goals:8 },
    ]
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
    squad: [
      { id:1, num:1, name:'Maxime Crépeau', pos:'Goalkeeper', posKey:'gk', club:'LA Galaxy', age:28, caps:32, goals:0 },
      { id:2, num:2, name:'Richie Laryea', pos:'Defender', posKey:'def', club:'Nottingham Forest', age:28, caps:38, goals:2 },
      { id:3, num:5, name:'Steven Vitória', pos:'Defender', posKey:'def', club:'Marítimo', age:35, caps:12, goals:1 },
      { id:4, num:4, name:'Kamal Miller', pos:'Defender', posKey:'def', club:'FC Cincinnati', age:26, caps:32, goals:2 },
      { id:5, num:3, name:'Sam Adekugbe', pos:'Defender', posKey:'def', club:'Hatayspor', age:27, caps:34, goals:3 },
      { id:6, num:6, name:'Stephen Eustáquio', pos:'Midfielder', posKey:'mid', club:'FC Porto', age:26, caps:38, goals:5 },
      { id:7, num:8, name:'Atiba Hutchinson', pos:'Midfielder', posKey:'mid', club:'Beşiktaş', age:39, caps:102, goals:12 },
      { id:8, num:7, name:'Jonathan David', pos:'Midfielder', posKey:'mid', club:'LOSC Lille', age:23, caps:44, goals:24 },
      { id:9, num:10, name:'Alphonso Davies', pos:'Forward', posKey:'att', club:'Bayern Munich', age:23, caps:52, goals:14 },
      { id:10, num:9, name:'Cyle Larin', pos:'Forward', posKey:'att', club:'Club Brugge', age:27, caps:58, goals:27 },
      { id:11, num:11, name:'Tajon Buchanan', pos:'Forward', posKey:'att', club:'Club Brugge', age:24, caps:32, goals:6 },
    ]
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
    squad: [
      { id:1, num:1, name:'Rui Patrício', pos:'Guarda-redes', posKey:'gk', club:'AS Roma', age:35, caps:110, goals:0 },
      { id:2, num:2, name:'João Cancelo', pos:'Defensor', posKey:'def', club:'FC Barcelone', age:29, caps:55, goals:4 },
      { id:3, num:5, name:'Rúben Dias', pos:'Defensor', posKey:'def', club:'Manchester City', age:26, caps:52, goals:4 },
      { id:4, num:4, name:'Pepe', pos:'Defensor', posKey:'def', club:'FC Porto', age:40, caps:141, goals:8 },
      { id:5, num:3, name:'Nuno Mendes', pos:'Defensor', posKey:'def', club:'PSG', age:21, caps:24, goals:1 },
      { id:6, num:6, name:'Rúben Neves', pos:'Médio', posKey:'mid', club:'Al Hilal', age:26, caps:52, goals:8 },
      { id:7, num:8, name:'João Moutinho', pos:'Médio', posKey:'mid', club:'Wolverhampton', age:36, caps:148, goals:7 },
      { id:8, num:10, name:'Bernardo Silva', pos:'Médio', posKey:'mid', club:'Manchester City', age:28, caps:79, goals:16 },
      { id:9, num:7, name:'Cristiano Ronaldo', pos:'Avançado', posKey:'att', club:'Al Nassr', age:39, caps:207, goals:130 },
      { id:10, num:9, name:'André Silva', pos:'Avançado', posKey:'att', club:'RB Leipzig', age:27, caps:52, goals:24 },
      { id:11, num:11, name:'Rafael Leão', pos:'Avançado', posKey:'att', club:'AC Milan', age:24, caps:28, goals:7 },
    ]
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
    squad: [
      { id:1, num:1, name:'Unai Simón', pos:'Portero', posKey:'gk', club:'Athletic Club', age:26, caps:32, goals:0 },
      { id:2, num:2, name:'Dani Carvajal', pos:'Defensa', posKey:'def', club:'Real Madrid', age:31, caps:64, goals:4 },
      { id:3, num:5, name:'Aymeric Laporte', pos:'Defensa', posKey:'def', club:'Al Nassr', age:29, caps:28, goals:4 },
      { id:4, num:4, name:'Pau Torres', pos:'Defensa', posKey:'def', club:'Aston Villa', age:26, caps:30, goals:3 },
      { id:5, num:3, name:'Jordi Alba', pos:'Defensa', posKey:'def', club:'Inter Miami', age:34, caps:98, goals:10 },
      { id:6, num:6, name:'Rodri', pos:'Centrocampista', posKey:'mid', club:'Manchester City', age:27, caps:44, goals:7 },
      { id:7, num:8, name:'Koke', pos:'Centrocampista', posKey:'mid', club:'Atlético Madrid', age:31, caps:62, goals:5 },
      { id:8, num:10, name:'Pedri', pos:'Centrocampista', posKey:'mid', club:'FC Barcelone', age:21, caps:28, goals:3 },
      { id:9, num:7, name:'Álvaro Morata', pos:'Delantero', posKey:'att', club:'Atlético Madrid', age:30, caps:78, goals:35 },
      { id:10, num:9, name:'Ferran Torres', pos:'Delantero', posKey:'att', club:'FC Barcelone', age:23, caps:38, goals:18 },
      { id:11, num:11, name:'Ansu Fati', pos:'Delantero', posKey:'att', club:'FC Barcelone', age:21, caps:22, goals:8 },
    ]
  },
};
