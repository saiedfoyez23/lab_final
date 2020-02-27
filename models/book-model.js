var db = require('./db');

module.exports ={

    getAllBooks:function(callback){
		var sql = "select * from book";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
    },
    update: function(book, callback){
		var sql = "update book set name=?, category=?, author_name=?, price=?, discription=? where id=?";
		db.execute(sql, [book.name, book.category, book.author_name, book.price, book.discription, book.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
    getById: function(id, callback){
		var sql = "select * from book where id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
}