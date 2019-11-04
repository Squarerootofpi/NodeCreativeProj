var express = require('express');
var fs = require('fs');

var router = express.Router();
var request = require('request');

/* GET home page. */
//Have n error with headers: how do I get that off??
//how do I get the stuff from my index.html to do this stuff, instead of the vue object in my Script?
router.get('/', function (req, res, next) {
  res.sendFile('index.html', { root: 'public' });
  //res.render('index', { title: 'Express' });
  console.log("In the cities initial get");
  //console.log(req.query); //req.query is the query that they put after cities: like :4200/cities?dog=poodle
  //.log(req.query.q);
  // res.sendFile('index.html', { root: 'public' });
});

//Why  get and a getcity get?? They are different or something??
router.get('/getcity', function (req, res, next) {
  console.log("In getcity route");
  //Read the file:)
  fs.readFile(__dirname + '/cities.dat.txt', function (err, data) {
    if (err) throw err;
    console.log("inReadFileFunction");
    var myRe = new RegExp("^" + req.query.q);
    console.log(myRe);
    var jsonresult = [];
    var cities = data.toString().split("\n");
    //Grab the cities we want, then ship them into a json object
    for (var i = 0; i < cities.length; i++) {
      console.log(cities[i]);
      var result = cities[i].search(myRe);
      if (result != -1) {
        console.log(cities[i]);
        jsonresult.push({ city: cities[i] });
      }
    }
    console.log(jsonresult);
    res.status(200).json(jsonresult);
  });

});
//How does this get called sequentially so i cn get the info into the gets and responses?
//How does this get req.query? It's not defined in here, unless I pass it in?


router.get('/owl', function (req, res, next) {
  console.log("In the owl initial get");
  console.log(req.query, " is the req.query"); //req.query is the query that they put after cities: like :4200/cities?dog=poodle
  console.log(req.query.q, " is the req.query.q");
  if (req.query.q === undefined) {
    console.log("query is undefined, or none.")
    var failUrl = 'https://owlbot.info/api/v1/dictionary/' + "definition" + '?format=json';
    request(failUrl).pipe(res); //pipe is going to take the request etc, and pipe it a chunk at a time in response.
  }
  else {
    var owlurl = 'https://owlbot.info/api/v1/dictionary/' + req.query.q + '?format=json';
    console.log(owlurl);
    request(owlurl).pipe(res); //pipe is going to take the request etc, and pipe it a chunk at a time in response.
  }
});

module.exports = router;
