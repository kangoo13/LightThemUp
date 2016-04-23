# LightThemUp API

Installer Node JS, npm, mongodb

Faire un npm install pour installer les modules

Launch MongoDb
mongod --smallfiles --dbpath mongo/db/

Stop MongoDb
mongod --dbpath mongo/db/ --shutdown


Mongo-express pour Admin UI comme phpmyadmin

Au premier lancement de l'app, décommenter le code dans app.js dans db.once() pour créer les collections de MongoDB, puis commenter de nouveau une fois créer.

# DOCUMENTATION API

Quand il y a un :variable il faut que vous passiez la variable directement dans l'url.
# Utilisateurs

Création utilisateur:
  Url : /users
  Méthode : POST
  Paramètres:
              - "email" : Email de l'user à créer
              - "password" : Password de l'user à créer

Lister tous les utilisateurs:
  Url : /users
  Méthode : GET
  Paramètres: - Aucun

Supprimer un  utilisateur:
  Url : /users/:id
  Méthode : DELETE
  Paramètres:
              - ":id" : ID de l'user à delete
  Remarques: Pour supprimer un utilisateur, vous devez être loggé en tant que ce même utilisateur ou être admin.
