var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var Parser = require("xml-node").XmlParser;
var fs =require('fs'); 
var convert = require('xml-js');
var xml = require('xml');
let listOfComments = [];



router.get('/', function(req, res, next) {
  listOfComments = [];

  let filePath = './public/healthfiles/health.xml';
  fs.readFile( filePath, 'utf8', function(err, data) {
    parseString(data, function (err, result) {

      for(let i=0; i<result.report.assessment[0].node.length; i++){
        if(result.report.assessment[0].node[i].$.code == "generic"){
          for(let j =0; j<result.report.assessment[0].node[i].node.length; j++){
            if(result.report.assessment[0].node[i].node[j].$['comment-date'])
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
                  listOfComments.push(commentData)

                }
        
              }
            }
          }


        }
      }
      res.render('index', { listOfComments: listOfComments });
      //res.json(result);
        });
    // res.set('Content-Type', 'text/plain');
    // res.send(xml(data));
  });
  // console.log(listOfComments);
  // res.render('index', { listOfComments: listOfComments });
});



module.exports = router;
