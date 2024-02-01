const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index.hbs');
  console.log("No problem, everything is working well")
});

router.get('/exolunes', (req, res) => {
  let exolunes_list = ["DH Tauri", "Kepler-409", "WASP-49"];
  let date =  new Date().toDateString() ;
  let time = new Date().toTimeString();
  let dateAct = "Nous sommes le " + date + ". Il est "+ time + "à Bruxelles."
  res.render('exolunes.hbs', {dateAct : dateAct, exolist : exolunes_list});
})

router.get('/telescope', (req, res) => {
  //Can be done in another way (dictionnaries)
  /*Like this way : 
  let telescope = [];
  let spain = {name : 'Gran Telescopio Canarias', countries : 'Espagne', diameter : 10.4}
  let usa = {name : 'Keck 1', countries : 'Etats-Unis', diameter : 9.8}
  let japan = {name : 'Seimei', countries : 'Japon', diameter : 3.8}
  telescope.push(spain, usa, japan)
  */
  let table = [
    ['Gran Telescopio Canarias', 'Espagne', 10.4],
    ['Keck 1', 'Etats-Unis', 9.8],
    ['Seimei', 'Japon', 3.8]
  ];
  let errorMess = 'Il faut au minimum 3 téléscope dans le tableau';
  if (table.length<3) {
    res.render('telescope.hbs', {teleTable : table, error : errorMess});
  } else {
    res.render('telescope.hbs', {teleTable : table});
  }
})

module.exports = router;
