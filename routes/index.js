var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var Parser = require("xml-node").XmlParser;
var fs =require('fs'); 
var convert = require('xml-js');
var xml = require('xml');
let listOfComments = [];



/* GET home page. */
router.get('/', function(req, res, next) {
  listOfComments = [];

  let filePath = './public/healthfiles/health.xml';
  fs.readFile( filePath, 'utf8', function(err, data) {
    //var result = convert.xml2json(data, {compact: true, spaces: 4});
    //res.json(result);
    parseString(data, function (err, result) {
      //console.log(result.report.assessment[0].node[0].$.code);
      //console.log(result.report.assessment[0].node.length);
      for(let i=0; i<result.report.assessment[0].node.length; i++){
        if(result.report.assessment[0].node[i].$.code == "generic"){
          console.log(result.report.assessment[0].node[i].node.length);
          for(let j =0; j<result.report.assessment[0].node[i].node.length; j++){
            if(result.report.assessment[0].node[i].node[j].$['comment-date'])
            console.log(result.report.assessment[0].node[i].node[j].$['comment-date']);
            if(result.report.assessment[0].node[i].node[j].node){
              for(let k = 0; k<result.report.assessment[0].node[i].node[j].node.length; k++){
                if(result.report.assessment[0].node[i].node[j].node[k].$['comment-date'])
                {
                  let commentData = {
                    commentDate : '',
                    comment : ''
                  }
                   commentData.commentDate = result.report.assessment[0].node[i].node[j].node[k].$['comment-date'];
                   commentData.comment = result.report.assessment[0].node[i].node[j].node[k].$.comment;
                  //listOfComments.push(result.report.assessment[0].node[i].node[j].node[k].$.comment)
                  listOfComments.push(commentData)

                  //console.log(result.report.assessment[0].node[i].node[j].node[k].$.comment)
                }
        
              }
            }
          }


        }
      }
      console.log(listOfComments);
      res.render('index', { listOfComments: listOfComments });
      //res.json(result);
        });
    // res.set('Content-Type', 'text/plain');
    // res.send(xml(data));
  });
  // console.log(listOfComments);
  // res.render('index', { listOfComments: listOfComments });
});

router.get('/facebook', function(req, res, next) {
  res.json('Post on facebook.')

});

module.exports = router;
