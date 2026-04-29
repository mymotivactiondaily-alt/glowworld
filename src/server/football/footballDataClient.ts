import admin from 'firebase-admin';
import { TEAM_MAPPINGS } from './teamMappings.js';
import { CountryCode } from '../types/chat.types.js';
import dotenv from 'dotenv';
dotenv.config();

export async function getTeamContext(countryCode: CountryCode): Promise<string | null> {
  const token = process.env.FOOTBALL_DATA_TOKEN;
  if (!token) return null;

  const teamInfo = TEAM_MAPPINGS[countryCode];
  if (!teamInfo) return null;

  try {
    const db = admin.firestore();
    const cacheRef = db.collection('football_cache').doc(`team_${countryCode}`);
    const doc = await cacheRef.get();
    const ttlHours = Number(process.env.FOOTBALL_CACHE_TTL_HOURS) || 6;

    if (doc.exists) {
      const data = doc.data();
      if (data && data.updated_at) {
        const ageMs = Date.now() - data.updated_at.toMillis();
        if (ageMs < ttlHours * 3600 * 1000) {
          return data.text as string;
        }
      }
    }

    const response = await fetch(`https://api.football-data.org/v4/teams/${teamInfo.teamId}/matches?status=SCHEDULED&limit=2`, {
      headers: { 'X-Auth-Token': token }
    });

    if (!response.ok) {
      console.warn(`[Football Data] API Error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json() as any;
    const matches = data.matches || [];

    if (matches.length === 0) {
      return `L'équipe de ${teamInfo.name} n'a pas de match programmé prochainement.`;
    }

    const nextMatch = matches[0];
    const isHome = nextMatch.homeTeam.id === teamInfo.teamId;
    const opponent = isHome ? nextMatch.awayTeam.name : nextMatch.homeTeam.name;
    const dateObj = new Date(nextMatch.utcDate);
    const dateFR = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    const timeFR = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const competition = nextMatch.competition?.name || '';
    
    const stadium = nextMatch.venue ? `au ${nextMatch.venue}` : 'dans son stade';

    const text = `Prochain match ${teamInfo.name} : ${dateFR} face à ${opponent} ${stadium}, coup d'envoi ${timeFR}. Compétition : ${competition}.`;

    await cacheRef.set({
      text,
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    });

    return text;

  } catch (error) {
    console.warn(`[Football Data] Exception:`, error);
    return null;
  }
}
