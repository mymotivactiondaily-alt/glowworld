export type CountryCode = 'fr' | 'br' | 'ar' | 'pt' | 'es' | 'us' | 'mx' | 'ca';
export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface Persona {
  code: CountryCode;
  countryName: string;
  mascotName: string;
  emoji: string;
  systemPrompt: string;
}
