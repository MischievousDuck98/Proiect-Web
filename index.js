var express=require("express");
var bodyParser=require('body-parser');
var session=require('express-session');
var formidable = require('formidable');
const fs = require('fs');
const passport = require('passport');
const path = require('path');
var app = express();
var userController=require('./resources/controllers/user');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/resources')));
app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true,
   cookie: { maxAge: 60000 }
}))
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'resources'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.get('/', function (req, res) { 
   res.render( __dirname + "/resources/pages/register.html");  
})  
app.get('/login', function (req, res) {  
   res.render( __dirname + "/resources/pages/login.html");  
})
app.post('/login',userController.login);
app.post('/signup',userController.signup);
app.get('/logout',userController.logout);
app.get('/index',userController.index);
app.get('/news',userController.news);
app.get('/contact',userController.contact);
app.post('/contact', function(req, res) {
   var form = new formidable.IncomingForm();
   form.parse(req, function(err, fields, files) {
        if (err)
        { throw err; 
        }
        var filePath=(files.Fisier && files.Fisier.name!="")?files.Fisier.name:"";
        let rawdata = fs.readFileSync('forms.json');
        let jsfile = JSON.parse(rawdata);
        jsfile.forms.push({id:jsfile.nextId, prenume:fields.prenume, email:fields.email, country: fields.country, text: fields.subject, file: filePath});
        jsfile.nextId++;
        let data = JSON.stringify(jsfile);
        fs.writeFileSync("forms.json", data);
        res.redirect('/contact');
        
   });
   form.on('fileBegin', function (name, file){
      file.path = __dirname + '/uploads/' + file.name;
   });
   form.on('file', function (name, file){
      console.log('Uploadat '+file.name+' cu dimensiunea '+file.size);
   });
});
passport.serializeUser((user, done) => {
   done(null, user.email);
 });
 
passport.deserializeUser((email, done) => {
   done(null, {email: email});
}); 

app.get('*', function(req, res){
   var stat = '(Error: 404) Pagina pe care o cauti nu a fost gasita!';
   stat = stat.fontsize(10);
   res.status(404).send(stat.fontcolor("red") + '\n');
});

app.listen(8012);
