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
}