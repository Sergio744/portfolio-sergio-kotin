# Portfolio — Sergio Kotin

Portfolio personnel de **Sergio Kotin** (Ingénieur logiciel & Consultant IA), développé avec **Next.js 16**, **React 19**, **Tailwind CSS v4**, **Three.js (React Three Fiber)**, **GSAP**, **Framer Motion** et **Lenis**, avec support bilingue **FR / EN** et export statique pour **GitHub Pages**.

## Développement local

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Scripts disponibles

- `npm run dev` — lance le serveur de développement Next.js.
- `npm run build` — génère l’export statique dans le dossier `out/`.
- `npm run typecheck` — vérifie les types TypeScript (`tsc --noEmit`).
- `npm run lint` — exécute ESLint.

## Déploiement sur GitHub Pages

Le déploiement est automatisé via GitHub Actions (`.github/workflows/deploy.yml`) à chaque push sur la branche `main` :

1. Dans GitHub, ouvrir **Settings → Pages**.
2. Sous **Build and deployment → Source**, sélectionner **GitHub Actions**.
3. Le workflow construit l’export statique avec le `base_path` détecté automatiquement par `actions/configure-pages` (compatible à la fois avec `https://sergio744.github.io/portfolio-sergio-kotin/` et avec un domaine personnalisé éventuel).

*(Remarque : pour un compte GitHub gratuit, le dépôt doit être **public** afin d’activer GitHub Pages.)*
