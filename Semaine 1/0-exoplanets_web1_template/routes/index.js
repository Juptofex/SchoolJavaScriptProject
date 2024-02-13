const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index.hbs');
});

router.get('/telescopes', (req, res) => {
  
  const listetelescopes = [];
  const grantelescopio = {
    name: "Gran Telescopio Canarias",
    location: "Espagne",
    size: "10.4"};
  const keck1 = {
    name: "Keck 1",
    location: "Etats-Unis",
    size: "9.8"
  };
  const seimei = {
    name: "Seimei",
    location: "Japon",
    size: "3.8"};
  const qqch = [];
  const txt = { txt: "Il faut au minimum 3 télescopes dans le tableau" };
  const nbrDeTelescopes = 3;
  if (nbrDeTelescopes < 3) {
    listetelescopes.push(grantelescopio, keck1);
    qqch.push(txt);
  }
  else {
    listetelescopes.push(grantelescopio, keck1, seimei);
  };
  res.render('telescopes.hbs', { listetelescopes, qqch });

});

const messageForum=[];

router.get('/forum', (req, res) => {
  console.log(messageForum);
  res.render('forum.hbs', {messageForum});
});

router.post('/forum/msg', (req, res) => {
  const messageA= {message : req.body.msg, auteur : req.body.auteur};
  console.log(messageA);
  messageForum.push(messageA);
  console.log(messageForum);
  res.redirect('/forum');
});
module.exports = router;