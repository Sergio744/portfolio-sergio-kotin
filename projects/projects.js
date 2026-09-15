/*
 * CATALOGUE DES PROJETS — SERGIO KOTIN
 *
 * Ce fichier est la seule source de vérité du portfolio pour les projets.
 * Pour ajouter, retirer ou déplacer un projet, modifie uniquement ce fichier.
 *
 * Les trois statuts sont volontairement séparés :
 * - production : produit déjà utilisé ou accessible en production ;
 * - development : produit en cours de construction ;
 * - future : idée, intention ou projet planifié.
 *
 * Conseil confidentialité : n’ajoute jamais ici de donnée personnelle,
 * de clé API, de mot de passe, de capture contenant des données internes
 * ou d’URL privée. Utilise des données fictives dans les images de démo.
 */

const projectCatalog = {
    production: {
        label: 'En production',
        shortLabel: 'Production',
        description: 'Produits déjà utilisables, livrés ou actuellement exploités.',
        projects: [
            {
                id: 'cefal-eval-engine',
                title: 'CeFAL Eval Engine',
                category: 'SaaS métier',
                status: 'En production',
                visibility: 'Référence CeFAL',
                summary: 'Plateforme d’évaluation et de gestion de workflows conçue dans le cadre d’une expérience professionnelle au CeFAL.',
                role: 'Conception, développement full-stack et intégration des besoins utilisateurs.',
                stack: ['SaaS', 'Full-Stack', 'Workflow'],
                proof: 'Version dédiée au CeFAL — version déployée',
                image: 'projects/assets/cefal-cover.svg',
                imageAlt: 'Schéma abstrait du CeFAL Eval Engine, plateforme de workflows et d’évaluation',
                publicUrl: '',
                publicUrlLabel: '',
                confidentiality: 'Version dédiée au CeFAL. Les éléments affichés ici décrivent le périmètre du projet sans exposer de données internes.'
            }
        ]
    },

    development: {
        label: 'En développement',
        shortLabel: 'Développement',
        description: 'Produits et systèmes actuellement construits, testés ou améliorés.',
        projects: [
            {
                id: 'grada',
                title: 'Grada',
                category: 'Produit grand public',
                status: 'En développement',
                visibility: 'Produit public en construction',
                summary: 'Plateforme moderne pour créer, diffuser et analyser des formulaires et évaluations en ligne, de la question à la décision.',
                role: 'Conception produit, UX/UI, architecture full-stack et développement du parcours auteur, participant et analyse.',
                stack: ['React', 'TypeScript', 'TanStack Start', 'Vite', 'Supabase'],
                proof: 'MVP en construction',
                image: 'projects/assets/grada-cover.jpeg',
                imageAlt: 'Aperçu de l’interface Grada pour créer et analyser des évaluations',
                publicUrl: 'https://gradaeval.lovable.app',
                publicUrlLabel: 'Voir la démo',
                confidentiality: 'Présentation basée sur une démo publique et des captures contrôlées. Vérifier les données et les droits d’usage des visuels avant toute nouvelle publication.'
            },
            {
                id: 'eh-os',
                title: 'EH - OS',
                category: 'Système patrimonial',
                status: 'En développement',
                visibility: 'Prototype public en construction',
                summary: 'Cockpit exécutif d’une holding connectée : une interface unique pour suivre le patrimoine, le cash-flow, les transactions et les décisions prioritaires.',
                role: 'Conception produit, architecture de l’expérience, dashboard exécutif desktop/mobile et hiérarchisation des informations décisionnelles.',
                stack: ['Next.js', 'TypeScript', 'Supabase / API', 'Responsive'],
                proof: 'Captures desktop et mobile de démonstration',
                image: 'projects/assets/ehos-dashboard.png',
                imageAlt: 'Dashboard exécutif EH-OS affichant des données de démonstration',
                publicUrl: '',
                publicUrlLabel: '',
                confidentiality: 'Les captures utilisent uniquement des données mockées et ne sont connectées à aucune source bancaire ou comptable réelle. Le projet est présenté comme prototype en construction.'
            }
        ]
    },

    future: {
        label: 'Future',
        shortLabel: 'Future',
        description: 'Idées et systèmes que Sergio souhaite explorer ou lancer plus tard.',
        projects: []
    }
};

/* Export global volontaire : le site reste statique et ne nécessite aucun bundler. */
window.projectCatalog = projectCatalog;
