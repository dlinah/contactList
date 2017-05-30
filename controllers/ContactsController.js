var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

router.post('/getList',function(requset,response){
	mongoose.model('contacts').find({ userId: requset.user }, function(error, docs){
		if(error){
			console.log(error)
			response.status(400);
			response.json({ stautsCode:200, message: 'bad requset' });
		}
		else{
			response.status(200);
			if(docs.length == 0){
					response.json({ stautsCode:200, message: 'no contact found' })
				}
			else
				response.json({ stautsCode:200, message: 'Successful process', data:docs});
		}
	})
})

router.post('/getRecentList',function(requset, response){
	mongoose.model('contacts').find({ userId: requset.user })
		.sort({'createdAt': -1})
		.limit(10)
		.exec(function(error, docs) {
			if(error){
				console.log(error)
				response.status(400);
				response.json({ stautsCode:200, message: 'bad requset' });
			}
			else{
				response.status(200);

				if(docs.length == 0){
					response.json({ stautsCode:200, message: 'no contact found' })
				}
				else
					response.json({ stautsCode:200, message: 'Successful process', data:docs});
			}
		});


})

router.post('/addContact' ,function(requset,response){
	contactModel = mongoose.model('contacts');
	var contact = new contactModel({ email: requset.body.email, mobile: requset.body.mobile, firstName: requset.body.firstName, lastName: requset.body.lastName, userId: requset.user})
	contact.save(function(error){
		if(error){
			response.status(400);
			response.json({ message: 'error while saving contact'})
		}
		else{
			response.status(200);
            response.json({ stautsCode:200, message: 'Successful process', data:contact });
		}
	})
})
module.exports = router;
