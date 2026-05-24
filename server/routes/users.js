var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  data = new Date();
  console.log(data);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.json({
    "usuario": "michel",
    "Data atual": data,
  })
  
});

module.exports = router;
