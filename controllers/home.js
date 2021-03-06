var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
var bookModel   = require.main.require('./models/book-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getByUname(req.cookies['username'], function(result){
			res.render('home/index', {user: result});
		});
	}else{
		res.redirect('/logout');
	}
});

router.get('/alluser', function(req, res){
	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
})



router.get('/edit/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
})

router.post('/edit/:id', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		id: req.params.id
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/edit/'+req.params.id);
		}
	});
})


router.get('/delete/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});
})

router.post('/delete/:id', function(req, res){
	
	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/delete/'+req.params.id);
		}
	});
})

router.get('/view_books', function(req, res){
	bookModel.getAllBooks(function(results){
		if(results.length > 0){
			res.render('home/view_books', {booklist: results});
		}else{
			res.send('invalid database connection');
		}
	});
})

router.get('/update/:id', function(req, res){
	
	bookModel.getById(req.params.id, function(result){
		res.render('home/update', {book: result});
	});
})

router.post('/update/:id', function(req, res){
	
	var book = {
		name: req.body.name,
		category: req.body.category,
		author_name: req.body.author_name,
		price: req.body.price,
		discription: req.body.discription,
		id: req.params.id
	};

	bookModel.update(book, function(status){
		if(status){
			res.redirect('/home/view_books');
		}else{
			res.redirect('/home/update/'+req.params.id);
		}
	});
})
module.exports = router;

