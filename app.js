var PORT = 3000;
var express = require('express');
var request = require('request');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express();
app.engine('handlebars',exphbs());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'vendor')));

//body-parser
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());


app.get('/', function(req, res){
	res.render("home");
});

app.get('/contact',(req,res) =>{
  res.render("contact");
});

app.get('/about-us',(req,res)=>{
  res.render("about-us");
});



app.listen(PORT,(req,res) => {
	console.log('App on 3000');
});
