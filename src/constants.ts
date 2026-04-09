import { Product, BlogPost } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'france-pro',
    isPremium: true,
    name: 'Bracelet LED Connecté - Édition France',
    price: 24.99,
    team: 'France',
    image: '/images/coming-soon.png',
    isAvailable: true,
    description: 'Contrôle par App & Synchro Sonore. Éclairage Bleu/Blanc/Rouge ultra-puissant.',
    features: ['Synchro Ambiance Stade', 'Silicone Premium Soft-Touch', 'QR Code Intégré', 'Effet Dégradé Premium'],
    longDescription: 'Vivez chaque match des Bleus intensément. Grâce à sa technologie de détection sonore, votre bracelet scintille au rythme de l\'ambiance du stade. Son design premium avec drapeau estompé et silicone soft-touch en fait l\'accessoire ultime du supporter.'
  },
  {
    id: 'brazil-pro',
    name: 'Bracelet LED Connecté - Édition Brésil',
    price: 24.99,
    team: 'Brésil',
    image: '/images/coming-soon.png',
    isAvailable: true,
    description: 'Vibrez au rythme de la Samba. Mode réactif au son et couleurs Jaune/Vert.',
    features: ['Réactif aux Cris', 'App Bluetooth incluse', 'Étanche IP65', 'Léger (25g)'],
    longDescription: 'L\'énergie de la Seleção à votre poignet. Ce bracelet réagit instantanément aux chants des supporters et aux percussions. Un indispensable pour transformer votre salon en véritable Copacabana.'
  },
  {
    id: 'argentina-pro',
    name: 'Bracelet LED Connecté - Édition Argentine',
    price: 24.99,
    team: 'Argentine',
    image: '/images/coming-soon.png',
    isAvailable: true,
    description: 'Célébrez comme un champion. Éclairage Bleu Céleste réactif au direct.',
    features: ['Mode Pulsation', 'Bluetooth 5.0', 'Finition Premium', 'Batterie remplaçable'],
    longDescription: 'Portez les couleurs de l\'Albiceleste. Synchronisez votre bracelet avec l\'ambiance du match via l\'application mobile. Chaque moment fort devient une explosion de lumière bleu et blanc.'
  },
  {
    id: 'portugal-pro',
    name: 'Bracelet LED Connecté - Édition Portugal',
    price: 24.99,
    team: 'Portugal',
    image: '/images/coming-soon.png',
    isAvailable: true,
    description: 'L\'énergie de la Seleção à votre poignet. Mode réactif au son.',
    features: ['Mode Synchro Sonore', 'App Bluetooth', 'Étanche IP65', 'Léger'],
    longDescription: 'Vibrez avec le Portugal. Ce bracelet s\'illumine aux couleurs de la Seleção à chaque action décisive.'
  },
  {
    id: 'usa-pro',
    name: 'Bracelet LED Connecté - Édition USA',
    price: 24.99,
    team: 'USA',
    image: '/images/coming-soon.png',
    isAvailable: true,
    description: 'Stars & Stripes edition. Parfait pour les fans de Team USA.',
    features: ['Mode Pulsation', 'Bluetooth 5.0', 'Finition Premium', 'Batterie remplaçable'],
    longDescription: 'Supportez les USA avec style. Synchronisation parfaite avec l\'ambiance des stades américains.'
  },
  {
    id: 'mexico-pro',
    name: 'Bracelet LED Connecté - Édition Mexique',
    price: 24.99,
    team: 'Mexique',
    image: '/images/coming-soon.png',
    isAvailable: true,
    description: 'Vibrez avec El Tri. Éclairage Vert/Blanc/Rouge.',
    features: ['Mode Synchro Sonore', 'App Bluetooth', 'Étanche IP65', 'Léger'],
    longDescription: 'Le bracelet indispensable pour tous les fans du Mexique lors de cette Coupe du Monde à domicile.'
  },
  {
    id: 'canada-pro',
    name: 'Bracelet LED Connecté - Édition Canada',
    price: 24.99,
    team: 'Canada',
    image: '/images/coming-soon.png',
    isAvailable: true,
    description: 'Supportez les Canucks. Éclairage Rouge & Blanc.',
    features: ['Mode Synchro Sonore', 'App Bluetooth', 'Étanche IP65', 'Léger'],
    longDescription: 'Célébrez chaque but du Canada avec une explosion de lumière rouge et blanche.'
  },
  {
    id: 'host-edition',
    name: 'Bracelet LED - Édition Hôte (USA/MEX/CAN)',
    price: 24.99,
    team: 'Pack',
    image: '/images/coming-soon.png',
    isAvailable: true,
    description: 'L\'édition collector multicolore. Compatible avec tous les matchs.',
    features: ['Toutes Couleurs', 'Synchro Musique', 'Mode Fête', 'Taille Unique'],
    longDescription: 'Le bracelet universel pour la Coupe du Monde 2026. Changez de couleur selon le match que vous regardez. Son capteur sonore haute précision garantit une immersion totale pendant 90 minutes.'
  },
  {
    id: 'supporter-pack',
    name: 'Pack Supporter Ultime (2 Bracelets)',
    price: 44.99,
    team: 'Pack',
    image: '/images/coming-soon.png',
    isAvailable: true,
    description: 'Pack Duo pour vibrer ensemble. Économisez 5€ sur votre commande.',
    features: ['2 Bracelets', 'Contrôle Duo Simultané', 'App Gratuite', 'Portée 5-10m'],
    longDescription: 'Le football est plus beau quand on le partage. Ce pack contient deux bracelets connectés. Contrôlez les deux bracelets simultanément sur le même téléphone pour que vos deux poignets s\'illuminent en même temps au rythme de l\'ambiance !'
  },
  {
    id: 'family-pack-pro',
    name: 'Pack Famille (4 Bracelets LED)',
    price: 79.99,
    team: 'Pack',
    image: '/images/coming-soon.png',
    isAvailable: true,
    description: 'Transformez votre salon en stade. Le meilleur rapport qualité/prix.',
    features: ['4 Bracelets', 'Contrôle Centralisé', 'Rayon 5-10m', 'Piles Incluses'],
    longDescription: 'Le pack idéal pour les familles de fans. Un seul téléphone peut contrôler jusqu\'à 8 bracelets simultaneously. Créez une ambiance de stade incroyable chez vous et vivez la Coupe du Monde comme si vous y étiez.'
  },
  {
    id: 'team-pack-pro',
    name: 'Pack Équipe Ultime (8 Bracelets)',
    price: 149.99,
    team: 'Pack',
    image: '/images/coming-soon.png',
    isAvailable: false,
    description: 'La limite technologique ultime. Équipez tout votre groupe.',
    features: ['8 Bracelets', 'Synchro Totale', 'Capacité Max Bluetooth', 'Livraison Express'],
    longDescription: 'Le summum de l\'expérience GlowWorld. Ce pack utilise la capacité maximale de l\'application pour synchroniser 8 bracelets sur un seul smartphone. Idéal pour les bars ou les grands groupes d\'amis.'
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

      Dans l'application, sélectionnez l'onglet "Mode Stade" et choisissez votre équipe. Notre technologie de détection sonore analyse l'ambiance et les chants en temps réel pour déclencher des effets lumineux spectaculaires. Que ce soit pour l'hymne national ou la ferveur d'une célébration, votre bracelet réagira instantanément à l'émotion du moment.

      Pour une expérience optimale, assurez-vous que votre bracelet est bien chargé avant le coup d'envoi et restez à moins de 10 mètres de votre smartphone. Vous pouvez également personnaliser l'intensité lumineuse et les motifs de clignotement directement depuis l'interface. Préparez-vous à briller autant que les étoiles sur le maillot !
    `
  },
  {
    id: '3',
    title: 'Le meilleur bracelet LED connecté pour la Coupe du Monde 2026 : guide complet',
    excerpt: 'Tout ce qu\'il faut savoir pour choisir son bracelet LED connecté avant la Coupe du Monde 2026. Comparatif, critères de choix et meilleures éditions par équipe.',
    date: '9 Avril 2026',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=800&auto=format&fit=crop',
    slug: 'bracelet-led-connecte-coupe-du-monde-2026',
    readTime: '5 min',
    category: 'Guide d\'achat',
    author: 'Équipe GlowWorld',
    content: `
      <h2>La Coupe du Monde 2026 : l'édition la plus grande de l'histoire</h2>
      <p>La Coupe du Monde 2026 s'annonce comme le plus grand événement sportif de l'histoire. Du 11 juin au 19 juillet 2026, la compétition réunit pour la première fois 48 équipes, organisée conjointement par les États-Unis, le Canada et le Mexique. Pour vivre cette édition historique comme jamais, un accessoire s'impose : le bracelet LED connecté pour supporter son équipe avec style, depuis son salon ou depuis les fan zones.</p>

      <h2>Qu'est-ce qu'un bracelet LED connecté pour la Coupe du Monde ?</h2>
      <p>Un bracelet LED connecté est un bracelet en silicone équipé de LEDs qui s'illuminent aux couleurs de ton équipe favorite. Grâce à la technologie Bluetooth, il se synchronise avec une application smartphone pour réagir en temps réel aux buts, aux hymnes et à l'ambiance du match. Fini de regarder les matchs passivement — avec un bracelet LED, ton salon devient un vrai stade.</p>
      <p>Le bracelet GlowWorld2026 va encore plus loin avec son mode "Sound-Sync" exclusif : les LEDs réagissent automatiquement au bruit ambiant. Quand tu cries lors d'un but, le bracelet s'illumine instantanément. Une immersion totale, sans même toucher ton téléphone.</p>

      <h2>Pourquoi acheter un bracelet LED pour la Coupe du Monde 2026 ?</h2>
      <p>La Coupe du Monde de la FIFA Qatar 2022 a réuni 3,4 millions de spectateurs dans les stades du monde entier. En 2026, ce chiffre sera encore plus grand — mais la majorité des supporters regarderont les matchs depuis chez eux ou dans des fan zones. C'est exactement là que le bracelet LED fait toute la différence.</p>
      <ul>
        <li><strong>À domicile :</strong> Le bracelet transforme chaque match en spectacle immersif. Les couleurs de ton équipe illuminent ta pièce à chaque action décisive.</li>
        <li><strong>En fan zone :</strong> Quand tout le monde porte un bracelet LED synchronisé, l'ambiance devient électrique — exactement comme dans un vrai stade.</li>
        <li><strong>En famille :</strong> Les enfants adorent voir leur bracelet s'allumer lors des buts. C'est une façon ludique et mémorable de vivre la Coupe du Monde.</li>
      </ul>

      <h2>Comment choisir son bracelet LED pour la Coupe du Monde 2026 ?</h2>
      <p>Tous les bracelets LED ne se valent pas. Voici les 5 critères essentiels avant d'acheter :</p>
      <ul>
        <li><strong>Connectivité Bluetooth :</strong> Privilégie un bracelet avec Bluetooth 5.0 minimum. Le bracelet GlowWorld2026 utilise Bluetooth 5.3 pour une latence inférieure à 0,1 seconde.</li>
        <li><strong>Matériau :</strong> Le silicone médical haute densité est le meilleur choix — souple, résistant, hypoallergénique et confortable pour des heures de port.</li>
        <li><strong>Étanchéité :</strong> Certifié IP65 minimum — indispensable pour célébrer sous la pluie ou renverser ta boisson lors d'un but.</li>
        <li><strong>Autonomie :</strong> Vérifie que le bracelet tient au moins 12 heures en utilisation continue, soit 4 à 5 matchs complets.</li>
        <li><strong>Édition par équipe :</strong> Le meilleur bracelet est celui aux couleurs de ton équipe. GlowWorld2026 propose des éditions France, Brésil, Argentine, USA, Mexique, Canada et Portugal.</li>
      </ul>

      <h2>Quel bracelet LED choisir selon ton équipe ?</h2>
      <p><strong>Édition France :</strong> S'illumine en bleu, blanc, rouge avec effet dégradé premium. Parfait pour vibrer avec les Bleus lors de France-Sénégal le 16 juin, France-Bolivie le 22 juin et France-Norvège le 26 juin.</p>
      <p><strong>Édition Brésil :</strong> Réagit aux cris et percussions avec ses couleurs jaune et vert emblématiques. L'énergie de la Seleção à ton poignet.</p>
      <p><strong>Édition Hôte multicolore :</strong> Compatible avec tous les matchs. Change de couleur selon l'équipe que tu supportes — idéal pour les familles aux goûts variés.</p>

      <h2>Questions fréquentes sur les bracelets LED Coupe du Monde 2026</h2>
      <p><strong>Le bracelet fonctionne-t-il sans smartphone ?</strong> Oui, en mode Sound-Sync automatique, il réagit au bruit ambiant sans application. Le smartphone est nécessaire uniquement pour personnaliser les effets.</p>
      <p><strong>Peut-on synchroniser plusieurs bracelets ?</strong> Oui, jusqu'à 4 bracelets simultanément avec l'application GlowWorld — idéal pour le Pack Famille.</p>
      <p><strong>Le bracelet est-il étanche ?</strong> Oui, certifié IP65, il résiste aux éclaboussures et à la pluie.</p>
      <p><strong>Quand vais-je recevoir ma commande ?</strong> La livraison internationale suivie est offerte. Commande avant le 1er juin pour être certain de recevoir ton bracelet avant le coup d'envoi du 11 juin 2026.</p>

      <h2>Conclusion</h2>
      <p>La Coupe du Monde 2026 sera historique — 48 équipes, 104 matchs, des millions de supporters à travers le monde. Ne la vis pas comme un simple spectateur. Avec un bracelet LED connecté GlowWorld2026, chaque but devient une explosion de lumière, chaque hymne une célébration collective. Les stocks sont limités avant le coup d'envoi du 11 juin. Commande ton bracelet dès maintenant.</p>
    `
  }
];
