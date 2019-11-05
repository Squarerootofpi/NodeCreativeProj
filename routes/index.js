var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

/* GET jokes. */
router.get('/getjokes', function(req, res, next) {
    console.log("in 'getjoke' endpoint")
    fs.readFile(__dirname + '/jokes.txt', function(err, data) {
        if (err) throw err;
        var jokes = data.toString().split("\n");
        for (var i = 0; i < jokes.length; i++) {
            console.log(jokes[i]);
        }
        res.status(200).json(jokes);
    });
});

module.exports = router;
