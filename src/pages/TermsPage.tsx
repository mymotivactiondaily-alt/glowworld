export const TermsPage = () => (
  <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto prose prose-invert">
    <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Conditions Générales de Vente</h1>
    <p className="text-white/40 text-sm mb-8">Dernière mise à jour : Avril 2026</p>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Article 1 — Objet</h2>
      <p className="text-white/60">
        Les présentes conditions générales de vente (CGV) régissent l'ensemble des transactions commerciales 
        réalisées sur le site glowworld2026.com. Toute commande implique l'acceptation sans réserve des présentes CGV.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Article 2 — Produits</h2>
      <p className="text-white/60">
        Les bracelets LED connectés GlowWorld sont des accessoires électroniques conçus pour le divertissement.
        Les photographies et descriptions des produits sont les plus fidèles possibles mais ne sauraient engager 
        la responsabilité du vendeur en cas de légères différences.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Article 3 — Prix</h2>
      <p className="text-white/60">
        Les prix sont indiqués en Euros TTC (toutes taxes comprises). GlowWorld se réserve le droit de modifier 
        ses prix à tout moment, étant entendu que le prix applicable est celui en vigueur au moment de la validation de la commande.
        Les frais de livraison sont indiqués avant la validation du paiement.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Article 4 — Commande</h2>
      <p className="text-white/60">
        Le processus de commande se déroule comme suit : sélection des produits, ajout au panier, 
        validation du panier, saisie des coordonnées de livraison, choix du mode de paiement, 
        validation et paiement sécurisé via Stripe. Un email de confirmation est envoyé après le paiement.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Article 5 — Paiement</h2>
      <p className="text-white/60">
        Le paiement est effectué par carte bancaire via la plateforme sécurisée Stripe.
        Les données de paiement sont chiffrées et ne transitent jamais par nos serveurs.
        Le montant est débité au moment de la validation de la commande.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Article 6 — Livraison</h2>
      <p className="text-white/60">
        Les produits sont expédiés à l'adresse de livraison indiquée lors de la commande.
        Les délais de livraison sont donnés à titre indicatif et varient selon la destination :
      </p>
      <ul className="text-white/60 list-disc pl-6 mt-2 space-y-1">
        <li>France métropolitaine : 7 à 15 jours ouvrés</li>
        <li>Europe : 10 à 20 jours ouvrés</li>
        <li>International : 15 à 30 jours ouvrés</li>
      </ul>
      <p className="text-white/60 mt-2">
        Un numéro de suivi est communiqué par email dès l'expédition.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Article 7 — Droit de rétractation</h2>
      <p className="text-white/60">
        Conformément à l'article L221-18 du Code de la consommation, le consommateur dispose d'un délai
        de <strong className="text-white/80">14 jours calendaires</strong> à compter de la réception du produit pour exercer 
        son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
      </p>
      <p className="text-white/60 mt-2">
        Pour exercer ce droit, contactez-nous à <strong className="text-white/80">contact@glowworld2026.com</strong> en indiquant 
        votre numéro de commande. Les frais de retour sont à la charge de l'acheteur. 
        Le remboursement intervient dans les 14 jours suivant la réception du produit retourné.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Article 8 — Garantie</h2>
      <p className="text-white/60">
        Tous nos produits bénéficient de la garantie légale de conformité (articles L217-4 et suivants du Code de la consommation)
        et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil).
        En cas de produit défectueux, contactez notre service client pour un échange ou un remboursement.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Article 9 — Responsabilité</h2>
      <p className="text-white/60">
        GlowWorld ne pourra être tenu responsable de tout dommage résultant d'une mauvaise utilisation du produit.
        Les bracelets LED sont des accessoires de divertissement et ne sont pas des dispositifs médicaux.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Article 10 — Litiges</h2>
      <p className="text-white/60">
        Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée 
        avant toute action judiciaire. Le consommateur peut recourir à un médiateur de la consommation 
        conformément aux articles L611-1 et suivants du Code de la consommation.
      </p>
    </section>
  </div>
);
