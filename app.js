const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Liste pour enregistrer les valeurs reçues
const receivedMessages = [];
/**
 * @swagger
 * tags:
 *   name: Webhooks
 *   description: API pour gérer les webhooks
 */

/**
 * @swagger
 * /webhooks:
 *   post:
 *     summary: Enregistrer un nouveau message
 *     description: Enregistre un nouveau message dans la liste des messages reçus via un webhook
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valeur:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Message enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
// Route pour recevoir les valeurs du serveur de webhooks
app.post('/webhooks', (req, res) => {
  // Récupérer la valeur envoyée par le serveur
  const newMessage = req.body;

  // Enregistrer la valeur dans la liste
  receivedMessages.push(newMessage);

  console.log(newMessage);
  // Répondre pour confirmer la réception de la valeur
  res.json({ message: 'Valeur reçue avec succès' });
});
/**
 * @swagger
 * /webhooks:
 *   get:
 *     summary: Obtenir tous les messages reçus
 *     description: Récupère tous les messages enregistrés dans la liste des messages reçus via les webhooks
 *     responses:
 *       '200':
 *         description: Liste de messages récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
// Route pour obtenir toutes les valeurs reçues
app.get('/webhooks', (req, res) => {
  // Répondre avec toutes les valeurs reçues
  res.json(receivedMessages);
});

// Configuration de Swagger
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Webhook endpoint',
      version: '1.0.0',
      description: 'My REST API',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['server2.js'],
};

const specs = swaggerJsdoc(options);

// Personnalisation du rendu de Swagger UI
const swaggerOptions = {
  customCss: `
    .swagger-ui .topbar {
      background-image: url('https://www.wemaik.com/wp-content/themes/wemaik/images/logo-wemaik_invers.png');
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
  customfavIcon: "https://www.wemaik.com/wp-content/themes/wemaik/images/logo-wemaik_invers.png"
};


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

// Démarrer le serveur sur le port de votre choix
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur écoutant sur le port ${PORT}`);
});
