var express 	= require('express');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');

router.get('/', function(req, res){
	
	res.render('register/register');
});

router.post('/', function(req, res){
		
		var user ={
			username: req.body.username,
            password: req.body.password,
            type: req.body.type
		};

		userModel.insert(user, function(status){
			if(status){
				res.redirect('/login');
			}else{
				res.render('register/register');
			}
		});
});

module.exports = router;