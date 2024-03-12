const express = require('express');
const router = express.Router();
const Exoplanet = require("../models/Exoplanet.js");
const multer = require ('multer');
const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, 'public/images');
},
filename: function (req, file, cb) {
const date = new Date();
const uniquePrefix = date.getFullYear() + '-' + (date.getMonth() + 1) +
'-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() +
44
'-' + date.getSeconds();
cb(null, uniquePrefix + '-' + file.originalname);
}
})
const upload = multer({ storage: storage });
const validator = require ('validator');

router.get('/', (req, res) => {
  res.render('exoplanets/exoplanets.hbs', { listeExoplanetes: Exoplanet.list(),errors : req.query.errors});
});

router.post('/add', upload.single('imageEx'), (req, res) => {
  if (!validator.isLength(req.body.name, 3, 100)) {
    // errors sent via query string
    res.redirect('/exoplanets?errors=Le nom d’une exoplanète doit avoir au minimum 3 caractères et maximum 100 caractères');
  }
  else {
    if (req.file) {
      Exoplanet.add(req.body.name, req.body.hClass, req.body.year, req.file.filename);
    }
    else {
      Exoplanet.add(req.body.name, req.body.hClass, req.body.year, 'No_image_available.png');
    }
    res.redirect('/exoplanets');
  }
});
router.get('/search', (req, res) => {
  const searchResult = Exoplanet.search(req.query.name);
  const erM = "Aucune exoplanète trouvée";
  if(searchResult.length<1) {
    res.render('exoplanets/exoplanets.hbs', {erM});
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

router.post('/delete', (req, res) => {
  Exoplanet.delete(req.body.id);
  res.redirect('/exoplanets');
});

router.post('/filter/hclass', (req, res) => {
  const filter = Exoplanet.filterClass(req.body.hClassFilter);
  res.render('exoplanets/exoplanets.hbs', {listeExoplanetes: filter});
});

router.post('/filter/year', (req, res) => {
  const filter = Exoplanet.filterYear(req.body.yearFilter);
  res.render('exoplanets/exoplanets.hbs', {listeExoplanetes: filter});
});

module.exports = router;