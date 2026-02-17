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
    }
}
```
