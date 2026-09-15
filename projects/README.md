# Guide du catalogue projets

Le portfolio est alimenté par `projects.js`. Les fichiers de statut servent de guides de rédaction et de modèles de référence. Ils ne sont pas chargés par le navigateur.

## Règle de rédaction

Chaque projet doit être décrit avec des faits simples et vérifiables. Explique d’abord le problème, puis la solution, ta contribution et l’état réel du produit. Ne présente jamais une idée comme une fonctionnalité livrée et ne publie aucune donnée confidentielle.

## Champs à compléter dans `projects.js`

| Champ | Ce qu’il faut écrire |
|---|---|
| `id` | Identifiant court, unique, en minuscules avec des tirets |
| `title` | Nom public du projet |
| `category` | Type de produit ou domaine |
| `status` | `En production`, `En développement` ou `Future` |
| `visibility` | Niveau de publication autorisé |
| `summary` | Problème résolu et valeur apportée, en deux phrases maximum |
| `role` | Ce que Sergio a réellement conçu ou développé |
| `stack` | Technologies ou capacités réellement utilisées |
| `proof` | Preuve disponible : démo, prototype, utilisateurs, capture ou dépôt |
| `image` | Chemin vers une image publique, sinon chaîne vide |
| `publicUrl` | URL publique validée, sinon chaîne vide |
| `confidentiality` | Limites de publication ou mention d’anonymisation |

## Checklist avant publication

1. Le statut correspond à la réalité actuelle.
2. Le nom, le logo et les captures peuvent être publiés.
3. Les données de démonstration sont fictives ou publiques.
4. Aucun secret, identifiant, endpoint privé ou document interne n’apparaît.
5. Les métriques affichées sont mesurées et vérifiables.
6. Le lien public fonctionne sans exposer d’espace privé.
7. La description précise le rôle de Sergio sans attribuer à tort le travail d’une équipe entière.
