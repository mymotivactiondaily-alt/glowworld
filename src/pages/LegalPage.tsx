export const LegalPage = () => (
  <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto prose prose-invert">
    <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Mentions Légales</h1>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">1. Éditeur du site</h2>
      <div className="text-white/60 space-y-1">
        <p><strong className="text-white/80">Raison sociale :</strong> GlowWorld</p>
        {/* [TODO] ⚠️ Remplacer par les vraies informations une fois l'entreprise créée */}
        <p><strong className="text-white/80">Statut :</strong> Micro-entreprise / SAS (à préciser)</p>
        <p><strong className="text-white/80">SIRET :</strong> [En cours d'immatriculation]</p>
        <p><strong className="text-white/80">Adresse :</strong> [TODO — Adresse réelle à renseigner]</p>
        <p><strong className="text-white/80">Email :</strong> contact@glowworld2026.com</p>
        <p><strong className="text-white/80">Directeur de la publication :</strong> [TODO — Nom du responsable]</p>
      </div>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">2. Hébergement</h2>
      <div className="text-white/60 space-y-1">
        <p><strong className="text-white/80">Hébergeur :</strong> Railway Corp.</p>
        <p><strong className="text-white/80">Adresse :</strong> 548 Market St, San Francisco, CA 94104, USA</p>
        <p><strong className="text-white/80">Site web :</strong> railway.app</p>
      </div>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">3. Propriété intellectuelle</h2>
      <p className="text-white/60">
        L'ensemble des éléments constituant le site GlowWorld2026.com (textes, images, graphismes, logo, icônes, vidéos, sons, logiciels, etc.)
        est la propriété exclusive de GlowWorld, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés.
        Toute reproduction, représentation, modification ou adaptation de tout ou partie du site sans autorisation préalable est strictement interdite.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">4. Limitation de responsabilité</h2>
      <p className="text-white/60">
        GlowWorld ne pourra être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site.
        GlowWorld décline toute responsabilité quant à l'utilisation qui pourrait être faite des informations et contenus présents sur le site.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">5. Cookies</h2>
      <p className="text-white/60">
        Le site GlowWorld2026.com utilise des cookies pour améliorer l'expérience utilisateur, mesurer l'audience (Google Analytics)
        et optimiser les campagnes publicitaires (TikTok Pixel, Meta Pixel). L'utilisateur peut configurer ses préférences de cookies
        via le bandeau qui s'affiche lors de la première visite.
        Pour en savoir plus, consultez notre <a href="/privacy" className="text-blue-400 underline">politique de confidentialité</a>.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">6. Droit applicable</h2>
      <p className="text-white/60">
        Les présentes mentions légales sont régies par le droit français.
        En cas de litige, les tribunaux français seront seuls compétents.
      </p>
    </section>
  </div>
);
