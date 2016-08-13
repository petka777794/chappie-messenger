var express = require('express');
var router = express.Router();
/* GET home page. */
var log = require('../libs/log')(module);


router.get('/', function(req, res, next) {
	res.render('index', { 
			title: 'Chappie messenger', 
		});
});

router.get('/chat', function(req, res, next) {
	res.redirect('/');
});

router.get('/sing-in', function(req, res, next) {
	res.redirect('/');
});

module.exports = router;
