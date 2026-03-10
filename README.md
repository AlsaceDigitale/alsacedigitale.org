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
