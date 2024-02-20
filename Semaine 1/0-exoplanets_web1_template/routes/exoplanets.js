const express = require('express');
const router = express.Router();

const Exoplanet = require("../models/Exoplanet.js");

let searchResult=null;

router.get('/', (req, res) => {
  res.render('exoplanets/exoplanets.hbs', { listeExoplanetes: Exoplanet.list()});
});

router.post('/add', (req, res) => {
  Exoplanet.add(req.body.name, req.body.hClass, req.body.year);
  res.redirect('/exoplanets');
});
router.get('/search', (req, res) => {
  searchResult = Exoplanet.search(req.query.name);
  const erM = "Aucune exoplanète trouvée";
  if(searchResult.length<1) {
    res.render('exoplanets/exoplanets.hbs', {erM})
  }
  res.render('exoplanets/exoplanets.hbs', {listeExoplanetes: searchResult});
});

router.get('/details', (req, res) => {
  let errorType = null;
  const id = parseInt(req.query.id);
  if (isNaN(id)) {
      errorType = "entier";
      res.render('error.hbs', { message: "Erreur l'id n'est pas un entier", errorType: errorType });
      return;
  }
  const details = Exoplanet.findById(id);
  if (details !== null) {
      res.render('exoplanets/exoplanets.hbs', { details });
  } 
  else {
      errorType = "inexistant"; // i'm not actually using it, since I just use an else in the error.hbs
      res.render('error.hbs', { message: "Aucune Exoplanète correspondante à cet ID !", errorType: errorType });
  }
});

router.get('/delete', (req, res) => {
  
})

module.exports = router;