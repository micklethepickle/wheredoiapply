var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var unis = mongoose.model('unis', 
		{name : String,
			//E : Number
		 	law : Number,
		 	accounting :Number,
		 	cs : Number,
		 	commerce : Number,
			 business : Number,
			 ee : Number,
			 management : Number,
			 med : Number,
			 health : Number,
			 se : Number,
			 physical : Number,
			 dent: Number,
			 mecheng: Number});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CHOOSE YOUR FIELD' });
});
/* GET findUnis page*/
router.get('/findUnis', function(req, res, next) {
  res.render('findUnis', { title: 'CHOOSE YOUR FIELD' });
});

/*Get availableUnis page
router.get('/availableUnis', function(req, res) {
	var db = req.db;
	var theGrade = db.get('rscore');
	theGrade.find({},{},function(e,docs){
		res.render('availableUnis', {
			"availableUnis" : docs
		});
	});
});
*/


/* POST availableUnis page */
router.post('/availableUnis', function(req, res) {
	var aUnis = [];
	var db = req.db;
	var program = req.body.program;
	var rScore = req.body.grade;
		unis.find(function(err,uni) {
			if (err) return console.error(err);
			for (var i in uni){
				console.log("TRUE");

				if (rScore > uni[i][program]){
					console.log(uni[i][program])
					aUnis.push(uni[i].name);
				};
			};
		console.log(aUnis);
		res.render('availableUnis', {"availableUnis": aUnis});
		});

	/*uni.find(function(err, uni) {
		if (err) return console.error(err);
 		for (var i in universities){
 			if (rScore > universities[i].E){
 				aUnis.push(universities[i].name)
 			};
  		};
  	console.log(aUnis);
  	res.render('availableUnis', {"availableUnis": aUnis});
	});
	*/
	/*var universities = [
		["McGill", 30.41],
		["Concordia", 26.2],
		["Polytechnique", 28]
	];*/
})


module.exports = router;
