import { useState, useEffect, useState as useStateSquad } from 'react';
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
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [squadView, setSquadView] = useState<'pitch' | 'list'>('pitch');

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
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '18px', letterSpacing: '2px', fontFamily: 'var(--font-display)' }}>
          <Zap size={18} style={{ color: config.colors.primary }} /> GLOWWORLD
        </Link>
        <div style={{ background: config.colors.primary, borderRadius: '20px', padding: '6px 14px', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
          {config.flag} Fan Zone
        </div>
      </div>

      {/* Hero */}
      <div style={{ backgroundColor: config.colors.bgDark, borderBottom: `1px solid ${config.colors.border}`, padding: '28px 20px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: config.colors.secondary, color: config.colors.bg, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '3px', marginBottom: '12px' }}>
          {txt('worldCup')}
        </div>
        <div style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '3px', lineHeight: 1, textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
          {config.slogan[lang] || config.slogan.fr}
        </div>
        <div style={{ fontSize: '13px', color: config.colors.muted, fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
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
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: config.colors.muted, marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
          {txt('nextMatch')}
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
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
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', color: config.colors.primary, fontWeight: 900, lineHeight: 1 }}>{pad(v)}</div>
                    <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: config.colors.muted, marginTop: '3px', fontFamily: 'var(--font-display)' }}>{l}</div>
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
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: config.colors.muted, marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
            {txt('standings')}
          </div>
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${config.colors.border}` }}>
                  {[txt('rank'), txt('team'), txt('played'), txt('won'), txt('draw'), txt('lost'), txt('pts')].map(h => (
                    <th key={h} style={{ padding: '10px 8px', textAlign: h === txt('team') ? 'left' : 'center', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: config.colors.muted, fontFamily: 'var(--font-display)' }}>{h}</th>
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

      {/* Squad Section */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: config.colors.muted, marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
          Formation — 4-3-3
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {(['pitch', 'list'] as const).map(v => (
            <button key={v} onClick={() => setSquadView(v)} style={{
              padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
              letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer',
              background: squadView === v ? config.colors.primary : 'transparent',
              border: `1px solid ${squadView === v ? config.colors.primary : config.colors.border}`,
              color: squadView === v ? '#fff' : config.colors.muted,
            }}>
              {v === 'pitch' ? (config.lang === 'pt' ? 'Campo' : config.lang === 'es' ? 'Campo' : 'Terrain') : (config.lang === 'pt' ? 'Lista' : config.lang === 'es' ? 'Lista' : 'Liste')}
            </button>
          ))}
        </div>

        {squadView === 'pitch' && (
          <div style={{ background: '#041504', border: `1px solid ${config.colors.border}`, borderRadius: '12px', padding: '16px', position: 'relative', minHeight: '400px', marginBottom: '12px', overflow: 'hidden' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }} viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="1" y="1" width="98" height="98" fill="none" stroke={config.colors.primary} strokeWidth="0.5"/>
              <line x1="1" y1="50" x2="99" y2="50" stroke={config.colors.primary} strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="15" fill="none" stroke={config.colors.primary} strokeWidth="0.5"/>
              <rect x="25" y="1" width="50" height="15" fill="none" stroke={config.colors.primary} strokeWidth="0.5"/>
              <rect x="25" y="84" width="50" height="15" fill="none" stroke={config.colors.primary} strokeWidth="0.5"/>
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '380px', padding: '8px 0', position: 'relative', zIndex: 1 }}>
              {/* Attackers */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                {config.squad.filter(p => p.posKey === 'att').map(p => (
                  <div key={p.id} onClick={() => setSelectedPlayer(selectedPlayer === p.id ? null : p.id)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: selectedPlayer === p.id ? config.colors.secondary : config.colors.primary,
                      border: `2px solid ${selectedPlayer === p.id ? config.colors.secondary : config.colors.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', fontWeight: 900, color: selectedPlayer === p.id ? config.colors.bg : '#fff',
                      transition: 'all 0.2s', transform: selectedPlayer === p.id ? 'scale(1.15)' : 'scale(1)',
                      fontFamily: 'var(--font-display)'
                    }}>{p.num}</div>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#fff', textAlign: 'center', maxWidth: '52px', lineHeight: 1.2, textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                      {p.name.split(' ').pop()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Midfielders */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                {config.squad.filter(p => p.posKey === 'mid').map(p => (
                  <div key={p.id} onClick={() => setSelectedPlayer(selectedPlayer === p.id ? null : p.id)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: selectedPlayer === p.id ? config.colors.secondary : config.colors.primary,
                      border: `2px solid ${selectedPlayer === p.id ? config.colors.secondary : config.colors.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', fontWeight: 900, color: selectedPlayer === p.id ? config.colors.bg : '#fff',
                      transition: 'all 0.2s', transform: selectedPlayer === p.id ? 'scale(1.15)' : 'scale(1)',
                      fontFamily: 'var(--font-display)'
                    }}>{p.num}</div>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#fff', textAlign: 'center', maxWidth: '52px', lineHeight: 1.2, textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                      {p.name.split(' ').pop()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Defenders */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {config.squad.filter(p => p.posKey === 'def').map(p => (
                  <div key={p.id} onClick={() => setSelectedPlayer(selectedPlayer === p.id ? null : p.id)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: selectedPlayer === p.id ? config.colors.secondary : config.colors.primary,
                      border: `2px solid ${selectedPlayer === p.id ? config.colors.secondary : config.colors.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', fontWeight: 900, color: selectedPlayer === p.id ? config.colors.bg : '#fff',
                      transition: 'all 0.2s', transform: selectedPlayer === p.id ? 'scale(1.15)' : 'scale(1)',
                      fontFamily: 'var(--font-display)'
                    }}>{p.num}</div>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#fff', textAlign: 'center', maxWidth: '52px', lineHeight: 1.2, textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                      {p.name.split(' ').pop()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Goalkeeper */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {config.squad.filter(p => p.posKey === 'gk').map(p => (
                  <div key={p.id} onClick={() => setSelectedPlayer(selectedPlayer === p.id ? null : p.id)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: selectedPlayer === p.id ? config.colors.secondary : '#1a3a0a',
                      border: `2px solid ${selectedPlayer === p.id ? config.colors.secondary : '#2a6a1a'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', fontWeight: 900, color: '#fff',
                      transition: 'all 0.2s', transform: selectedPlayer === p.id ? 'scale(1.15)' : 'scale(1)',
                      fontFamily: 'var(--font-display)'
                    }}>{p.num}</div>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#fff', textAlign: 'center', maxWidth: '52px', lineHeight: 1.2, textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                      {p.name.split(' ').pop()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Player detail card */}
        {selectedPlayer && (() => {
          const p = config.squad.find(x => x.id === selectedPlayer);
          if (!p) return null;
          return (
            <div className="glass-card-accent" style={{ padding: '16px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
                  background: p.posKey === 'gk' ? '#1a3a0a' : config.colors.primary,
                  border: `2px solid ${p.posKey === 'gk' ? '#2a6a1a' : config.colors.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: 900, color: '#fff',
                }}>{p.num}</div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1, fontFamily: 'var(--font-display)' }}>{p.name}</div>
                  <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: config.colors.muted, marginTop: '3px', fontFamily: 'var(--font-display)' }}>{p.pos}</div>
                  <div style={{ fontSize: '13px', color: config.colors.muted, marginTop: '6px' }}>⚽ {p.club}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                {[
                  { v: p.caps, l: config.lang === 'pt' ? 'Seleções' : config.lang === 'es' ? 'Selecciones' : 'Sélections' },
                  { v: p.goals, l: config.lang === 'pt' ? 'Gols' : config.lang === 'es' ? 'Goles' : 'Buts' },
                  { v: p.age, l: config.lang === 'pt' ? 'Idade' : config.lang === 'es' ? 'Edad' : 'Âge' },
                ].map(({ v, l }) => (
                  <div key={l} style={{ background: config.colors.bg, border: `1px solid ${config.colors.border}`, borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 900, color: config.colors.primary, lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: config.colors.muted, marginTop: '2px', fontFamily: 'var(--font-display)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* List view */}
        {squadView === 'list' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(['gk','def','mid','att'] as const).map(posKey => {
              const group = config.squad.filter(p => p.posKey === posKey);
              const labels = { gk: { fr:'Gardiens', en:'Goalkeepers', es:'Porteros', pt:'Goleiros' }, def: { fr:'Défenseurs', en:'Defenders', es:'Defensas', pt:'Defensores' }, mid: { fr:'Milieux', en:'Midfielders', es:'Centrocampistas', pt:'Meio-campistas' }, att: { fr:'Attaquants', en:'Forwards', es:'Delanteros', pt:'Atacantes' } };
              return (
                <div key={posKey}>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: config.colors.muted, margin: '12px 0 6px', fontFamily: 'var(--font-mono)' }}>
                    {labels[posKey][config.lang] || labels[posKey]['en']}
                  </div>
                  {group.map(p => (
                    <div key={p.id} onClick={() => setSelectedPlayer(selectedPlayer === p.id ? null : p.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', background: selectedPlayer === p.id ? `${config.colors.primary}20` : config.colors.bgDark, border: `1px solid ${selectedPlayer === p.id ? config.colors.primary : config.colors.border}`, borderRadius: '10px', padding: '10px 14px', cursor: 'pointer', marginBottom: '6px', transition: 'all 0.2s' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 900, color: config.colors.primary, width: '24px', textAlign: 'center' }}>{p.num}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{p.name}</div>
                        <div style={{ fontSize: '11px', color: config.colors.muted, marginTop: '1px' }}>{p.club}</div>
                      </div>
                      <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '4px', background: `${config.colors.primary}30`, color: config.colors.primary }}>{posKey.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Hymne */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: config.colors.muted, marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
          {txt('anthem')}
        </div>
        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
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
