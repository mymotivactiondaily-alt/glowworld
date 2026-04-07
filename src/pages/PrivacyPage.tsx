export const PrivacyPage = () => (
  <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto prose prose-invert">
    <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Politique de Confidentialité</h1>
    <p className="text-white/40 text-sm mb-8">Dernière mise à jour : Avril 2026</p>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">1. Responsable du traitement</h2>
      <div className="text-white/60 space-y-1">
        <p>GlowWorld est responsable du traitement des données personnelles collectées sur le site glowworld2026.com.</p>
        <p><strong className="text-white/80">Email :</strong> contact@glowworld2026.com</p>
      </div>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">2. Données collectées</h2>
      <p className="text-white/60 mb-2">Nous collectons les données suivantes :</p>
      <ul className="text-white/60 list-disc pl-6 space-y-1">
        <li><strong className="text-white/80">Données d'identification :</strong> nom, prénom, email (lors de la commande)</li>
        <li><strong className="text-white/80">Données de livraison :</strong> adresse postale complète</li>
        <li><strong className="text-white/80">Données de navigation :</strong> pages visitées, durée, appareil (via cookies analytics)</li>
        <li><strong className="text-white/80">Données de paiement :</strong> traitées exclusivement par Stripe (nous n'y avons pas accès)</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">3. Finalités du traitement</h2>
      <ul className="text-white/60 list-disc pl-6 space-y-1">
        <li>Traitement et suivi des commandes</li>
        <li>Communication liée à la commande (confirmation, expédition)</li>
        <li>Analyse statistique de l'audience du site (Google Analytics)</li>
        <li>Optimisation des campagnes publicitaires (TikTok Pixel, Meta Pixel)</li>
        <li>Amélioration de l'expérience utilisateur</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">4. Base légale</h2>
      <ul className="text-white/60 list-disc pl-6 space-y-1">
        <li><strong className="text-white/80">Exécution du contrat :</strong> données nécessaires au traitement de la commande</li>
        <li><strong className="text-white/80">Consentement :</strong> cookies analytics et marketing (via le bandeau cookies)</li>
        <li><strong className="text-white/80">Intérêt légitime :</strong> prévention de la fraude et sécurité du site</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">5. Cookies</h2>
      <p className="text-white/60 mb-2">Notre site utilise les cookies suivants :</p>
      <div className="overflow-x-auto">
        <table className="text-white/60 text-sm w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 text-white/80">Cookie</th>
              <th className="text-left py-2 text-white/80">Type</th>
              <th className="text-left py-2 text-white/80">Finalité</th>
              <th className="text-left py-2 text-white/80">Durée</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5">
              <td className="py-2">gw-cookie-consent</td>
              <td className="py-2">Essentiel</td>
              <td className="py-2">Mémoriser le choix cookies</td>
              <td className="py-2">1 an</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">_ga / _ga_*</td>
              <td className="py-2">Analytics</td>
              <td className="py-2">Google Analytics 4</td>
              <td className="py-2">2 ans</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">_ttp / _tt_*</td>
              <td className="py-2">Marketing</td>
              <td className="py-2">TikTok Pixel</td>
              <td className="py-2">13 mois</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">_fbp / _fbc</td>
              <td className="py-2">Marketing</td>
              <td className="py-2">Meta Pixel</td>
              <td className="py-2">3 mois</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-white/60 mt-2">
        Vous pouvez modifier vos préférences de cookies à tout moment en supprimant vos données de navigation.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">6. Durée de conservation</h2>
      <ul className="text-white/60 list-disc pl-6 space-y-1">
        <li><strong className="text-white/80">Données de commande :</strong> 5 ans (obligation légale comptable)</li>
        <li><strong className="text-white/80">Données de navigation :</strong> 13 mois maximum</li>
        <li><strong className="text-white/80">Données de prospection :</strong> 3 ans après le dernier contact</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">7. Partage des données</h2>
      <p className="text-white/60 mb-2">Vos données peuvent être partagées avec :</p>
      <ul className="text-white/60 list-disc pl-6 space-y-1">
        <li><strong className="text-white/80">Stripe</strong> — traitement sécurisé des paiements</li>
        <li><strong className="text-white/80">Service de livraison</strong> — expédition des commandes</li>
        <li><strong className="text-white/80">Google Analytics</strong> — analyse d'audience (données anonymisées)</li>
        <li><strong className="text-white/80">TikTok / Meta</strong> — optimisation publicitaire (si consentement donné)</li>
      </ul>
      <p className="text-white/60 mt-2">Nous ne vendons jamais vos données personnelles à des tiers.</p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">8. Vos droits (RGPD)</h2>
      <p className="text-white/60 mb-2">
        Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés,
        vous disposez des droits suivants :
      </p>
      <ul className="text-white/60 list-disc pl-6 space-y-1">
        <li><strong className="text-white/80">Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
        <li><strong className="text-white/80">Droit de rectification :</strong> corriger des données inexactes</li>
        <li><strong className="text-white/80">Droit à l'effacement :</strong> demander la suppression de vos données</li>
        <li><strong className="text-white/80">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
        <li><strong className="text-white/80">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
        <li><strong className="text-white/80">Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
      </ul>
      <p className="text-white/60 mt-2">
        Pour exercer ces droits, envoyez un email à <strong className="text-white/80">contact@glowworld2026.com</strong>.
        Nous répondrons dans un délai maximum de 30 jours.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">9. Sécurité</h2>
      <p className="text-white/60">
        Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
        contre tout accès non autorisé, modification, divulgation ou destruction. Les communications sont chiffrées via HTTPS/TLS.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">10. Réclamation</h2>
      <p className="text-white/60">
        Si vous estimez que le traitement de vos données ne respecte pas la réglementation en vigueur,
        vous pouvez adresser une réclamation à la CNIL (Commission Nationale de l'Informatique et des Libertés) :
        <a href="https://www.cnil.fr" className="text-blue-400 underline ml-1" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
      </p>
    </section>
  </div>
);
