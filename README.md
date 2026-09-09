# Alsacedigitale.org

## Statut du projet

Ce site est en phase de fin de vie et sera remplace prochainement.
Les evolutions fonctionnelles et les migrations majeures de dependances ne sont plus prioritaires.
Les mises a jour automatiques Dependabot sont desactivees pour limiter le risque de regression pendant cette phase.

## Prérequis

Tout le développement peut se faire localement grâce à [Tilt](https://tilt.dev/)


## Environnement de développement

`tilt up`

et voilà vous pouvez modifier le code localement

Le site se recharge tout seul lors d'une modification

## Déploiement

Le déploiement de production de `www.alsacedigitale.org` passe par l'application Scalingo `alsace-digitale`.

Workflow normal :

1. ouvrir une PR vers `master` pour faire valider le changement ;
2. merger la PR dans `master` ;
3. fast-forward la branche `prod` sur le commit validé ;
4. pousser `prod` sur GitHub ;
5. laisser Scalingo déclencher le déploiement automatique depuis la branche `prod`.

Points importants :

- la production se déploie depuis `prod`, pas depuis `master` ;
- ne pas lancer de déploiement manuel en production sans validation explicite ;
- vérifier après push sur `prod` que le déploiement Scalingo est bien parti et que le site public sert le changement attendu ;
- ce dépôt est public : ne jamais committer de secrets, tokens, mots de passe, dumps d'environnement ou captures contenant des données sensibles.

Exemple de mise à jour de `prod` après merge validé :

```bash
git fetch origin
git checkout prod
git merge --ff-only origin/master
git push origin prod
```

## Configuration

### URL d'adhésion

L'URL d'adhésion est configurable via la variable d'environnement `ADHESION_URL`.

Si elle n'est pas définie, le site utilise par défaut la campagne HelloAsso 2026 :

`https://www.helloasso.com/associations/alsace-digitale/adhesions/membre-alsace-digitale-2026`

Cette valeur est utilisée :

- pour les liens d'adhésion affichés sur la page d'accueil ;
- pour la redirection `GET /adhesion`.

### Redirection

La redirection se configure dans le fichier `routes/redirects.json`

#### Redirection simple

```json
{
    "/cassini-embed": {
        "url": "http://neverssl.com/",
        "method": "embed",
        "delay": 0.5,
        "description": "Welcome to the 2025 Cassini Hackathon in Strasbourg!",
        "keywords": "Cassini, hackathon, Strasbourg, 2025"
    },
    "/cassini-refresh": {
        "url": "http://neverssl.com/",
        "method": "meta-refresh",
        "delay": 0.5,
        "description": "Welcome to the 2025 Cassini Hackathon in Strasbourg!",
        "keywords": "Cassini, hackathon, Strasbourg, 2025"
    },
    "/cassini-redirect": {
        "url": "http://neverssl.com/",
        "method": "redirect",
        "code": 302
    },
    "/adhesion": {
        "method": "redirect",
        "code": 302,
        "urlEnv": "ADHESION_URL",
        "urlConfig": "adhesionUrl"
    }
}
```

Le champ `urlEnv` permet de lire une URL depuis une variable d'environnement.
Le champ `urlConfig` permet d'utiliser la valeur exposée par `config.js` comme repli si la variable n'est pas définie.

Pour une route `embed`, les champs `canonicalUrl`, `image`, `imageAlt`, `imageType`, `imageWidth`, `imageHeight`, `siteName` et `locale` permettent de renseigner les métadonnées de partage Open Graph et Twitter. Le champ `schema` peut contenir les données JSON-LD de la page, par exemple les informations structurées d'un événement. `canonicalUrl` doit être l'URL publique de la page d'Alsace Digitale, et `image` une URL absolue accessible par les robots des réseaux sociaux.

### Bandeau d'annonce (banner)

Le site peut afficher un bandeau fixe en haut de page (ex. promotion d'un évènement), configuré dans `routes/banner.json` :

```json
{
    "enabled": true,
    "icon": "icon-rocket",
    "highlight": "RobotKraft 2026",
    "text": " — Challenge de robotique & IA à Strasbourg, du 2 au 4 octobre.",
    "ctaLabel": "Je découvre",
    "ctaUrl": "/robotkraft",
    "dismissKey": "ad-robotkraft-banner-dismissed-v1"
}
```

- `enabled` : `false` masque complètement le bandeau (aucun DOM généré).
- `icon` : classe de l'iconfont du site (voir `public/css/font-awesome.min.css`, ex. `icon-rocket`), optionnelle.
- `highlight` : texte mis en avant en gras (doré), optionnel.
- `text` : texte du message, affiché après `highlight`.
- `ctaLabel` / `ctaUrl` : libellé et lien du bouton d'action ; si `ctaUrl` est absent, le bouton n'est pas affiché.
- `dismissKey` : clé `localStorage` utilisée pour retenir la fermeture du bandeau par l'internaute. **Changer cette valeur** à chaque nouvelle campagne pour que le bandeau réapparaisse même chez les visiteurs ayant fermé une précédente version.

Le bandeau est injecté dans `views/layout.pug` et n'apparaît que sur les pages qui utilisent ce layout (page d'accueil, redirections `embed`/`meta-refresh`, etc. — voir `routes/redirect.js`). Les anciennes pages `work/:id` (`barcamp-alsace`, `hacksxb`, ...) n'étendent pas `layout.pug` et n'affichent donc jamais le bandeau.

Après modification de `routes/banner.json`, redémarrer le serveur (le fichier est chargé une seule fois au démarrage, comme `routes/redirects.json`).
