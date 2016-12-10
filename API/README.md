# LightThemUp API

## Installation

Installer Node JS et NPM sur votre machine.
  Faire un npm install pour installer les modules (npm install)

Installer forever :
  npm install -g forever

## Documentation

La documentation des routes / méthodes de l'API est consultable depuis :
http://lightthemup.fr.nf:3000/apiDoc

CLI pour générer la documentation de l'API (se placer à la racine du dossier API) :
  apidoc -i router/routes/api/ -o apidoc/

## Démarrer l'API
Pour lancer l'api dans le terminal (se placer à la racine du dossier API) :
  forever -o out.log -e err.log app.js

En tant que daemon :
  forever start -o out.log -e err.log app.js
