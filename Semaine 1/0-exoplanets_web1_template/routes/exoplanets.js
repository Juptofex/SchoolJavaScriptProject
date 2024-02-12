const express = require('express');
const router = express.Router();

const Exoplanet = require("../models/Exoplanet.js");

const listeExoplanetes = Exoplanet.list();
const trappist = { id: 1, name: "TRAPPIST-1", hClass: "Mésoplanète", year: "2016", IST : "0,90", pClass : "Sous-terrienne chaude" };
const koi = { id: 2, name: "KOI-1686.01", hClass: "Mésoplanète", year: "2011", IST : "0,89", pClass : "Super-terrienne chaude" };
const lhs = { id: 3 , name: "LHS 1723 b", hClass: "Mésoplanète", year: "2017", IST : "0,89", pClass : "Super-terrienne chaude" };
Exoplanet.add(trappist);
Exoplanet.add(koi);
Exoplanet.add(lhs);

let searchResult = null;
let searched = false;
router.get('/', (req, res) => {
  const found = searchResult !== null;
  res.render('exoplanets.hbs', { listeExoplanetes, searchResult, found, searched});
});

router.post('/add', (req, res) => {
  const newExoplanet = {
    id: listeExoplanetes.length + 1,
    name: req.body.name,
    hClass: req.body.hClass,
    year: req.body.year
  };
  Exoplanet.add(newExoplanet);
  res.redirect('/exoplanets');
});
router.get('/search', (req, res) => {
  searchResult = null;
  searched = false;
  if (req.query.name) {
    searched = true;
    for (const planet of listeExoplanetes) {
      if(planet.name.toLocaleLowerCase().startsWith(req.query.name.toLocaleLowerCase())){  
        console.log("trouvé");
        const found = planet;
        searchResult = planet.name;
        break;
      }
    }
  }
  res.redirect('/exoplanets');
});

router.get('/details', (req, res) => {
  let errorType = null;
  const id = parseInt(req.query.id);
  if (isNaN(id)) {
    errorType = "entier";
    res.render('error.hbs', {message: "Erreur l'id n'est pas un entier", errorType: errorType});
  } 
  else {
    let found = false;
    let details = null;
    for (const planet of listeExoplanetes) {
      if (planet.id === id) {
        found = true;
        details = planet;
        break;
      }
    }
    if (found) {
      res.render('exoplanets.hbs', {details: details, found: true});
    } 
    else {
      errorType = "inexistant"; // i'm not actually using it, since I just use an else in the error.hbs
      res.render('error.hbs', {message: "Aucune Exoplanète correspondante à cet ID !", errorType: errorType});
    }
  }
});

module.exports = router;