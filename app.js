var express = require('express');
console.log('express acquired');
var request = require('request');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express();
require('dotenv').config()
app.engine('handlebars',exphbs());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'vendor')));

//body-parser
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());
console.log("Post Service Acquired")

const _ = require("lodash");

//Database
const mongoose = require('mongoose');
mongoose.connect(process.env.URI, { useNewUrlParser: true });
console.log("Database Created");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userschema = new Schema({

  first:String,
  last:String,
  email:String,
  phone:String,
  type:String,
  pass:String,
});

const usermodel = mongoose.model("user", userschema);

app.get('/', function(req, res){
	res.render("index");
});

app.get('/contact',(req,res) =>{
  res.render("contact");
});

app.get('/about',(req,res)=>{
  res.render("about");
});

app.get('/causes',(req,res)=>{
  res.render("causes");
});

app.get('/services',(req,res)=>{
  res.render("services");
});

app.get('/login',(req,res)=>{
  res.render('login',{mesg:null})
})

app.post('/login',(req,res)=>{
  usermodel.findOne({ email: req.body.email, pass: req.body.pass }, function (err, doc) {
    if (err) {
        console.log(err, 'error')
        res.redirect('/')
        return
    }
    if (_.isEmpty(doc)) {
        res.render('login', { message: "Please check email/password" })
    } else {
        res.render('/scanner'+doc._id);
    }
})
})

app.get('/register',(req,res)=>{
  res.render('signup')
})

app.post('/register',(req,res)=>{
  if(req.body.submit){
    let newuser = new usermodel()
        newuser.first = req.body.first_name
        newuser.last = req.body.last_name
        newuser.email = req.body.email
        newuser.phone = req.body.phone
        newuser.type = req.body.subject
        newuser.pass=req.body.pass
        newuser.save(function (err) {
            if (err) {
                console.log(err)
                return
            }
            else {
                res.render('signup')
            }
        });
  }
  res.redirect('/login');
})

app.get('/scanner:user',(req,res)=>{
  if(req.params.user==null){
    res.render('scanner',{message:"null",amount:"null"})
  }
  else{
    
  }
});

app.listen(3000,(req,res) => {
	console.log('App on 3000');
});
