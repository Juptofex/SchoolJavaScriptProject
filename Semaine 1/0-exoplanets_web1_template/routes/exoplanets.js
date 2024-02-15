const express = require('express');
const router = express.Router();

const Exoplanet = require("../models/Exoplanet.js");
const listeExoplanetes = Exoplanet.list();

let searchResult;

router.get('/', (req, res) => {
  res.render('exoplanets/exoplanets.hbs', { listeExoplanetes, searchResult});
});

router.post('/add', (req, res) => {
  Exoplanet.add(req.body.name, req.body.hClass, req.body.year);
  res.redirect('/exoplanets');
});
router.get('/search', (req, res) => {
  searchResult = Exoplanet.search(req.query.name);
  res.redirect('/exoplanets');
});

router.get('/details', (req, res) => {
  let errorType = null;
  let id = parseInt(req.query.id);
  if (isNaN(id)) {
      errorType = "entier";
      res.render('error.hbs', { message: "Erreur l'id n'est pas un entier", errorType: errorType });
      return;
  }
  details = Exoplanet.findById(id);
  if (details !== null) {
      res.render('exoplanets/exoplanets.hbs', { details });
  } else {
      errorType = "inexistant"; // i'm not actually using it, since I just use an else in the error.hbs
      res.render('error.hbs', { message: "Aucune Exoplanète correspondante à cet ID !", errorType: errorType });
  }
});

module.exports = router;