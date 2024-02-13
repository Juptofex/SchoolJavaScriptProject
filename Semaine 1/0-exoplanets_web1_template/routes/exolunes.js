const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const listeexolunes = [];
    const dhtauri = {
      name: "DH Tauri"};
    const kepler409 = {
      name: "Kepler-409"};
    const wasp49 = {
      name: "WASP-49"};
    listeexolunes.push(dhtauri, kepler409, wasp49);
    const ddd = new Date();
    const date = "Nous sommes le " + ddd.getDate() + "/" + ddd.getMonth() + "/" + ddd.getFullYear();
    res.render('exolunes.hbs', {listeexolunes, date});
  
  });

module.exports = router;