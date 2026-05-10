const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

const pt = (mm) => mm * 2.83465;

function draw_star(doc, cx, cy, outer_radius, color) {
  const inner_radius = outer_radius * 0.4;
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = Math.PI / 2 - i * Math.PI / 5;
    const r = i % 2 === 0 ? outer_radius : inner_radius;
    const x = cx + r * Math.cos(angle);
    const y = cy - r * Math.sin(angle);
    points.push([x, y]);
  }
  
  doc.fillColor(color);
  doc.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    doc.lineTo(points[i][0], points[i][1]);
  }
  doc.closePath();
  doc.fill();
}

const CARD_WIDTH = pt(85);
const CARD_HEIGHT = pt(55);

const mascots = {
  france: { mascot: "GAUL'O", role: "Le coq tricolore", slogan: "VIBRE AVEC LES BLEUS", stars: 2, lang: "FR", color: "#002395", img: "gaulo.png" },
  brazil: { mascot: "ZICO", role: "O tucano", slogan: "O HEXA TÁ CHEGANDO", stars: 5, lang: "PT", color: "#009B3A", img: "zico.png" },
  argentina: { mascot: "DIEGO", role: "El gaucho", slogan: "VAMOS POR LA GLORIA", stars: 3, lang: "ES", color: "#75AADB", img: "diego.png" },
  usa: { mascot: "STARZ", role: "The eagle", slogan: "FEEL THE GAME", stars: 0, lang: "EN", color: "#002868", img: "starz.png" },
  mexico: { mascot: "TRI", role: "El águila", slogan: "VAMOS POR TODO", stars: 0, lang: "ES", color: "#006847", img: "tri.png" },
  canada: { mascot: "HOCK", role: "The beaver", slogan: "OUR HOME, OUR CUP", stars: 0, lang: "EN", color: "#FF0000", img: "hock.png" },
  portugal: { mascot: "FADO", role: "O galo", slogan: "FORÇA SELEÇÃO", stars: 0, lang: "PT", color: "#FF0000", img: "fado.png" },
  spain: { mascot: "TIKI", role: "El toro", slogan: "LA ROJA DESPIERTA", stars: 1, lang: "ES", color: "#AA151B", img: "tiki.png" }
};

const texts = {
  FR: {
    badge: "IA COMPANION INCLUSE",
    meet: "Rencontre",
    howTo: "COMMENT ÇA MARCHE",
    step1: "1. Scanne le QR Code",
    step2: "2. Entre ton email",
    step3: (m) => `3. Débloque ta Fan Zone + ${m}, ton IA`,
    lines: [
      "Avant le match : pronostics, anecdotes",
      "Pendant : ton bracelet vibre au son",
      "Après : débrief avec ta mascotte"
    ]
  },
  EN: {
    badge: "AI COMPANION INCLUDED",
    meet: "Meet",
    howTo: "HOW IT WORKS",
    step1: "1. Scan the QR Code",
    step2: "2. Enter your email",
    step3: (m) => `3. Unlock your Fan Zone + ${m}, your AI`,
    lines: [
      "Before the match: predictions, trivia",
      "During: your wristband vibes to the sound",
      "After: debrief with your mascot"
    ]
  },
  ES: {
    badge: "IA COMPANION INCLUIDA",
    meet: "Conoce a",
    howTo: "CÓMO FUNCIONA",
    step1: "1. Escanea el código QR",
    step2: "2. Ingresa tu email",
    step3: (m) => `3. Desbloquea tu Fan Zone + ${m}, tu IA`,
    lines: [
      "Antes del partido: pronósticos, anécdotas",
      "Durante: tu pulsera vibra con el sonido",
      "Después: debate con tu mascota"
    ]
  },
  PT: {
    badge: "IA COMPANION INCLUÍDA",
    meet: "Conheça",
    howTo: "COMO FUNCIONA",
    step1: "1. Escaneie o QR Code",
    step2: "2. Insira seu email",
    step3: (m) => `3. Desbloqueie sua Fan Zone + ${m}, sua IA`,
    lines: [
      "Antes do jogo: palpites, curiosidades",
      "Durante: sua pulseira vibra com o som",
      "Depois: resenha com sua mascote"
    ]
  }
};

