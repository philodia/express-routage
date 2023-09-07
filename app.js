const express = require('express');
   const moment = require('moment');
   const path = require('path'); // Importez le module path
   const app = express();
   const port = 3000;

   // Configuration du moteur de modèle EJS
   app.set('views', path.join(__dirname, 'views'));
   app.set('view engine', 'ejs');

   //Style.css
   app.use(express.static('public'));

   // Middleware personnalisé pour vérifier l'heure de la demande
   app.use((req, res, next) => {
     const now = moment();
     const dayOfWeek = now.day();
     const hourOfDay = now.hour();

     if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
       next(); // Continuez la demande si c'est pendant les heures ouvrables.
     } else {
       res.send('Nous sommes actuellement fermés en dehors des heures de travail.');
     }
   });

   // Routes
   app.get('/', (req, res) => {
     res.render('index', { title: 'Accueil' });
   });

   app.get('/services', (req, res) => {
     res.render('services', { title: 'Nos Services' });
   });

   app.get('/contact', (req, res) => {
     res.render('contact', { title: 'Contactez-nous' });
   });

   // Serveur d'express
   app.listen(port, () => {
     console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
   });