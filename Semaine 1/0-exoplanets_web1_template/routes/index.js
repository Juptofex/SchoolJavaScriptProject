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

module.exports = router;
