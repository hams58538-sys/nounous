# Eden Agency — Site web

Placement de nounous & ménagères à Douala et Yaoundé.
Next.js 14 (App Router) + TypeScript + Tailwind + Prisma/PostgreSQL.

## 1. Installation

```bash
npm install
cp .env.example .env   # remplir avec vos vraies valeurs
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts # crée le compte admin de démo + numéros WhatsApp
npm run dev
```

Site disponible sur http://localhost:3000

**Identifiants admin de démo** (créés par le seed — à changer immédiatement) :
- Email : `admin@edenagency.cm`
- Mot de passe : `ChangeMe_On_FirstLogin!`

Changez ce mot de passe dès la première connexion, ou supprimez ce compte et
créez-en un nouveau directement dans la base de données avec un mot de passe
haché (`bcryptjs`).

## 2. Ajouter vos vraies photos

Le code ne contient aucune image en dur. Uploadez vos photos (logo, staff,
etc.) via Cloudinary une fois configuré, puis référencez-les avec
`next/image`. Aucune modification de code n'est nécessaire pour changer les
images une fois les composants en place.

## 3. Structure du site

| Page | Route |
|---|---|
| Accueil | `/` |
| Services | `/services` |
| Douala | `/douala` |
| Yaoundé | `/yaounde` |
| Comment ça marche | `/comment-ca-marche` |
| Demande de placement (familles) | `/demande` |
| Postuler (candidates) | `/postuler` |
| À propos | `/a-propos` |
| Témoignages | `/temoignages` |
| Contact | `/contact` |
| Admin | `/admin/login` → `/admin/dashboard` |

## 4. Numéros WhatsApp par branche

- Douala : `+237670638233`
- Yaoundé : `+237657990371`

Le numéro affiché est **automatiquement choisi selon la ville sélectionnée**
par le visiteur — jamais les deux en même temps. Modifiable à tout moment
dans `/admin/parametres` (rôle Admin complet uniquement), sans toucher au code.

## 5. Rôles admin

- **Recruiter** : consulte et gère candidatures/demandes.
- **Admin (complet)** : tout ce que fait Recruiter, plus la gestion des
  numéros WhatsApp et des comptes staff.

Créez des comptes supplémentaires via Prisma Studio (`npm run db:studio`) en
hachant le mot de passe avec bcrypt, ou construisez un petit écran de gestion
des comptes dans `/admin/parametres` si besoin.

## 6. Sécurité — ce qui est déjà en place

- HTTPS forcé (HSTS) + en-têtes de sécurité (`next.config.js`)
- Validation serveur systématique (Zod) sur tous les formulaires publics
- Limitation de débit (rate limiting) sur les formulaires et l'upload
- Champ honeypot anti-bot sur les formulaires publics
- Upload de fichiers : vérification du type réel (magic bytes), taille max
  8 Mo, stockage privé (jamais d'URL publique pour la CNI)
- Mots de passe admin hachés (bcrypt), sessions courtes (8h)
- Contrôle d'accès par rôle (RBAC) sur les routes `/admin/*` et leurs API
- Journal d'audit (`AuditLog`) pour tout changement de statut ou de paramètre
- Aucune donnée sensible (CNI, etc.) n'est jamais envoyée par WhatsApp — le
  bouton WhatsApp n'envoie qu'un message texte de prise de contact

**Avant la mise en production**, configurez impérativement :
- `UPSTASH_REDIS_REST_URL` / `TOKEN` (sinon le rate limiting est désactivé)
- Un vrai `NEXTAUTH_SECRET` (`openssl rand -base64 32`)
- Cloudinary avec `type: authenticated` pour les documents CNI (déjà codé)
- Des sauvegardes automatiques de la base de données

## 7. Déploiement (Vercel gratuit)

1. Poussez le code sur GitHub.
2. Connectez le dépôt à [vercel.com](https://vercel.com).
3. Ajoutez toutes les variables de `.env.example` dans les réglages Vercel.
4. Créez une base Postgres gratuite sur [Supabase](https://supabase.com) ou
   [Neon](https://neon.tech), collez l'URL dans `DATABASE_URL`.
5. Déployez. Le site sera disponible sur `votre-projet.vercel.app`.
6. Ajoutez un nom de domaine personnalisé plus tard depuis les réglages
   Vercel, sans rien changer au code.

## 8. Ce qui reste à décider avant la mise en ligne

- Frais de placement : discutés uniquement sur WhatsApp (aucun module de
  paiement n'est construit, comme convenu).
- Témoignages : ajoutés manuellement par le staff via Prisma Studio ou un
  futur écran admin dédié — aucun formulaire public de soumission n'existe.
- Mentions légales : à compléter avec la raison sociale exacte et le numéro
  de registre de commerce.

## 9. Correctifs appliqués après revue de code

- Ajout du menu mobile (hamburger) dans `Header.tsx` — auparavant invisible sur téléphone.
- Correction du contraste du texte doré sur fond clair (passait de 2,25:1 à conforme WCAG) — passage au vert sur les fonds clairs, l'or reste réservé aux fonds verts foncés où le contraste est correct (5,17:1).
- Ajout d'un `<Suspense>` autour du formulaire `/demande` (requis par Next.js 14 pour `useSearchParams`, sinon le build échoue).
- Ajout du bouton "Voir le document" dans `/admin/candidats`, avec une nouvelle route API (`/api/admin/document`) qui génère un lien Cloudinary signé, valable 5 minutes, et journalise chaque consultation dans `AuditLog`.
- Ajout d'un envoi d'email (`src/lib/email.ts`, via Resend) au staff à chaque nouvelle demande ou candidature.
- Ajout d'un fichier de typage `next-auth.d.ts` pour un typage propre de `session.user.role`.
- Le middleware protège désormais aussi les routes `/api/admin/*`, en plus des pages `/admin/*`.
