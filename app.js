var bodyParser = require("body-parser");
var postRequestMiddleware = bodyParser.json({ limit: '20mb' });

var express = require('express');
var app = express();

//connect to database
var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/note');

//models

require('./models/ContactModel')
require('./models/UserModel')

app.use(postRequestMiddleware)
app.use(function(request,response,next){
	mongoose.model('users').findOne({ authorization: request.body.authorization, deviceToken: request.body.deviceToken, fingerPrint: request.body.fingerPrint}, function(error, doc){
		if(error){
			console.log(error)
			response.status(400);
			response.json({ stautsCode:200, message: 'bad requset' });
			

		}
		else{
			if(!doc){
				response.status(401);
				response.json({ stautsCode:401, message: 'not authorized' });
			}
			else{
				request.user = doc._id
				next();
			}
		}
	})

})

contactRouter= require('./controllers/ContactsController');
app.use('/contacts',contactRouter);


app.listen(8090);