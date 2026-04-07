import { Product, BlogPost } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'france-pro',
    isPremium: true,
    name: 'Bracelet LED Connecté - Édition France',
    price: 24.99,
    team: 'France',
    image: '/images/led-wristbands-product.png',
    description: 'Contrôle par App & Synchro Sonore. Éclairage Bleu/Blanc/Rouge ultra-puissant.',
    features: ['Synchro Ambiance Stade', 'Silicone Premium Soft-Touch', 'QR Code Intégré', 'Effet Dégradé Premium'],
    longDescription: 'Vivez chaque match des Bleus intensément. Grâce à sa technologie de détection sonore, votre bracelet scintille au rythme de l\'ambiance du stade. Son design premium avec drapeau estompé et silicone soft-touch en fait l\'accessoire ultime du supporter.'
  },
  {
    id: 'brazil-pro',
    name: 'Bracelet LED Connecté - Édition Brésil',
    price: 24.99,
    team: 'Brésil',
    image: '/images/led-wristbands-product.png',
    description: 'Vibrez au rythme de la Samba. Mode réactif au son et couleurs Jaune/Vert.',
    features: ['Réactif aux Cris', 'App Bluetooth incluse', 'Étanche IP65', 'Léger (25g)'],
    longDescription: 'L\'énergie de la Seleção à votre poignet. Ce bracelet réagit instantanément aux chants des supporters et aux percussions. Un indispensable pour transformer votre salon en véritable Copacabana.'
  },
  {
    id: 'argentina-pro',
    name: 'Bracelet LED Connecté - Édition Argentine',
    price: 24.99,
    team: 'Argentine',
    image: '/images/led-wristbands-product.png',
    description: 'Célébrez comme un champion. Éclairage Bleu Céleste réactif au direct.',
    features: ['Mode Pulsation', 'Bluetooth 5.0', 'Finition Premium', 'Batterie remplaçable'],
    longDescription: 'Portez les couleurs de l\'Albiceleste. Synchronisez votre bracelet avec l\'ambiance du match via l\'application mobile. Chaque moment fort devient une explosion de lumière bleu et blanc.'
  },
  {
    id: 'portugal-pro',
    name: 'Bracelet LED Connecté - Édition Portugal',
    price: 24.99,
    team: 'Portugal',
    image: '/images/led-wristbands-product.png',
    description: 'L\'énergie de la Seleção à votre poignet. Mode réactif au son.',
    features: ['Mode Synchro Sonore', 'App Bluetooth', 'Étanche IP65', 'Léger'],
    longDescription: 'Vibrez avec le Portugal. Ce bracelet s\'illumine aux couleurs de la Seleção à chaque action décisive.'
  },
  {
    id: 'usa-pro',
    name: 'Bracelet LED Connecté - Édition USA',
    price: 24.99,
    team: 'USA',
    image: '/images/led-wristbands-product.png',
    description: 'Stars & Stripes edition. Parfait pour les fans de Team USA.',
    features: ['Mode Pulsation', 'Bluetooth 5.0', 'Finition Premium', 'Batterie remplaçable'],
    longDescription: 'Supportez les USA avec style. Synchronisation parfaite avec l\'ambiance des stades américains.'
  },
  {
    id: 'mexico-pro',
    name: 'Bracelet LED Connecté - Édition Mexique',
    price: 24.99,
    team: 'Mexique',
    image: '/images/led-wristbands-product.png',
    description: 'Vibrez avec El Tri. Éclairage Vert/Blanc/Rouge.',
    features: ['Mode Synchro Sonore', 'App Bluetooth', 'Étanche IP65', 'Léger'],
    longDescription: 'Le bracelet indispensable pour tous les fans du Mexique lors de cette Coupe du Monde à domicile.'
  },
  {
    id: 'canada-pro',
    name: 'Bracelet LED Connecté - Édition Canada',
    price: 24.99,
    team: 'Canada',
    image: '/images/led-wristbands-product.png',
    description: 'Supportez les Canucks. Éclairage Rouge & Blanc.',
    features: ['Mode Synchro Sonore', 'App Bluetooth', 'Étanche IP65', 'Léger'],
    longDescription: 'Célébrez chaque but du Canada avec une explosion de lumière rouge et blanche.'
  },
  {
    id: 'host-edition',
    name: 'Bracelet LED - Édition Hôte (USA/MEX/CAN)',
    price: 24.99,
    team: 'Pack',
    image: '/images/led-wristbands-product.png',
    description: 'L\'édition collector multicolore. Compatible avec tous les matchs.',
    features: ['Toutes Couleurs', 'Synchro Musique', 'Mode Fête', 'Taille Unique'],
    longDescription: 'Le bracelet universel pour la Coupe du Monde 2026. Changez de couleur selon le match que vous regardez. Son capteur sonore haute précision garantit une immersion totale pendant 90 minutes.'
  },
  {
    id: 'supporter-pack',
    name: 'Pack Supporter Ultime (2 Bracelets)',
    price: 44.99,
    team: 'Pack',
    image: '/images/led-wristbands-product.png',
    description: 'Pack Duo pour vibrer ensemble. Économisez 5€ sur votre commande.',
    features: ['2 Bracelets', 'Synchro Groupée', 'App Gratuite', 'Livraison Suivie'],
    longDescription: 'Le football est plus beau quand on le partage. Ce pack contient deux bracelets connectés. Synchronisez-les sur le même téléphone pour que vos deux poignets s\'illuminent en même temps lors des buts !'
  },
  {
    id: 'family-pack-pro',
    name: 'Pack Famille (4 Bracelets LED)',
    price: 79.99,
    team: 'Pack',
    image: '/images/led-wristbands-product.png',
    description: 'Transformez votre salon en stade. Le meilleur rapport qualité/prix.',
    features: ['4 Bracelets', 'Contrôle Centralisé', 'Mode Enfant', 'Piles Incluses'],
    longDescription: 'Le pack idéal pour les familles de fans. Un seul téléphone peut contrôler les 4 bracelets. Créez une ambiance de stade incroyable chez vous et vivez la Coupe du Monde comme si vous y étiez.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 5 des goodies indispensables pour la Coupe du Monde 2026',
    excerpt: 'Découvrez pourquoi les bracelets LED sont la tendance n°1 cette année.',
    date: '15 Mars 2026',
    image: '/images/led-wristbands-product.png',
    slug: 'top-goodies-2026',
    category: 'Guide',
    readTime: '4 min',
    author: 'Équipe GlowWorld',
    content: `
      La Coupe du Monde 2026 approche à grands pas et l'excitation monte chez les supporters du monde entier. Pour vivre cet événement historique aux États-Unis, au Mexique et au Canada, certains accessoires sont devenus incontournables. En tête de liste, on retrouve le bracelet LED connecté, une véritable révolution technologique qui transforme l'expérience du fan.

      Contrairement aux simples drapeaux ou maillots, ces bracelets intelligents offrent une interactivité inédite. Grâce à une synchronisation Bluetooth de pointe, ils s'illuminent aux couleurs de votre équipe favorite lors des moments clés du match. Imaginez votre salon s'illuminer en bleu, blanc et rouge lors d'un but décisif de l'équipe de France !

      Outre les bracelets, les projecteurs d'ambiance et les enceintes connectées complètent le kit du parfait supporter moderne. GlowWorld se positionne comme le leader de cette nouvelle ère de "fan-tech", alliant passion du football et innovation numérique pour une immersion totale à chaque coup de sifflet.
    `
  },
  {
    id: '2',
    title: 'Comment synchroniser votre bracelet LED avec les matchs des Bleus',
    excerpt: 'Guide complet pour ne rater aucune célébration lumineuse.',
    date: '20 Mars 2026',
    image: '/images/led-wristbands-product.png',
    slug: 'sync-led-matchs-bleus',
    category: 'Tutoriel',
    readTime: '3 min',
    author: 'Équipe GlowWorld',
    content: `
      Synchroniser votre bracelet LED GlowWorld avec les matchs en direct est un jeu d'enfant. La première étape consiste à télécharger l'application officielle via le QR code situé au dos de votre bracelet. Une fois installée, activez le Bluetooth de votre smartphone et jumelez votre appareil en quelques secondes.

      Dans l'application, sélectionnez l'onglet "Live Match" et choisissez l'équipe de France. Notre technologie exclusive analyse le flux audio et les données en temps réel du match pour déclencher des effets lumineux spectaculaires. Que ce soit pour l'hymne national ou une célébration de but, votre bracelet réagira instantanément.

      Pour une expérience optimale, assurez-vous que votre bracelet est bien chargé avant le coup d'envoi. Vous pouvez également personnaliser l'intensité lumineuse et les motifs de clignotement directement depuis l'interface. Préparez-vous à briller autant que les étoiles sur le maillot des Bleus !
    `
  },
  {
    id: '3',
    title: 'Bracelet Connecté Coupe du Monde 2026 : Le Guide d\'Achat Ultime',
    excerpt: 'Tout ce que vous devez savoir avant de choisir votre équipement de supporter.',
    date: '25 Mars 2026',
    image: '/images/led-wristbands-product.png',
    slug: 'bracelet-connecte-coupe-du-monde-2026',
    category: 'Guide d\'achat',
    readTime: '6 min',
    author: 'Équipe GlowWorld',
    content: `
      L'achat d'un bracelet LED pour la Coupe du Monde 2026 ne doit pas se faire au hasard. Avec l'explosion de la "fan-tech", il est crucial de choisir un produit fiable, durable et surtout performant en termes de synchronisation. Ce guide vous aide à naviguer parmi les options disponibles pour trouver le bracelet qui vous fera vibrer.

      Le critère numéro un est la connectivité. Recherchez des modèles utilisant le Bluetooth 5.0 ou supérieur pour garantir une latence minimale. Un bracelet qui s'allume trois secondes après le but perd tout son intérêt. Chez GlowWorld, nous utilisons une puce de dernière génération pour une réactivité quasi instantanée, synchronisée avec le signal TV ou streaming.

      Enfin, ne négligez pas le confort et l'autonomie. Un match peut durer plus de 90 minutes, sans compter les prolongations. Nos bracelets sont conçus en silicone médical hypoallergénique et disposent d'une batterie longue durée capable de tenir tout au long du tournoi. Faites le choix de la qualité pour une Coupe du Monde inoubliable.
    `
  },
  {
    id: '4',
    title: 'Comment vivre la Coupe du Monde 2026 en immersion totale à la maison',
    excerpt: 'Transformez votre salon en véritable stade avec nos astuces technologiques.',
    date: '28 Mars 2026',
    image: '/images/led-wristbands-product.png',
    slug: 'comment-vivre-coupe-du-monde-maison',
    category: 'Lifestyle',
    readTime: '5 min',
    author: 'Équipe GlowWorld',
    content: `
      Vivre la Coupe du Monde 2026 depuis son canapé peut être tout aussi intense qu'au stade si l'on dispose du bon équipement. L'immersion commence par le visuel, mais elle se prolonge par l'ambiance lumineuse et sonore. Voici comment créer une "Fan Zone" privée exceptionnelle pour vous et vos proches.

      L'élément central de cette immersion est la synchronisation lumineuse. En utilisant plusieurs bracelets LED GlowWorld connectés au même smartphone, vous pouvez coordonner l'éclairage de toute la pièce. Lorsque le stade vibre, votre salon vibre à l'unisson. C'est cette dimension collective qui recrée l'émotion unique du direct.

      N'oubliez pas l'aspect social : invitez vos amis, préparez des collations thématiques et utilisez notre application pour partager vos réactions lumineuses sur les réseaux sociaux. La technologie LED n'est pas qu'un gadget, c'est un vecteur d'émotion qui relie les supporters par-delà les distances.
    `
  },
  {
    id: '5',
    title: 'La technologie LED au service des supporters de football',
    excerpt: 'Plongée technique dans le fonctionnement de nos bracelets intelligents.',
    date: '01 Avril 2026',
    image: '/images/led-wristbands-product.png',
    slug: 'technologie-led-supporter-football',
    category: 'Technologie',
    readTime: '7 min',
    author: 'Équipe GlowWorld',
    content: `
      Derrière chaque scintillement de nos bracelets LED se cache une ingénierie complexe dédiée à la passion du football. La technologie GlowWorld repose sur un algorithme de traitement du signal capable d'identifier les fréquences sonores spécifiques aux ambiances de stade, comme les chants de supporters ou les coups de sifflet.

      Le cœur du système est un microcontrôleur basse consommation associé à des LED RGB haute intensité. Ces composants permettent de générer des millions de couleurs avec une précision chromatique exceptionnelle, fidèle aux drapeaux nationaux. La gestion de l'énergie est optimisée pour offrir des centaines d'heures d'utilisation sans surchauffe.

      La sécurité des données est également une priorité. Notre application utilise un protocole de communication chiffré pour garantir que votre expérience reste privée et sécurisée. En combinant hardware robuste et software intelligent, nous redéfinissons ce que signifie être un supporter au 21ème siècle.
    `
  }
];
