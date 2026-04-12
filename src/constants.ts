import { Product, BlogPost } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'france-pro',
    isPremium: true,
    name: {
      fr: 'Bracelet LED Sound Reactive - Édition France',
      en: 'Sound Reactive LED Wristband - France Edition',
      es: 'Pulsera LED Sound Reactive - Edición Francia'
    },
    price: 24.99,
    team: 'France',
    image: '/images/wristband_france.png',
    isAvailable: true,
    description: {
      fr: 'Mode Réactif au Son & Synchro Ambiance. Éclairage Bleu/Blanc/Rouge ultra-puissant.',
      en: 'Sound Reactive Mode & Ambience Sync. Ultra-powerful Blue/White/Red lighting.',
      es: 'Modo Reactivo al Sonido y Sincronización. Iluminación Azul/Blanco/Rojo ultra potente.'
    },
    features: ['Sound-Sync Technology', 'Silicone Premium Soft-Touch', 'Micro Intégré Haute Sensibilité', '7 Modes Lumineux'],
    longDescription: 'Vivez chaque match des Bleus intensément. Grâce à son micro intégré et sa technologie Sound-Sync, votre bracelet scintille au rythme de vos cris et de l\'ambiance du stade. Son design premium avec drapeau estompé et silicone soft-touch en fait l\'accessoire ultime du supporter.'
  },
  {
    id: 'brazil-pro',
    name: {
      fr: 'Bracelet LED Sound Reactive - Édition Brésil',
      en: 'Sound Reactive LED Wristband - Brazil Edition',
      es: 'Pulsera LED Sound Reactive - Edición Brasil'
    },
    price: 24.99,
    team: 'Brésil',
    image: '/images/wristband_brazil.png',
    isAvailable: true,
    description: {
      fr: 'Vibrez au rythme de la Samba. Mode réactif au son et couleurs Jaune/Vert.',
      en: 'Vibrate to the rhythm of Samba. Sound-reactive mode and Yellow/Green colors.',
      es: 'Vibrar al ritmo de la Samba. Modo reactivo al sonido y colores Amarillo/Verde.'
    },
    features: ['Sound-Sync Technology', 'Silicone Premium Soft-Touch', 'Micro Intégré Haute Sensibilité', '7 Modes Lumineux'],
    longDescription: 'L\'énergie de la Seleção à votre poignet. Ce bracelet réagit instantanément aux chants des supporters et aux percussions grâce à son micro intégré. Un indispensable pour transformer votre salon en véritable Copacabana.'
  },
  {
    id: 'argentina-pro',
    name: {
      fr: 'Bracelet LED Sound Reactive - Édition Argentine',
      en: 'Sound Reactive LED Wristband - Argentina Edition',
      es: 'Pulsera LED Sound Reactive - Edición Argentina'
    },
    price: 24.99,
    team: 'Argentine',
    image: '/images/wristband_argentina.png',
    isAvailable: true,
    description: {
      fr: 'Célébrez comme un champion. Éclairage Bleu Céleste réactif au direct.',
      en: 'Celebrate like a champion. Sky Blue lighting reactive to the direct.',
      es: 'Celebre como un campeón. Iluminación Azul Celeste reactiva al directo.'
    },
    features: ['Sound-Sync Technology', 'Silicone Premium Soft-Touch', 'Micro Intégré Haute Sensibilité', '7 Modes Lumineux'],
    longDescription: 'Portez les couleurs de l\'Albiceleste. Le micro intégré capte l\'ambiance du match et chaque moment fort devient une explosion de lumière bleu et blanc.'
  },
  {
    id: 'portugal-pro',
    name: {
      fr: 'Bracelet LED Sound Reactive - Édition Portugal',
      en: 'Sound Reactive LED Wristband - Portugal Edition',
      es: 'Pulsera LED Sound Reactive - Edición Portugal'
    },
    price: 24.99,
    team: 'Portugal',
    image: '/images/wristband_portugal.png',
    isAvailable: true,
    description: {
      fr: 'L\'énergie de la Seleção à votre poignet. Mode réactif au son.',
      en: 'The energy of the Seleção on your wrist. Sound-reactive mode.',
      es: 'La energía de la Seleção en tu muñeca. Modo reactivo al sonido.'
    },
    features: ['Sound-Sync Technology', 'Silicone Premium Soft-Touch', 'Micro Intégré Haute Sensibilité', '7 Modes Lumineux'],
    longDescription: 'Vibrez avec le Portugal. Ce bracelet s\'illumine aux couleurs de la Seleção à chaque action décisive grâce à sa détection sonore automatique.'
  },
  {
    id: 'usa-pro',
    name: {
      fr: 'Bracelet LED Sound Reactive - Édition USA',
      en: 'Sound Reactive LED Wristband - USA Edition',
      es: 'Pulsera LED Sound Reactive - Edición USA'
    },
    price: 24.99,
    team: 'USA',
    image: '/images/wristband_usa.png',
    isAvailable: true,
    description: {
      fr: 'Stars & Stripes edition. Parfait pour les fans de Team USA.',
      en: 'Stars & Stripes edition. Perfect for Team USA fans.',
      es: 'Edición Stars & Stripes. Perfecto para los fans de Team USA.'
    },
    features: ['Sound-Sync Technology', 'Silicone Premium Soft-Touch', 'Micro Intégré Haute Sensibilité', '7 Modes Lumineux'],
    longDescription: 'Supportez les USA with style. Le micro intégré capte l\'ambiance des stades américains pour une synchronisation parfaite.'
  },
  {
    id: 'mexico-pro',
    name: {
      fr: 'Bracelet LED Sound Reactive - Édition Mexique',
      en: 'Sound Reactive LED Wristband - Mexico Edition',
      es: 'Pulsera LED Sound Reactive - Edición México'
    },
    price: 24.99,
    team: 'Mexique',
    image: '/images/wristband_mexico.png',
    isAvailable: true,
    description: {
      fr: 'Vibrez avec El Tri. Éclairage Vert/Blanc/Rouge.',
      en: 'Vibrate with El Tri. Green/White/Red lighting.',
      es: 'Vive con El Tri. Iluminación Verde/Blanco/Rojo.'
    },
    features: ['Sound-Sync Technology', 'Silicone Premium Soft-Touch', 'Micro Intégré Haute Sensibilité', '7 Modes Lumineux'],
    longDescription: 'Le bracelet indispensable pour tous les fans du Mexique lors de cette Coupe du Monde à domicile. Son micro intégré capte chaque cri de "¡Sí se puede!".'
  },
  {
    id: 'canada-pro',
    name: {
      fr: 'Bracelet LED Sound Reactive - Édition Canada',
      en: 'Sound Reactive LED Wristband - Canada Edition',
      es: 'Pulsera LED Sound Reactive - Edición Canadá'
    },
    price: 24.99,
    team: 'Canada',
    image: '/images/wristband_canada.png',
    isAvailable: true,
    description: {
      fr: 'Supportez les Canucks. Éclairage Rouge & Blanc.',
      en: 'Support the Canucks. Red & White lighting.',
      es: 'Apoya a los Canucks. Iluminación Roja y Blanca.'
    },
    features: ['Sound-Sync Technology', 'Silicone Premium Soft-Touch', 'Micro Intégré Haute Sensibilité', '7 Modes Lumineux'],
    longDescription: 'Célébrez chaque but du Canada avec une explosion de lumière rouge et blanche. La détection sonore automatique ne rate aucun moment de liesse.'
  },
  {
    id: 'host-edition',
    name: {
      fr: 'Bracelet LED - Édition Hôte (USA/MEX/CAN)',
      en: 'LED Wristband - Host Edition (USA/MEX/CAN)',
      es: 'Pulsera LED - Edición Anfitrión (USA/MEX/CAN)'
    },
    price: 24.99,
    team: 'Pack',
    image: '/images/wristband_pack.png',
    isAvailable: true,
    description: {
      fr: 'L\'édition collector multicolore. Compatible avec tous les matchs.',
      en: 'The multicolor collector edition. Compatible with all matches.',
      es: 'La edición de coleccionista multicolor. Compatible con todos los partidos.'
    },
    features: ['Sound-Sync Technology', 'Toutes Couleurs', '7 Modes Lumineux', 'Taille Unique'],
    longDescription: 'Le bracelet universel pour la Coupe du Monde 2026. Changez de couleur selon le match que vous regardez. Son micro intégré haute précision garantit une immersion totale pendant 90 minutes.'
  },
  {
    id: 'supporter-pack',
    name: {
      fr: 'Pack Supporter Ultime (2 Bracelets)',
      en: 'Ultimate Supporter Pack (2 Wristbands)',
      es: 'Pack de Aficionado Definitivo (2 Pulseras)'
    },
    price: 44.99,
    team: 'Pack',
    image: '/images/wristband_pack.png',
    isAvailable: true,
    description: {
      fr: 'Pack Duo pour vibrer ensemble. Économisez 5€ sur votre commande.',
      en: 'Duo Pack to vibrate together. Save 5€ on your order.',
      es: 'Pack Dúo para vibrar juntos. Ahorra 5€ en tu pedido.'
    },
    features: ['2 Bracelets', 'Sound-Sync Simultané', 'Micro Intégré', 'Autonomie 12h'],
    longDescription: 'Le football est plus beau quand on le partage. Ce pack contient deux bracelets Sound Reactive. Les deux bracelets réagissent simultanément à l\'ambiance sonore pour que vos deux poignets s\'illuminent en même temps au rythme de l\'ambiance !'
  },
  {
    id: 'family-pack-pro',
    name: {
      fr: 'Pack Famille (4 Bracelets LED)',
      en: 'Family Pack (4 LED Wristbands)',
      es: 'Pack Familiar (4 Pulseras LED)'
    },
    price: 79.99,
    team: 'Pack',
    image: '/images/wristband_pack.png',
    isAvailable: true,
    description: {
      fr: 'Transformez votre salon en stade. Le meilleur rapport qualité/prix.',
      en: 'Turn your living room into a stadium. Best value for money.',
      es: 'Convierte tu sala en un estadio. La mejor relación calidad-precio.'
    },
    features: ['4 Bracelets', 'Sound-Sync Groupe', 'Autonomie 12h', 'Piles Incluses'],
    longDescription: 'Le pack idéal pour les familles de fans. Chaque bracelet réagit indépendamment au son ambiant. Créez une ambiance de stade incroyable chez vous et vivez la Coupe du Monde comme si vous y étiez.'
  },
  {
    id: 'team-pack-pro',
    name: {
      fr: 'Pack Équipe Ultime (8 Bracelets)',
      en: 'Ultimate Team Pack (8 Wristbands)',
      es: 'Pack de Equipo Definitivo (8 Pulseras)'
    },
    price: 149.99,
    team: 'Pack',
    image: '/images/wristband_pack.png',
    isAvailable: false,
    description: {
      fr: 'La limite technologique ultime. Équipez tout votre groupe.',
      en: 'The ultimate technological limit. Equip your entire group.',
      es: 'El límite tecnológico definitivo. Equipa a todo tu grupo.'
    },
    features: ['8 Bracelets', 'Sound-Sync Totale', 'Autonomie 12h', 'Livraison Express'],
    longDescription: 'Le summum de l\'expérience GlowWorld. Ce pack contient 8 bracelets Sound Reactive qui réagissent simultanément au son ambiant. Idéal pour les bars ou les grands groupes d\'amis.'
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
      La Coupe du Monde 2026 approche à grands pas et l'excitation monte chez les supporters du monde entier. Pour vivre cet événement historique aux États-Unis, au Mexique et au Canada, certains accessoires sont devenus incontournables. En tête de liste, on retrouve le bracelet LED Sound Reactive, une véritable révolution technologique qui transforme l'expérience du fan.

      Contrairement aux simples drapeaux ou maillots, ces bracelets intelligents offrent une interactivité inédite. Grâce à leur micro intégré et leur technologie Sound-Sync, ils s'illuminent aux couleurs de votre équipe favorite au rythme de vos cris et de l'ambiance du match. Imaginez votre salon s'illuminer en bleu, blanc et rouge lors d'un but décisif de l'équipe de France !

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
      Activer votre bracelet LED GlowWorld pour les matchs en direct est un jeu d'enfant. Votre bracelet est doté d'un micro intégré haute sensibilité et d'une technologie Sound-Sync exclusive. Il vous suffit d'appuyer sur le bouton pour l'allumer et choisir votre mode lumineux.

      Grâce au "Mode Stade" intégré, notre technologie de détection sonore analyse l'ambiance et les chants en temps réel pour déclencher des effets lumineux spectaculaires. Que ce soit pour l'hymne national ou la ferveur d'une célébration, votre bracelet réagira instantanément à l'émotion du moment.

      Pour une expérience optimale, assurez-vous que votre bracelet est bien chargé avant le coup d'envoi. Préparez-vous à briller autant que les étoiles sur le maillot !
    `
  },
  {
    id: '3',
    title: 'Le meilleur bracelet LED Sound Reactive pour la Coupe du Monde 2026 : guide complet',
    excerpt: 'Tout ce qu\'il faut savoir pour choisir son bracelet LED Sound Reactive avant la Coupe du Monde 2026. Comparatif, critères de choix et meilleures éditions par équipe.',
    date: '9 Avril 2026',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc1d',
    slug: 'meilleur-bracelet-led-2026',
    category: 'Guide',
    readTime: '6 min',
    author: 'Équipe GlowWorld',
    content: `
      <h2>La Coupe du Monde 2026 : l'édition la plus grande de l'histoire</h2>
      <p>La Coupe du Monde 2026 s'annonce comme le plus grand événement sportif de l'histoire. Du 11 juin au 19 juillet 2026, la compétition réunit pour la première fois 48 équipes, organisée conjointement par les États-Unis, le Canada et le Mexique. Pour vivre cette édition historique comme jamais, un accessoire s'impose : le bracelet LED intelligent pour supporter son équipe avec style.</p>

      <h2>Qu'est-ce qu'un bracelet LED intelligent pour la Coupe du Monde ?</h2>
      <p>Un bracelet LED Sound Reactive est un bracelet en silicone équipé de LEDs qui s'illuminent aux couleurs de votre équipe favorite. Grâce à son micro intégré haute sensibilité, il détecte automatiquement votre environnement sonore pour réagir en temps réel aux buts, aux hymnes et à l'ambiance du match. Fini de regarder les matchs passivement — avec un bracelet LED, votre salon devient un vrai stade.</p>
      <p>Le bracelet GlowWorld2026 se distingue par son mode "Sound-Sync" exclusif : les LEDs réagissent automatiquement au bruit ambiant. Quand vous criez lors d'un but, le bracelet s'illumine instantanément. Une immersion totale, sans aucune application nécessaire.</p>

      <h2>Pourquoi choisir un bracelet LED pour la Coupe du Monde 2026 ?</h2>
      <p>La Coupe du Monde 2026 sera un événement planétaire suivi par des milliards de personnes. Que vous soyez au stade, dans une fan zone ou dans votre salon, le bracelet LED fait toute la différence :</p>
      <ul>
        <li><strong>Immersion à domicile :</strong> Le bracelet transforme chaque match en spectacle immersif.</li>
        <li><strong>Ambiance électrique :</strong> Parfait pour les soirées entre amis ou en famille.</li>
        <li><strong>Simplicité totale :</strong> Pas d'app à installer, le bracelet est prêt à l'emploi dès la sortie de boîte.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>La Coupe du Monde 2026 sera historique. Ne la vivez pas comme un simple spectateur. Avec un bracelet LED GlowWorld2026, chaque but devient une explosion de lumière. Les stocks sont limités avant le coup d'envoi du 11 juin. Commandez le vôtre dès maintenant.</p>
    `
  }
];
