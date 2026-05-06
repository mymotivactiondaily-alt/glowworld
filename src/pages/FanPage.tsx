import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Zap, ArrowLeft, Play, Users, Trophy, Target } from 'lucide-react';
import { COUNTRY_CONFIGS } from '../config/fanConfig';
import { MascotChat } from '../components/fan/MascotChat';
import { CelebrationOverlay } from '../components/fan/CelebrationOverlay';

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY || '';
const API_BASE = 'https://api.football-data.org/v4';

const FlagCircle = ({ country }: { country?: string }) => {
  const c = country?.toLowerCase();
  
  const renderFlag = () => {
    switch (c) {
      case 'france':
        return (
          <>
            <rect width="24" height="72" fill="#002395" />
            <rect x="24" width="24" height="72" fill="#FFFFFF" />
            <rect x="48" width="24" height="72" fill="#ED2939" />
          </>
        );
      case 'usa':
        return (
          <>
            <rect width="72" height="72" fill="#FFFFFF" />
            {[...Array(13)].map((_, i) => (
              <rect key={i} y={i * (72 / 13)} width="72" height={72 / 13} fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"} />
            ))}
            <rect width="32" height="38" fill="#3C3B6E" />
            {[...Array(5)].map((_, r) => 
              [...Array(6)].map((_, col) => (
                <circle key={`${r}-${col}`} cx={3 + col * 5} cy={4 + r * 7} r="1" fill="#FFFFFF" />
              ))
            )}
          </>
        );
      case 'brazil':
        return (
          <g fill="#009C3B">
            <rect width="72" height="72" />
            <path d="M36 8 L64 36 L36 64 L8 36 Z" fill="#FFDF00" />
            <circle cx="36" cy="36" r="14" fill="#002776" />
            <path d="M22 36 Q36 32 50 36" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        );
      case 'argentina':
        return (
          <>
            <rect width="72" height="24" fill="#74ACDF" />
            <rect y="24" width="72" height="24" fill="#FFFFFF" />
            <rect y="48" width="72" height="24" fill="#74ACDF" />
            <circle cx="36" cy="36" r="5" fill="#F6B40E" />
          </>
        );
      case 'mexico':
        return (
          <>
            <rect width="24" height="72" fill="#006847" />
            <rect x="24" width="24" height="72" fill="#FFFFFF" />
            <rect x="48" width="24" height="72" fill="#CE1126" />
            <circle cx="36" cy="36" r="4" fill="#7B3F00" />
          </>
        );
      case 'canada':
        return (
          <>
            <rect width="18" height="72" fill="#FF0000" />
            <rect x="18" width="36" height="72" fill="#FFFFFF" />
            <rect x="54" width="18" height="72" fill="#FF0000" />
            <path d="M36 24 L39 34 L49 34 L41 40 L44 50 L36 44 L28 50 L31 40 L23 34 L33 34 Z" fill="#FF0000" />
          </>
        );
      case 'portugal':
        return (
          <>
            <rect width="28" height="72" fill="#006600" />
            <rect x="28" width="44" height="72" fill="#FF0000" />
            <circle cx="28" cy="36" r="10" fill="#FFD700" />
            <rect x="25" y="33" width="6" height="6" fill="#0000FF" opacity="0.5" />
          </>
        );
      case 'spain':
        return (
          <>
            <rect width="72" height="18" fill="#AA151B" />
            <rect y="18" width="72" height="36" fill="#F1BF00" />
            <rect y="54" width="72" height="18" fill="#AA151B" />
            <rect x="15" y="24" width="8" height="12" fill="#AA151B" opacity="0.6" />
          </>
        );
      default:
        return <rect width="72" height="72" fill="#333" />;
    }
  };

  return (
    <div className="flag-pulse" style={{ width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', border: '2px solid rgba(255,255,255,0.1)' }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        {renderFlag()}
      </svg>
    </div>
  );
};

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
    exclusiveAccessTitle: { fr: 'ACCÈS EXCLUSIF', en: 'EXCLUSIVE ACCESS', es: 'ACCESO EXCLUSIVO', pt: 'ACESSO EXCLUSIVO' },
    exclusiveAccessDesc: { 
      fr: "Cet espace est réservé aux acheteurs du bracelet GlowWorld 2026. Entrez l'email utilisé lors de votre commande.", 
      en: "This space is reserved for GlowWorld 2026 bracelet buyers. Enter the email used during your order.", 
      es: "Este espacio es reservado para compradores de la pulsera GlowWorld 2026. Ingresa el email de tu pedido.", 
      pt: "Este espaço é reservado para compradores da pulseira GlowWorld 2026. Insira o email do seu pedido." 
    },
    emailPlaceholder: { fr: 'votre@email.com', en: 'your@email.com', es: 'tu@email.com', pt: 'seu@email.com' },
    accessButton: { fr: 'Accéder à ma Fan Zone', en: 'Access my Fan Zone', es: 'Acceder a mi Fan Zone', pt: 'Acessar minha Fan Zone' },
    checkingButton: { fr: 'Vérification...', en: 'Checking...', es: 'Verificando...', pt: 'Verificando...' },
    noBraceletLabel: { fr: 'Pas encore de bracelet ?', en: "Don't have a bracelet yet?", es: '¿Aún sin pulsera?', pt: 'Ainda sem pulseira?' },
    orderHereLink: { fr: 'Commander ici', en: 'Order here', es: 'Pedir aquí', pt: 'Compre aqui' },
    emailSentTitle: { fr: 'Email envoyé !', en: 'Email sent!', es: '¡Email enviado!', pt: 'Email enviado!' },
    emailSentDesc: { 
      fr: "Vérifiez votre boîte mail. Cliquez sur le lien pour accéder à votre Fan Zone.", 
      en: "Check your inbox. Click the link to access your Fan Zone.", 
      es: "Revisa tu correo. Haz clic en el enlace para acceder a tu Fan Zone.", 
      pt: "Verifique sua caixa de entrada. Clique no link para acessar sua Fan Zone." 
    },
    errorNoOrder: { fr: 'Aucune commande trouvée avec cet email.', en: 'No order found with this email.', es: 'No se encontró ningún pedido con este email.', pt: 'Nenhum pedido encontrado com este email.' },
    errorNoOrderForCountry: { 
      fr: "Vous n'avez pas commandé le bracelet de ce pays.", 
      en: "You haven't ordered this country's bracelet.", 
      es: "No has pedido la pulsera de este país.", 
      pt: "Você não pediu a pulseira deste país." 
    },
    errorGeneric: { fr: 'Une erreur est survenue. Réessayez.', en: 'An error occurred. Please try again.', es: 'Ocurrió un error. Inténtalo de nuevo.', pt: 'Ocorreu um erro. Tente novamente.' },
    formation: { fr: 'Formation', en: 'Formation', es: 'Formación', pt: 'Formação' },
    pitch: { fr: 'Terrain', en: 'Pitch', es: 'Campo', pt: 'Campo' },
    list: { fr: 'Liste', en: 'List', es: 'Lista', pt: 'Lista' },
    venueTitle: { fr: 'Stade du prochain match', en: 'Next match stadium', es: 'Estadio del próximo partido', pt: 'Estádio do próximo jogo' },
    venueTbc: { fr: 'Stade à confirmer', en: 'Venue to be confirmed', es: 'Estadio por confirmar', pt: 'Estádio a confirmar' },
    venueDesc: { fr: "Le stade sera confirmé avec le calendrier officiel de la Coupe du Monde 2026.", en: "The stadium will be confirmed with the official 2026 World Cup schedule.", es: "El estadio se confirmará con el calendario oficial de la Copa del Mundo 2026.", pt: "O estádio será confirmado com o calendário oficial da Copa do Mundo 2026." },
    caps: { fr: 'Sélections', en: 'Caps', es: 'Selecciones', pt: 'Seleções' },
    goals: { fr: 'Buts', en: 'Goals', es: 'Goles', pt: 'Gols' },
    age: { fr: 'Âge', en: 'Age', es: 'Edad', pt: 'Idade' }
  };

  const txt = (key: keyof typeof t) => t[key][lang] || t[key]['en'];

  const [nextMatch, setNextMatch] = useState<any>(null);
  const [standings, setStandings] = useState<any[]>([]);
  const [liveMatch, setLiveMatch] = useState<any>(null);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const [accessState, setAccessState] = useState<'checking' | 'gate' | 'granted'>('checking');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [squadView, setSquadView] = useState<'pitch' | 'list'>('pitch');
  const [wonLastMatch, setWonLastMatch] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);

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

  useEffect(() => {
    const token = searchParams.get('token');
    const savedToken = localStorage.getItem(`fan_token_${country}`);
    const tokenToCheck = token || savedToken;

    if (!tokenToCheck) {
      setAccessState('gate');
      return;
    }

    fetch(`/api/fan/verify-token?token=${tokenToCheck}`)
      .then(r => r.json())
      .then(data => {
        if (data.valid) {
          localStorage.setItem(`fan_token_${country}`, tokenToCheck);
          if (data.email) setEmail(data.email);
          setAccessState('granted');
        } else {
          localStorage.removeItem(`fan_token_${country}`);
          setAccessState('gate');
        }
      })
      .catch(() => setAccessState('gate'));
  }, [country]);

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'fanpage-styles';
    if (!document.getElementById('fanpage-styles')) {
      style.textContent = `
        .fp-player-group { cursor: pointer; }
        .fp-player-group:hover ellipse { filter: brightness(1.2); }
        .fp-player-detail { animation: fpFadeIn 0.22s ease; }
        @keyframes fpFadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fp-squad-item:hover { border-color: var(--fp-primary) !important; }
        @keyframes fpPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
        .flag-pulse {
          animation: fpPulse 2.5s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
    return () => { const s = document.getElementById('fanpage-styles'); if(s) s.remove(); };
  }, []);

  useEffect(() => {
    if (!API_KEY || !config?.teamId) return;

    const fetchLastMatch = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/teams/${config.teamId}/matches?status=FINISHED&limit=5`,
          { headers: { 'X-Auth-Token': API_KEY } }
        );
        if (!res.ok) return;
        const data = await res.json();
        const matches = data.matches || [];
        if (matches.length === 0) return;

        // Prend le dernier match terminé
        const last = matches[matches.length - 1];
        const homeScore = last.score?.fullTime?.home ?? 0;
        const awayScore = last.score?.fullTime?.away ?? 0;
        const isHome = last.homeTeam?.id === config.teamId;
        const teamScore = isHome ? homeScore : awayScore;
        const opponentScore = isHome ? awayScore : homeScore;

        if (teamScore > opponentScore) {
          setWonLastMatch(true);
        }
      } catch {
        // Fail silently — pas de célébration si API indisponible
      }
    };

    fetchLastMatch();
  }, [config?.teamId, API_KEY]);

  useEffect(() => {
    if (!wonLastMatch) return;
    const t = setTimeout(() => {
      setCelebrationActive(true);
      setTimeout(() => setCelebrationActive(false), 100);
    }, 1800);
    return () => clearTimeout(t);
  }, [wonLastMatch]);

  const handleRequestAccess = async () => {
    if (!email || !email.includes('@')) {
      setEmailError('Entrez un email valide');
      return;
    }
    setIsSubmitting(true);
    setEmailError('');
    try {
      const res = await fetch('/api/fan/request-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          country
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailSent(true);
      } else {
        if (data.error === 'no_order') {
          setEmailError(txt('errorNoOrder'));
        } else if (data.error === 'no_order_for_country') {
          setEmailError(txt('errorNoOrderForCountry'));
        } else {
          setEmailError(txt('errorGeneric'));
        }
      }
    } catch {
      setEmailError(txt('errorGeneric'));
    }
    setIsSubmitting(false);
  };

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

  const tokenFromUrl = searchParams.get('token') || '';
  const stableFanToken = useMemo(() => {
    return tokenFromUrl || localStorage.getItem(`fan_token_${country}`) || '';
  }, [country, tokenFromUrl]);

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

  if (accessState === 'checking') {
    return (
      <div style={{ minHeight: '100vh', background: config?.colors?.bg || '#05080F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#fff', fontSize: '16px' }}>{txt('checkingButton')}</div>
      </div>
    );
  }

  if (accessState === 'gate') {
    return (
      <div style={{ minHeight: '100vh', background: config?.colors?.bg || '#05080F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ maxWidth: '400px', width: '100%', background: config?.colors?.bgDark || '#0A0F1E', border: `1px solid ${config?.colors?.primary || '#002395'}`, borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <FlagCircle country={country} />
          <h2 style={{ color: '#fff', fontSize: '22px', fontFamily: 'Bebas Neue', letterSpacing: '2px', marginBottom: '8px' }}>
            {txt('exclusiveAccessTitle')}
          </h2>
          <p style={{ color: config?.colors?.muted || '#6B7DB3', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
            {txt('exclusiveAccessDesc')}
          </p>

          {!emailSent ? (
            <>
              <input
                type="email"
                placeholder={txt('emailPlaceholder')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRequestAccess()}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${config?.colors?.border || '#1a2040'}`, background: config?.colors?.bg || '#05080F', color: '#fff', fontSize: '15px', marginBottom: '12px', boxSizing: 'border-box' }}
              />
              {emailError && (
                <p style={{ color: '#ED2939', fontSize: '13px', marginBottom: '12px' }}>{emailError}</p>
              )}
              <button
                onClick={handleRequestAccess}
                disabled={isSubmitting}
                style={{ width: '100%', padding: '14px', borderRadius: '8px', background: config?.colors?.primary || '#002395', color: '#fff', fontSize: '15px', fontWeight: 700, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? txt('checkingButton') : txt('accessButton')}
              </button>
              <p style={{ marginTop: '20px', fontSize: '12px', color: config?.colors?.muted || '#6B7DB3' }}>
                {txt('noBraceletLabel')}{' '}
                <a href="/catalog" style={{ color: config?.colors?.primary || '#002395', fontWeight: 600 }}>{txt('orderHereLink')}</a>
              </p>
            </>
          ) : (
            <div style={{ background: `${config?.colors?.primary || '#002395'}20`, border: `1px solid ${config?.colors?.primary || '#002395'}`, borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📧</div>
              <p style={{ color: '#fff', fontWeight: 700, marginBottom: '8px' }}>{txt('emailSentTitle')}</p>
              <p style={{ color: config?.colors?.muted || '#6B7DB3', fontSize: '13px', lineHeight: 1.6 }}>
                {txt('emailSentDesc')}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: config.colors.bg, minHeight: '100vh', color: '#fff' }}
         className={celebrationActive ? 'celeb-shake' : ''}>
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

      {/* Squad Section */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: config.colors.muted, marginBottom: '12px' }}>
          {txt('formation')} — 4-3-3
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
              {v === 'pitch' ? txt('pitch') : txt('list')}
            </button>
          ))}
        </div>

        {squadView === 'pitch' && (
          <div style={{ background: '#0a180a', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
            <svg viewBox="0 0 380 310" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
              <defs>
                <linearGradient id={`pg_${config.code}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0c1e0c"/>
                  <stop offset="100%" stopColor="#07100a"/>
                </linearGradient>
                <linearGradient id={`ll_${config.code}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fffde0" stopOpacity="0.10"/>
                  <stop offset="100%" stopColor="#fffde0" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id={`lr_${config.code}`} x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fffde0" stopOpacity="0.10"/>
                  <stop offset="100%" stopColor="#fffde0" stopOpacity="0"/>
                </linearGradient>
                <radialGradient id={`h3d_${config.code}`} cx="38%" cy="32%" r="60%">
                  <stop offset="0%" stopColor={config.colors.primary} stopOpacity="0.5"/>
                  <stop offset="100%" stopColor={config.colors.primary} stopOpacity="1"/>
                </radialGradient>
                <linearGradient id={`b3d_${config.code}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={config.colors.primary} stopOpacity="0.6"/>
                  <stop offset="50%" stopColor={config.colors.primary}/>
                  <stop offset="100%" stopColor={config.colors.primary} stopOpacity="0.4"/>
                </linearGradient>
                <filter id={`sh_${config.code}`} x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.6"/>
                </filter>
              </defs>

              {/* Pitch */}
              <rect width="380" height="310" fill={`url(#pg_${config.code})`}/>
              <polygon points="25,300 355,300 315,55 65,55" fill="none" stroke="#1e3e1e" strokeWidth="0.8"/>
              <line x1="30" y1="177" x2="350" y2="177" stroke="#1e3e1e" strokeWidth="0.6"/>
              <ellipse cx="190" cy="177" rx="52" ry="20" fill="none" stroke="#1e3e1e" strokeWidth="0.6"/>
              <circle cx="190" cy="177" r="2.5" fill="#1e3e1e"/>
              <path d="M110,55 L270,55 L270,95 L110,95 Z" fill="none" stroke="#1e3e1e" strokeWidth="0.5"/>
              <path d="M140,55 L240,55 L240,75 L140,75 Z" fill="none" stroke="#1e3e1e" strokeWidth="0.4"/>
              <path d="M90,300 L290,300 L290,260 L90,260 Z" fill="none" stroke="#1e3e1e" strokeWidth="0.5"/>
              <path d="M125,300 L255,300 L255,280 L125,280 Z" fill="none" stroke="#1e3e1e" strokeWidth="0.4"/>
              <polygon points="0,0 90,0 140,310 0,310" fill={`url(#ll_${config.code})`}/>
              <polygon points="380,0 290,0 240,310 380,310" fill={`url(#lr_${config.code})`}/>

              {/* Players — helper to render one player */}
              {config.squad.map((p, idx) => {
                const positions: Record<string, {cx:number,cy:number}[]> = {
                  att: [{cx:105,cy:82},{cx:190,cy:74},{cx:275,cy:82}],
                  mid: [{cx:118,cy:152},{cx:190,cy:145},{cx:262,cy:152}],
                  def: [{cx:72,cy:212},{cx:140,cy:217},{cx:240,cy:217},{cx:308,cy:212}],
                  gk:  [{cx:190,cy:272}],
                };
                const posArr = positions[p.posKey] || [];
                const samePos = config.squad.filter(x => x.posKey === p.posKey);
                const posIdx = samePos.findIndex(x => x.id === p.id);
                const pos = posArr[posIdx] || {cx:190,cy:180};
                const isGk = p.posKey === 'gk';
                const isSel = selectedPlayer === p.id;
                const pColor = isGk ? '#1a5a0a' : config.colors.primary;
                const pLight = isGk ? '#5aba5a' : '#8ab4ff';

                return (
                  <g key={p.id} className="fp-player-group"
                    onClick={() => setSelectedPlayer(selectedPlayer === p.id ? null : p.id)}
                    filter={`url(#sh_${config.code})`}
                    transform={`translate(${pos.cx},${pos.cy})`}>
                    {/* Glow ring when selected */}
                    {isSel && <ellipse cx="0" cy="4" rx="18" ry="18" fill={pColor} opacity="0.25"/>}
                    {/* Body trapeze 3D */}
                    <path d={`M-9,8 L9,8 L11,26 L-11,26 Z`}
                      fill={pColor}
                      stroke={isSel ? pLight : 'none'}
                      strokeWidth={isSel ? 1.2 : 0}
                    />
                    {/* Left highlight — 3D volume */}
                    <path d="M-9,8 L-6,8 L-8,26 L-11,26 Z" fill="#fff" opacity="0.12"/>
                    {/* Head 3D */}
                    <circle cx="0" cy="2" r="9" fill={pColor}
                      stroke={isSel ? pLight : 'none'}
                      strokeWidth={isSel ? 1.2 : 0}
                    />
                    {/* Head shine */}
                    <circle cx="-3" cy="-2" r="3.5" fill="#fff" opacity="0.15"/>
                    {/* Number */}
                    <text x="0" y="20" fill="#fff" fontSize="8" fontWeight="700"
                      textAnchor="middle" fontFamily="Inter,sans-serif" opacity="0.95">{p.num}</text>
                    {/* Name label */}
                    <text x="0" y="37" fill="#fff" fontSize="7.5" fontWeight="700"
                      textAnchor="middle" fontFamily="Inter,sans-serif" opacity="0.85"
                      style={{textTransform:'uppercase',letterSpacing:'0.5px'}}>
                      {p.name.split(' ').pop()}
                    </text>
                  </g>
                );
              })}

              {/* Row labels */}
              <text x="10" y="85" fill="#ffffff" fontSize="8" fontWeight="700" opacity="0.2" fontFamily="Inter,sans-serif">ATT</text>
              <text x="10" y="155" fill="#ffffff" fontSize="8" fontWeight="700" opacity="0.2" fontFamily="Inter,sans-serif">MIL</text>
              <text x="10" y="215" fill="#ffffff" fontSize="8" fontWeight="700" opacity="0.2" fontFamily="Inter,sans-serif">DEF</text>
              <text x="10" y="275" fill="#ffffff" fontSize="8" fontWeight="700" opacity="0.2" fontFamily="Inter,sans-serif">GK</text>
            </svg>
          </div>
        )}

        {/* Player detail card */}
        {selectedPlayer && (() => {
          const p = config.squad.find(x => x.id === selectedPlayer);
          if (!p) return null;
          return (
            <div className="fp-player-detail" style={{ background: config.colors.bgDark, border: `1px solid ${config.colors.primary}`, borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: config.colors.primary, width: '36px' }}>{p.num}</div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{p.name}</div>
                  <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: config.colors.muted, marginTop: '3px' }}>{p.pos}</div>
                  <div style={{ fontSize: '13px', color: config.colors.muted, marginTop: '5px' }}>⚽ {p.club}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                {[
                  { v: p.caps, l: txt('caps') },
                  { v: p.goals, l: txt('goals') },
                  { v: p.age, l: txt('age') },
                ].map(({ v, l }) => (
                  <div key={l} style={{ background: config.colors.bg, border: `1px solid ${config.colors.border}`, borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', color: config.colors.primary, lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: config.colors.muted, marginTop: '2px' }}>{l}</div>
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
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: config.colors.muted, margin: '12px 0 6px' }}>
                    {labels[posKey][config.lang] || labels[posKey]['en']}
                  </div>
                  {group.map(p => (
                    <div key={p.id} className="fp-squad-item"
                      onClick={() => setSelectedPlayer(selectedPlayer === p.id ? null : p.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', background: selectedPlayer === p.id ? `${config.colors.primary}20` : config.colors.bgDark, border: `1px solid ${selectedPlayer === p.id ? config.colors.primary : config.colors.border}`, borderRadius: '10px', padding: '10px 14px', cursor: 'pointer', marginBottom: '6px', transition: 'all 0.2s' }}>
                      <div style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: 900, color: config.colors.primary, width: '24px', textAlign: 'center' }}>{p.num}</div>
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

      {/* Stade Section */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: config.colors.muted, marginBottom: '12px' }}>
          {txt('venueTitle')}
        </div>
        <div style={{ background: config.colors.bgDark, border: `1px solid ${config.colors.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <svg width="100%" height="80" viewBox="0 0 380 80" style={{ display: 'block', background: '#071407' }}>
            <ellipse cx="190" cy="78" rx="165" ry="38" fill="none" stroke="#2a5a2a" strokeWidth="0.8"/>
            <ellipse cx="190" cy="78" rx="125" ry="28" fill="none" stroke="#1a4a1a" strokeWidth="0.6"/>
            <path d="M25,78 Q80,12 190,4 Q300,12 355,78" fill="none" stroke="#3a6a3a" strokeWidth="1.5"/>
            <path d="M55,78 Q105,25 190,16 Q275,25 325,78" fill="none" stroke="#2a5a2a" strokeWidth="1"/>
            <line x1="18" y1="8" x2="12" y2="78" stroke="#4a7a4a" strokeWidth="2"/>
            <line x1="362" y1="8" x2="368" y2="78" stroke="#4a7a4a" strokeWidth="2"/>
            <line x1="8" y1="8" x2="28" y2="8" stroke="#4a7a4a" strokeWidth="1"/>
            <line x1="352" y1="8" x2="372" y2="8" stroke="#4a7a4a" strokeWidth="1"/>
            <circle cx="18" cy="7" r="3.5" fill="#fffce0" opacity="0.55"/>
            <circle cx="362" cy="7" r="3.5" fill="#fffce0" opacity="0.55"/>
            <ellipse cx="190" cy="78" rx="85" ry="22" fill="#0d2a0d"/>
            <ellipse cx="190" cy="78" rx="85" ry="22" fill="none" stroke="#1a4a1a" strokeWidth="0.5"/>
            <text x="190" y="11" fill="#4a8a4a" fontSize="8" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="2">
              {nextMatch?.venue || txt('venueTbc')}
            </text>
          </svg>
          <div style={{ padding: '14px 16px' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '20px', letterSpacing: '1px', color: '#fff', marginBottom: '6px' }}>
              {nextMatch?.venue || txt('venueTbc')}
            </div>
            <div style={{ fontSize: '12px', color: config.colors.muted, lineHeight: 1.6 }}>
              {txt('venueDesc')}
            </div>
          </div>
        </div>
      </div>

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

  <div style={{ 
    textAlign: 'center', 
    padding: '20px 20px 8px',
  }}>
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 18px',
      background: `${config.colors.bgDark}`,
      border: `1px solid ${config.colors.primary}50`,
      borderRadius: '999px',
      fontSize: '11px',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      boxShadow: `0 0 20px ${config.colors.primary}20`,
    }}>
      <span style={{ fontSize: '14px' }}>✦</span>
      <span>Fan AI Companion</span>
      <span style={{ 
        opacity: 0.5, 
        fontSize: '10px',
        fontWeight: 500,
      }}>
        powered by Claude Haiku 4.5
      </span>
    </div>
  </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '11px', color: config.colors.border, letterSpacing: '1px', textTransform: 'uppercase' }}>
        {txt('footer')}
      </div>

      <CelebrationOverlay active={celebrationActive} />
      <MascotChat 
        countryCode={country?.toLowerCase() || ''}
        email={email}
        fanToken={stableFanToken}
        wonLastMatch={wonLastMatch}
      />
    </div>
  );
};
