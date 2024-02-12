# Import des anciennes données

Tout se passe dans le répertoire `packages/api/scripts`.

1. Se connecter sur pma.inpt.fr
1. Récupérer un export de la bdd "portail" contenant au moins les tables `auth_user`, `club_club`, `portailuser_logentry`
1. Le sauvegarder en `data.json`
1. récupérer un export de la bdd "cas" contenant au moins la tabe `auth_user`
1. Le sauvegarder en `cas-data.json`
1. Se connecter sur dnepr
1. `slapcat > dump.ldif`
1. Récupérer le .ldif (par scp) en `dump-ldap.ldif`
1. `./ldif-to-json.py` (installer avec pip: ldif et parse)
1. `yarn migrate-old-data`