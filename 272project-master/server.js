var express = require('express');
var app = express();
var mongojs = require('mongojs');
//var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');
var db1 = mongojs('user1:user1@ds145677.mlab.com:45677/sampleapp',['customerlist']);
//var cookie = require('cookie');
var session = require('express-session');
var mongoose = require('mongoose');



var sess;

app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    HttpOnly: false, 
    
}));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

/**
app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');

  db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});
**/

//customer registration
app.post('/customerlist', function (req, res) {
  console.log(req.body);
  db1.customerlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

//whether the user enter correct password username and password
app.get('/customerlist/:name/:password', function (req, res) {
	
  console.log('I received a GET request');

  db1.customerlist.find({},{"username":1,"password":1,_id:0}).toArray(function (err, docs) {
	console.log(docs);
	//console.log(docs[0].username);
	flag = "unsuccessful";
	
	for (i=0; i<docs.length; i++)
	{
		if(docs[i].username.toString() == req.params.name.toString() & docs[i].password.toString() == req.params.password.toString())
		{
			console.log('successful');
			flag = "successful"
			break;
		}
	}
	
	if(flag == "successful")
	{
		/*res.setHeader('Set-Cookie', cookie.serialize('username', String(req.params.name), {
			httpOnly: true,
		}));*/
		sess = req.session;
		sess.username=req.params.name;
		res.send("successful");
	}
	else
	{
		res.send("unsuccessful");
	}
	
  });
});

//session check
app.get('/sessioncheck', function (req, res) {
	
  console.log('I received a session check request');
  sess = req.session;
	
  if(sess.username)
  {
	  res.send(sess.username);
  }
  else
  {
	  res.send("not exist");
  }
	
});

//session destroy
app.get('/sessiondestroy', function (req, res) {
	
  console.log('I received a session destroy request');
  sess = req.session;
  sess.destroy(function(err) {
        if(err){
             console.log('Error destroying session');
			 res.send("not done");
        }else{
            console.log('Session destroy successfully');
			res.send("done");
        }
    });
	
});

//User Info
//for customer detail page
app.get('/customerlist/:name', function (req, res) {

  console.log('I received a user info request');

  db1.customerlist.findOne({"username" : req.params.name.toString()}, function (err, docs) {
	console.log(docs);
	res.json(docs);
	
  });
});

//item info for product_detail page
app.get('/customerlist/:name/:manu/:price', function (req, res) {

  console.log('I received a item info request');

  db1.itemlist.findOne({"itemName" : req.params.name.toString(), "itemManufacturer" : req.params.manu.toString(), "itemPrice" : req.params.price.toString()}, function (err, docs) {
	console.log(docs);
	res.json(docs);
	
  });
});

//insert item into cartlist
app.post('/cartlist/:username', function (req, res) {
  console.log(req.body.itemName);
  var data = {"userName":req.params.username.toString(), 
							"itemName":req.body.itemName.toString(), 
							"itemPrice":req.body.itemPrice.toString(), 
							"itemManufacturer":req.body.itemManufacturer.toString(), 
							"itemPath":req.body.itemPath.toString(), 
							"itemCustQnty":req.body.custQnty.toString()};
							
  db1.cartlist.insert(data, function(err, doc) {
	  console.log("data -> cart");
    res.json(doc);
  });
});

//cart info for user based on username
app.get('/cartlist/:name', function (req, res) {

  console.log('I received a cart info request');

  db1.cartlist.find({"userName" : req.params.name.toString()}, function (err, docs) {
	console.log(docs);
	res.json(docs);
	
  });
});

// delete item from cart based on _id
app.delete('/cartlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db1.cartlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
