const express = require('express');
const router = express.Router();
let id= 0;
function incr(i) {
  id++
  return id;
}
const trappist_1_d = {id : incr(id), uniqueName : "TRAPPIST-1-d", hClass : "Mésoplanète", discoveryYear : 2016, IST : "0,90", pClass : "Sous-terrienne chaude"}
const koi_1686_01 = {id : incr(id), uniqueName : "KOI-1686.01", hClass : "Mésoplanète", discoveryYear : 2011, IST : "0,89", pClass : "Super-terrienne chaude"}
const lhs_1723_b = {id : incr(id), uniqueName : "LHS 1723 b", hClass : "Mésoplanète", discoveryYear : 2017, IST : "0,89", pClass : "Super-terrienne chaude"}
let exop = [trappist_1_d, koi_1686_01, lhs_1723_b];
let same_exo='';

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

router.get('/exoplanetes', (req, res) => {
  res.render('exoplanetes.hbs', {exop, same_exo});
})

router.post('/exoplanetes/add',  function (req, res, next) {
  let exoplanete_x = {id : exop.length+1, uniqueName : req.body.ename, hClass : req.body.eclass, discoveryYear : req.body.eannee, IST : null, pClass : null}
  exop.push(exoplanete_x);
  res.redirect('/exoplanetes')
})

router.post('/exoplanetes/search', function(req, res, next) {
  same_exo='';
  let temp = '';
  let tempN = 0;
  for (let index = 0; index < exop.length; index++) {
    let n = 0;
    for(let i = 0; i < req.body.rech_exo.length; i++){
      if (req.body.rech_exo[i].match(/[a-z]/i) && req.body.rech_exo[i].toLowerCase()==exop[index].uniqueName[i].toLowerCase())
        n++
      if (req.body.rech_exo[i]==exop[index].uniqueName[i])
        n++
      if (n >= 3) {
        if (n > tempN) {
          tempN = n;
          temp = exop[index].uniqueName;
        }
      }
    }
  }
  same_exo = temp;
  res.redirect('/exoplanetes');
})

router.get('exoplanetes/details'), (req, res) => {

}

module.exports = router;
