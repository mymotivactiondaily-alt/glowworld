import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Zap, ArrowLeft, Play, Users, Trophy, Target } from 'lucide-react';
import { COUNTRY_CONFIGS } from '../config/fanConfig';

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY || '';
const API_BASE = 'https://api.football-data.org/v4';

export const FanPage = () => {
  const { country } = useParams<{ country: string }>();
  const config = COUNTRY_CONFIGS[country?.toLowerCase() || ''];
  const lang = config.lang;
  const t = {
    worldCup: { fr: 'Coupe du Monde 2026', en: 'World Cup 2026', es: 'Copa del Mundo 2026', pt: 'Copa do Mundo 2026' },
    fanZone: { fr: 'Espace Fan Officiel GlowWorld', en: 'Official GlowWorld Fan Zone', es: 'Zona Fan Oficial GlowWorld', pt: 'Espaço Fan Oficial GlowWorld' },
    soundReactive: { fr: 'Bracelet Sound-Reactive activé · Réagit à chaque cri, chaque but', en: 'Sound-Reactive wristband activated · Reacts to every shout, every goal', es: 'Pulsera Sound-Reactive activada · Reacciona a cada grito, cada gol', pt: 'Pulseira Sound-Reactive ativada · Reage a cada grito, cada gol' },
    nextMatch: { fr: 'Prochain match', en: 'Next match', es: 'Próximo partido', pt: 'Próximo jogo' },
    noMatch: { fr: 'Aucun match programmé', en: 'No match scheduled', es: 'Ningún partido programado', pt: 'Nenhum jogo programado' },
    loading: { fr: 'Chargement...', en: 'Loading...', es: 'Cargando...', pt: 'Carregando...' },
    standings: { fr: 'Classement du groupe', en: 'Group standings', es: 'Clasificación del grupo', pt: 'Classificação do grupo' },
    anthem: { fr: 'Hymne national', en: 'National anthem', es: 'Himno nacional', pt: 'Hino nacional' },
    days: { fr: 'Jours', en: 'Days', es: 'Días', pt: 'Dias' },
    hours: { fr: 'Heures', en: 'Hours', es: 'Horas', pt: 'Horas' },
    min: { fr: 'Min', en: 'Min', es: 'Min', pt: 'Min' },
    sec: { fr: 'Sec', en: 'Sec', es: 'Seg', pt: 'Seg' },
    rank: { fr: '#', en: '#', es: '#', pt: '#' },
    team: { fr: 'Équipe', en: 'Team', es: 'Selección', pt: 'Seleção' },
    played: { fr: 'J', en: 'P', es: 'J', pt: 'J' },
    won: { fr: 'G', en: 'W', es: 'G', pt: 'V' },
    draw: { fr: 'N', en: 'D', es: 'E', pt: 'E' },
    lost: { fr: 'P', en: 'L', es: 'D', pt: 'D' },
    pts: { fr: 'Pts', en: 'Pts', es: 'Pts', pt: 'Pts' },
    footer: { fr: "GLOWWORLD 2026 · L'émotion en temps réel", en: 'GLOWWORLD 2026 · Feel it in real time', es: 'GLOWWORLD 2026 · La emoción en tiempo real', pt: 'GLOWWORLD 2026 · A emoção em tempo real' },
    backHome: { fr: "Retour à l'accueil", en: 'Back to home', es: 'Volver al inicio', pt: 'Voltar ao início' },
    countryNotFound: { fr: 'Pays non trouvé', en: 'Country not found', es: 'País no encontrado', pt: 'País não encontrado' },
  };
  const txt = (key: keyof typeof t) => t[key][lang] || t[key]['en'];

  const [nextMatch, setNextMatch] = useState<any>(null);
  const [standings, setStandings] = useState<any[]>([]);
  const [liveMatch, setLiveMatch] = useState<any>(null);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!config) return;
    fetchData();
  }, [country]);

  useEffect(() => {
    if (!nextMatch?.utcDate) return;
    const interval = setInterval(() => {
      const diff = Math.max(0, new Date(nextMatch.utcDate).getTime() - Date.now());
      setCountdown({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [nextMatch]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { 'X-Auth-Token': API_KEY };
      const [matchesRes, standingsRes] = await Promise.all([
        fetch(`${API_BASE}/teams/${config.teamId}/matches?status=SCHEDULED&limit=1`, { headers }),
        fetch(`${API_BASE}/competitions/WC/standings`, { headers }),
      ]);
      if (matchesRes.ok) {
        const data = await matchesRes.json();
        if (data.matches?.length > 0) setNextMatch(data.matches[0]);
      }
      if (standingsRes.ok) {
        const data = await standingsRes.json();
        const group = data.standings?.find((g: any) =>
          g.table?.some((t: any) => t.team?.tla === config.code)
        );
        if (group) setStandings(group.table || []);
      }
    } catch (e) {
      console.log('API not configured yet — using demo data');
    }
    setLoading(false);
  };

  if (!config) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h1 className="text-4xl font-black mb-8">{txt('countryNotFound')}</h1>
        <Link to="/" className="text-france-blue font-bold flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> {txt('backHome')}
        </Link>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div style={{ backgroundColor: config.colors.bg, minHeight: '100vh', color: '#fff' }}>
      <Helmet>
        <title>Fan Page {config.flag} {config.name[lang] || config.name.fr} | GlowWorld 2026</title>
      </Helmet>

      {/* Header */}
      <div style={{ backgroundColor: config.colors.bgDark, borderBottom: `2px solid ${config.colors.primary}`, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '18px', letterSpacing: '2px', fontFamily: 'monospace' }}>
          <Zap size={18} style={{ color: config.colors.primary }} /> GLOWWORLD
        </Link>
        <div style={{ background: config.colors.primary, borderRadius: '20px', padding: '6px 14px', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
          {config.flag} Fan Zone
        </div>
      </div>

      {/* Hero */}
      <div style={{ backgroundColor: config.colors.bgDark, borderBottom: `1px solid ${config.colors.border}`, padding: '28px 20px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: config.colors.secondary, color: config.colors.bg, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '3px', marginBottom: '12px' }}>
          {txt('worldCup')}
        </div>
        <div style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '3px', lineHeight: 1, textTransform: 'uppercase', marginBottom: '8px' }}>
          {config.slogan[lang] || config.slogan.fr}
        </div>
        <div style={{ fontSize: '13px', color: config.colors.muted, fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>
          {config.flag} {txt('fanZone')}
        </div>
      </div>

      {/* Sound reactive strip */}
      <div style={{ background: config.colors.bgDark, borderTop: `1px solid ${config.colors.border}`, borderBottom: `1px solid ${config.colors.border}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <Zap size={14} style={{ color: config.colors.primary }} />
        <p style={{ fontSize: '12px', color: config.colors.muted, margin: 0 }}>
          {txt('soundReactive')}
        </p>
        <Zap size={14} style={{ color: config.colors.primary }} />
      </div>

      {/* Prochain match + Countdown */}
      <div style={{ padding: '20px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: config.colors.muted, marginBottom: '12px' }}>
          {txt('nextMatch')}
        </div>
        <div style={{ background: config.colors.bgDark, border: `1px solid ${config.colors.border}`, borderRadius: '12px', padding: '20px' }}>
          {nextMatch ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '32px' }}>{config.flag}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '6px' }}>{config.name[lang] || config.name.fr}</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: '20px', color: config.colors.muted, padding: '0 12px' }}>VS</div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '32px' }}>🏳️</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '6px' }}>
                    {nextMatch.awayTeam?.shortName || 'À déterminer'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' }}>
                {[
                  { v: countdown.d, l: txt('days') },
                  { v: countdown.h, l: txt('hours') },
                  { v: countdown.m, l: txt('min') },
                  { v: countdown.s, l: txt('sec') },
                ].map(({ v, l }) => (
                  <div key={l} style={{ background: config.colors.bg, border: `1px solid ${config.colors.border}`, borderRadius: '8px', padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '28px', color: config.colors.primary, fontWeight: 900, lineHeight: 1 }}>{pad(v)}</div>
                    <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: config.colors.muted, marginTop: '3px' }}>{l}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', color: config.colors.muted, padding: '20px' }}>
              {loading ? txt('loading') : txt('noMatch')}
            </div>
          )}
        </div>
      </div>

      {/* Classement */}
      {standings.length > 0 && (
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: config.colors.muted, marginBottom: '12px' }}>
            {txt('standings')}
          </div>
          <div style={{ background: config.colors.bgDark, border: `1px solid ${config.colors.border}`, borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${config.colors.border}` }}>
                  {[txt('rank'), txt('team'), txt('played'), txt('won'), txt('draw'), txt('lost'), txt('pts')].map(h => (
                    <th key={h} style={{ padding: '10px 8px', textAlign: h === txt('team') ? 'left' : 'center', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: config.colors.muted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {standings.map((row: any, i: number) => (
                  <tr key={i} style={{ borderTop: `1px solid ${config.colors.border}`, background: row.team?.tla === config.code ? `${config.colors.primary}20` : 'transparent' }}>
                    <td style={{ padding: '10px 8px', textAlign: 'center', color: config.colors.muted }}>{row.position}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <span style={{ fontWeight: row.team?.tla === config.code ? 700 : 500, color: row.team?.tla === config.code ? '#fff' : config.colors.muted }}>
                        {row.team?.shortName}
                      </span>
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', color: config.colors.muted }}>{row.playedGames}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', color: config.colors.muted }}>{row.won}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', color: config.colors.muted }}>{row.draw}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', color: config.colors.muted }}>{row.lost}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 700, color: config.colors.primary }}>{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hymne */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: config.colors.muted, marginBottom: '12px' }}>
          {txt('anthem')}
        </div>
        <div style={{ background: config.colors.bgDark, border: `1px solid ${config.colors.primary}`, borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: config.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <Play size={16} color="#fff" style={{ marginLeft: '2px' }} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{config.anthem.title}</div>
            <div style={{ fontSize: '12px', color: config.colors.muted }}>{config.name[lang] || config.name.fr} · {config.anthem.year}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '11px', color: config.colors.border, letterSpacing: '1px', textTransform: 'uppercase' }}>
        {txt('footer')}
      </div>
    </div>
  );
};
