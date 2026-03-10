# AGENTS.md

Ce dépôt est public. Aucune information sensible ne doit être ajoutée dans le code, la documentation, les commits, les PR, les logs copiés dans le repo, ni les captures d'écran versionnées.

## Déploiement

- La production de `www.alsacedigitale.org` est déployée par Scalingo depuis la branche `prod`.
- `master` sert à intégrer les changements validés.
- Pour déployer, faire un fast-forward de `prod` vers le commit validé puis pousser `prod`.
- Ne pas déclencher de déploiement manuel en production sans accord explicite.

## Règles de contribution agent

- Ne jamais exposer de secrets, variables d'environnement, clés d'API, tokens, credentials SMTP ou sorties de commandes contenant ces valeurs.
- Si une commande affiche des données sensibles, les résumer sans recopier les valeurs.
- Ne pas modifier l'infrastructure ou le workflow de déploiement sans demande explicite.
- Avant toute action de production, vérifier la branche cible et confirmer que le flux normal passe bien par `prod`.
- Préférer les changements minimaux et compatibles avec la phase de fin de vie du projet.
