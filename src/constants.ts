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
    image: '/images/flag_france.png',
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
    image: '/images/flag_brazil.png',
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
    image: '/images/flag_argentina.png',
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
    image: '/images/flag_portugal.png',
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
    image: '/images/flag_usa.png',
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
    image: '/images/flag_mexico.png',
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
    image: '/images/flag_canada.png',
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
    id: 'spain-pro',
    name: {
      fr: 'Bracelet LED Sound Reactive - Édition Espagne',
      en: 'Sound Reactive LED Wristband - Spain Edition',
      es: 'Pulsera LED Sound Reactive - Edición España'
    },
    price: 24.99,
    team: 'Espagne',
    image: '/images/flag_spain.png',
    isAvailable: true,
    description: {
      fr: 'Vibrez avec La Roja. Éclairage Rouge & Jaune réactif au son.',
      en: 'Vibrate with La Roja. Sound-reactive Red & Yellow lighting.',
      es: 'Vibra con La Roja. Iluminación Roja y Amarilla reactiva al sonido.'
    },
    features: ['Sound-Sync Technology', 'Silicone Premium Soft-Touch', 'Micro Intégré Haute Sensibilité', '7 Modes Lumineux'],
    longDescription: 'Supportez la Roja avec style. Le micro intégré capte l\'ambiance du stade et chaque but devient une explosion de lumière rouge et jaune.'
  },
  {
    id: 'supporter-pack',
    name: { fr: 'Pack Supporter (2 Bracelets)', en: 'Supporter Pack (2 Wristbands)', es: 'Pack Supporter (2 Pulseras)' },
    price: 44.99,
    team: 'Pack',
    image: '/images/led-wristbands-product.png',
    isAvailable: true,
    description: { fr: '2 bracelets LED Sound Reactive au choix.', en: '2 Sound Reactive LED wristbands of your choice.', es: '2 pulseras LED Sound Reactive a tu elección.' },
    features: ['2 Bracelets au choix', 'Sound-Sync Technology', 'Micro Intégré'],
    longDescription: 'Le Pack Supporter vous permet de choisir 2 bracelets pour vous et un ami. Économisez sur le prix unitaire.'
  },
  {
    id: 'pack-france',
    name: { fr: 'Pack Duo France (2 Bracelets)', en: 'France Duo Pack (2 Wristbands)', es: 'Pack Dúo Francia (2 Pulseras)' },
    price: 44.99, team: 'France', image: '/images/flag_france.png', isAvailable: true,
    description: { fr: 'Vibrez ensemble aux couleurs des Bleus. Économisez 5€.', en: 'Vibrate together in Les Bleus colors. Save 5€.', es: 'Vibrad juntos con Les Bleus. Ahorra 5€.' },
    features: ['2 Bracelets France', 'Sound-Sync Simultané', 'Micro Intégré', 'Autonomie 12h'],
    longDescription: 'Le football est plus beau quand on le partage. 2 bracelets France Sound Reactive qui s\'illuminent simultanément.'
  },
  {
    id: 'pack-brazil',
    name: { fr: 'Pack Duo Brésil (2 Bracelets)', en: 'Brazil Duo Pack (2 Wristbands)', es: 'Pack Dúo Brasil (2 Pulseras)' },
    price: 44.99, team: 'Brésil', image: '/images/flag_brazil.png', isAvailable: true,
    description: { fr: 'Vibrez ensemble aux couleurs de la Seleção. Économisez 5€.', en: 'Vibrate together in Seleção colors. Save 5€.', es: 'Vibrad juntos con la Seleção. Ahorra 5€.' },
    features: ['2 Bracelets Brésil', 'Sound-Sync Simultané', 'Micro Intégré', 'Autonomie 12h'],
    longDescription: '2 bracelets Brésil pour vivre la Samba à deux.'
  },
  {
    id: 'pack-usa',
    name: { fr: 'Pack Duo USA (2 Bracelets)', en: 'USA Duo Pack (2 Wristbands)', es: 'Pack Dúo USA (2 Pulseras)' },
    price: 44.99, team: 'USA', image: '/images/flag_usa.png', isAvailable: true,
    description: { fr: 'Supportez Team USA ensemble. Économisez 5€.', en: 'Support Team USA together. Save 5€.', es: 'Apoyad a Team USA juntos. Ahorra 5€.' },
    features: ['2 Bracelets USA', 'Sound-Sync Simultané', 'Micro Intégré', 'Autonomie 12h'],
    longDescription: '2 bracelets USA Stars & Stripes pour vibrer ensemble.'
  },
  {
    id: 'pack-argentina',
    name: { fr: 'Pack Duo Argentine (2 Bracelets)', en: 'Argentina Duo Pack (2 Wristbands)', es: 'Pack Dúo Argentina (2 Pulseras)' },
    price: 44.99, team: 'Argentine', image: '/images/flag_argentina.png', isAvailable: true,
    description: { fr: 'Célébrez comme des champions ensemble. Économisez 5€.', en: 'Celebrate like champions together. Save 5€.', es: 'Celebrad como campeones juntos. Ahorra 5€.' },
    features: ['2 Bracelets Argentine', 'Sound-Sync Simultané', 'Micro Intégré', 'Autonomie 12h'],
    longDescription: '2 bracelets Albiceleste pour partager chaque émotion en bleu et blanc.'
  },
  {
    id: 'pack-mexico',
    name: { fr: 'Pack Duo Mexique (2 Bracelets)', en: 'Mexico Duo Pack (2 Wristbands)', es: 'Pack Dúo México (2 Pulseras)' },
    price: 44.99, team: 'Mexique', image: '/images/flag_mexico.png', isAvailable: true,
    description: { fr: 'Vibrez avec El Tri ensemble. Économisez 5€.', en: 'Vibrate with El Tri together. Save 5€.', es: 'Vibrad con El Tri juntos. Ahorra 5€.' },
    features: ['2 Bracelets Mexique', 'Sound-Sync Simultané', 'Micro Intégré', 'Autonomie 12h'],
    longDescription: '2 bracelets Mexique pour crier ¡Sí se puede! à deux.'
  },
  {
    id: 'pack-canada',
    name: { fr: 'Pack Duo Canada (2 Bracelets)', en: 'Canada Duo Pack (2 Wristbands)', es: 'Pack Dúo Canadá (2 Pulseras)' },
    price: 44.99, team: 'Canada', image: '/images/flag_canada.png', isAvailable: true,
    description: { fr: 'Supportez le Canada ensemble. Économisez 5€.', en: 'Support Canada together. Save 5€.', es: 'Apoyad a Canadá juntos. Ahorra 5€.' },
    features: ['2 Bracelets Canada', 'Sound-Sync Simultané', 'Micro Intégré', 'Autonomie 12h'],
    longDescription: '2 bracelets Canada rouge et blanc pour célébrer chaque but ensemble.'
  },
  {
    id: 'pack-portugal',
    name: { fr: 'Pack Duo Portugal (2 Bracelets)', en: 'Portugal Duo Pack (2 Wristbands)', es: 'Pack Dúo Portugal (2 Pulseras)' },
    price: 44.99, team: 'Portugal', image: '/images/flag_portugal.png', isAvailable: true,
    description: { fr: 'Vibrez avec la Seleção ensemble. Économisez 5€.', en: 'Vibrate with the Seleção together. Save 5€.', es: 'Vibrad con la Seleção juntos. Ahorra 5€.' },
    features: ['2 Bracelets Portugal', 'Sound-Sync Simultané', 'Micro Intégré', 'Autonomie 12h'],
    longDescription: '2 bracelets Portugal pour partager chaque moment fort de la Seleção.'
  },
  {
    id: 'pack-spain',
    name: { fr: 'Pack Duo Espagne (2 Bracelets)', en: 'Spain Duo Pack (2 Wristbands)', es: 'Pack Dúo España (2 Pulseras)' },
    price: 44.99, team: 'Espagne', image: '/images/flag_spain.png', isAvailable: true,
    description: { fr: 'Vibrez avec La Roja ensemble. Économisez 5€.', en: 'Vibrate with La Roja together. Save 5€.', es: 'Vibrad con La Roja juntos. Ahorra 5€.' },
    features: ['2 Bracelets Espagne', 'Sound-Sync Simultané', 'Micro Intégré', 'Autonomie 12h'],
    longDescription: '2 bracelets Espagne rouge et jaune pour vibrer ensemble à chaque action de La Roja.'
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
