const express = require('express');
const router = express.Router();

const Exoplanet = require("../models/Exoplanet.js");
const listeExoplanetes = Exoplanet.list();

let searchResult;
let errM=null;
let exoplanetFound;
let id_error;

router.get('/', (req, res) => {
  res.render('exoplanets.hbs', { listeExoplanetes, searchResult, exoplanetFound});
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
  let rep = Exoplanet.details(req.query.id);
  exoplanetFound = rep.planet;
  id_error = rep.err; 
  if (id_error!==null) {
    res.redirect('/exoplanets');
  } else {
    res.render('error.hbs', {errorType : id_error})
  }
});

module.exports = router;