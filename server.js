const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors')
const port = 3002; // Port sur lequel votre serveur écoutera

// Configuration de la connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'apigame',
  port: "3306", // port natif windows
});

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());
app.use(cors());

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});