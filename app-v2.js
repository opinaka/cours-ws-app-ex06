const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const app = express();

const swaggerDocument = require('./doc-api-swagger.json'); // Chemin vers votre fichier JSON

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());


// Personnalisation du rendu de Swagger UI
const swaggerOptions = {
  customCss: `
    .swagger-ui .topbar {
      background-image: url('https://raw.githubusercontent.com/opinaka/cours-ws-app-ex06/main/ynov.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      height: 50px; /* Ajustez la hauteur en fonction de votre logo */
    }

    .swagger-ui .topbar .link {
      display: none; /* Masquer le logo Swagger par défaut */
    }
  `,
  customSiteTitle: "Opinaka",
  customfavIcon: "https://raw.githubusercontent.com/opinaka/cours-ws-app-ex06/main/ynov.png"
};
// Servez la documentation Swagger UI à partir du fichier JSON
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// Déclaration et initialisation de la liste receivedMessages
let receivedMessages = [];

// Route pour recevoir les messages (payload) du serveur de webhooks
app.post('/webhooks', (req, res) => {
  // Récupérer la valeur envoyée par le serveur
  const newMessage = req.body;

  // Enregistrer la valeur dans la liste
  receivedMessages.push(newMessage);

  console.log(newMessage);
  // Répondre pour confirmer la réception du message
  res.json({ message: 'Valeur reçue avec succès' });
});


// Route pour obtenir toutes les messages reçues
app.get('/webhooks', (req, res) => {
  // Répondre avec toutes les valeurs reçues
  res.json(receivedMessages);
});

// Démarrer le serveur sur le port de votre choix
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur écoutant sur le port ${PORT}`);
});
