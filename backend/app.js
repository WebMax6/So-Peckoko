const express = require('express'); // Importation package Express --> Framework Node.JS //
const bodyParser = require('body-parser'); // Importation package BodyParser --> Extrait Objet -> Format JSON//
const mongoose = require('mongoose'); //Importation package mongoose --> Connection Base de donnée (mongo DB) //
const path= require ('path'); //Importation package Path --> Fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires  // 
const helmet = require('helmet'); //Importation package helmet --> Sécurise App Express en définissant divers-en-têtes HTTP// OWASP //

const sauceRoutes = require('./routes/sauce'); //Importation ficher Routes/sauce.js //
const userRoutes = require('./routes/user'); //Importation ficher Routes/user.js //

const app = express(); //Utilisation Express //

app.use((req, res, next) => { // Middleware (CORS) //
  res.setHeader('Access-Control-Allow-Origin', '*'); // Accès depuis n'importe quel origine //
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Headers requête possible //
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Requête possible //
  next();
});

//Connection Base de donnée //
mongoose.connect('mongodb+srv://WebMax:1234@cluster0-1l7tk.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

mongoose.set('useCreateIndex', true);

app.use(helmet());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Application utilise Image //
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app; // Exportation pour le fichier server.js //