async function generateCards() {
  const outputDir = path.resolve(__dirname, '../public/pdfs/cards');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const [country, data] of Object.entries(mascots)) {
    const doc = new PDFDocument({
      size: [CARD_WIDTH, CARD_HEIGHT],
      margin: 0
    });

    const outputPath = path.join(outputDir, `${country}_card_v2.pdf`);
    doc.pipe(fs.createWriteStream(outputPath));

    // RECTO
    // ---------------------------------------------------------
    // Background
    doc.rect(0, 0, CARD_WIDTH, CARD_HEIGHT).fill('#111111');

    // Top colored banner
    doc.rect(0, 0, CARD_WIDTH, pt(8)).fill(data.color);
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#FFFFFF')
       .text(`GLOWWORLD 2026 ${country.toUpperCase()}`, 0, pt(2.5), { align: 'center' });

    // Gold badge under banner
    doc.rect(0, pt(8), CARD_WIDTH, pt(4)).fill('#D4AF37');
    doc.font('Helvetica-Bold').fontSize(4.5).fillColor('#000000')
       .text(texts[data.lang].badge, 0, pt(8.5), { align: 'center' });

    // Mascot image
    const mascotImg = path.resolve(__dirname, `../public/images/mascots/${data.img}`);
    if (fs.existsSync(mascotImg)) {
      doc.image(mascotImg, pt(5), pt(14), { fit: [pt(28), pt(28)], align: 'center', valign: 'center' });
    }

    // Name + Role
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#FFFFFF')
       .text(`${texts[data.lang].meet} ${data.mascot}`, pt(38), pt(16));
    doc.font('Helvetica-Oblique').fontSize(6).fillColor('#CCCCCC')
       .text(data.role, pt(38), pt(25));

    // Stars
    if (data.stars > 0) {
      const star_color = '#D4AF37';
      const star_radius = pt(1.5);
      const gap = pt(4);
      const start_x = pt(38) + star_radius;
      const star_y = pt(31) + star_radius + pt(0.5); // Adjust slightly for vertical centering
      
      for (let i = 0; i < data.stars; i++) {
        const star_x = start_x + i * gap;
        draw_star(doc, star_x, star_y, star_radius, star_color);
      }
    }

    // Slogan
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#FFFFFF')
       .text(data.slogan, pt(5), pt(45), { align: 'center', width: CARD_WIDTH - pt(10) });

    // URL
    doc.font('Helvetica').fontSize(5).fillColor('#888888')
       .text(`glowworld2026.com/fan/${country}`, pt(5), CARD_HEIGHT - pt(5));

    // Hologram Placeholder
    doc.rect(CARD_WIDTH - pt(12), CARD_HEIGHT - pt(10), pt(10), pt(8)).fill('#555555');
    doc.font('Helvetica-Bold').fontSize(3.5).fillColor('#FFFFFF')
       .text("HOLO", CARD_WIDTH - pt(11.5), CARD_HEIGHT - pt(6.5));


    // VERSO
    // ---------------------------------------------------------
    doc.addPage();
    doc.rect(0, 0, CARD_WIDTH, CARD_HEIGHT).fill('#111111');

    // Top colored banner
    doc.rect(0, 0, CARD_WIDTH, pt(8)).fill(data.color);
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#FFFFFF')
       .text(texts[data.lang].howTo, 0, pt(2.5), { align: 'center' });

    // QR Code
    const qrData = await QRCode.toDataURL(`https://glowworld2026.com/fan/${country}`, { margin: 1 });
    doc.image(qrData, pt(5), pt(10), { width: pt(30), height: pt(30) });

    // Steps
    doc.font('Helvetica-Bold').fontSize(6).fillColor('#FFFFFF');
    doc.text(texts[data.lang].step1, pt(40), pt(12));
    doc.text(texts[data.lang].step2, pt(40), pt(22));
    doc.text(texts[data.lang].step3(data.mascot), pt(40), pt(32));

    // Bottom lines
    doc.font('Helvetica').fontSize(4.5).fillColor('#CCCCCC');
    doc.text(texts[data.lang].lines[0], pt(5), pt(42));
    doc.text(texts[data.lang].lines[1], pt(5), pt(46.5));
    doc.text(texts[data.lang].lines[2], pt(5), pt(51));

    // Footer
    doc.font('Helvetica-Bold').fontSize(4).fillColor('#888888')
       .text("GLOWWORLD 2026 · ✦ Powered by AI", 0, CARD_HEIGHT - pt(4), { align: 'center' });

    doc.end();
    console.log(`✓ Généré: ${outputPath}`);
  }
}

generateCards().catch(console.error);
