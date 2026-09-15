# Portfolo — Sergio KOTIN

Portfolio statique de Sergio KOTIN, positionné comme **Agentic Engineer**, architecte IA et développeur full-stack.

## Fichiers

- `index.html` contient la structure et les contenus éditoriaux.
- `style.css` contient le design system, les animations et le responsive.
- `script.js` contient le menu mobile, les modales d’études de cas, le scroll reveal et le formulaire mailto.
- `favicon.svg`, `site.webmanifest` et `robots.txt` fournissent les finitions de publication.

## Lancement local

Le projet ne nécessite aucune installation. Ouvrir `index.html` dans un navigateur suffit. Pour un serveur local avec Python :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Déploiement gratuit

Le site est compatible avec GitHub Pages, Netlify, Cloudflare Pages ou tout hébergement de fichiers statiques. Aucune clé API et aucun backend ne sont nécessaires pour la version actuelle.

## Personnalisation prioritaire

Remplacer les descriptions de prototypes par les projets réels de Sergio, ajouter les liens GitHub et démos, remplacer les métriques de démonstration par des métriques vérifiables et compléter les URLs Open Graph lorsque le domaine final sera connu.

Le formulaire utilise Netlify Forms avec un honeypot anti-spam et une page de confirmation. Les soumissions sont consultables dans le projet Netlify.

## Contrôles effectués

La syntaxe JavaScript est validée avec `node --check`. Le HTML a été contrôlé pour les IDs dupliqués, les ancres internes cassées, les labels de formulaire manquants et les images sans texte alternatif. Le rendu a été inspecté en desktop et à 390 px de large.

## Formulaire

Le formulaire porte le nom Netlify `contact` et redirige vers `merci.html` après soumission.

## Publication

Le paquet public doit être généré par liste blanche et ne doit contenir aucun fichier `.bak`, `.log`, export temporaire ou document interne. Vérifier le catalogue et exécuter `python3 checks/validate_portfolio.py` avant chaque publication.
