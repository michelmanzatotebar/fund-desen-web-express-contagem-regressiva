var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  let dataDiaDosNamorados = new Date(anoAtual, 5, 12, 0, 0, 0);

  if (dataAtual > dataDiaDosNamorados) {
    dataDiaDosNamorados = new Date(anoAtual + 1, 5, 12, 0, 0, 0);
  }

  console.log(dataAtual);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.json({
    "usuario": "michel",
    "Data atual": dataAtual,
    "Data dia dos namorados": dataDiaDosNamorados,
  })
});

module.exports = router;
