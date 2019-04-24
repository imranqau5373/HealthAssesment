var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var Parser = require("xml-node").XmlParser;
var fs =require('fs'); 
var convert = require('xml-js');
var xml = require('xml');



/* GET home page. */
router.get('/', function(req, res, next) {
  let filePath = './public/healthfiles/health.xml';
  fs.readFile( filePath, 'utf8', function(err, data) {
    //var result = convert.xml2json(data, {compact: true, spaces: 4});
    //res.json(result);
    // parseString(data, function (err, result) {
    //   console.log(result);
    //   //res.json(result);
    //     });
    res.set('Content-Type', 'text/plain');
    res.send(xml(data));
  });
  //res.render('index', { title: 'Express' });
});

router.get('/facebook', function(req, res, next) {
  res.json('Post on facebook.')

});

module.exports = router;
