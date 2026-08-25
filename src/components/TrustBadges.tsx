const badges = [
  { title: "Personnel vérifié et de confiance", icon: "🛡️" },
  { title: "Sélection rigoureuse et adaptée à vos besoins", icon: "👥" },
  { title: "Accompagnement et suivi personnalisé", icon: "🤝" },
  { title: "Satisfaction garantie", icon: "🏅" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-eden-gold/30 bg-eden-green py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 sm:grid-cols-4">
        {badges.map((b) => (
          <div key={b.title} className="text-center text-eden-cream">
            <div className="seal-ring mx-auto flex h-14 w-14 items-center justify-center border-eden-gold text-2xl">
              <span aria-hidden="true">{b.icon}</span>
            </div>
            <p className="mt-3 text-sm font-medium leading-snug">{b.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
