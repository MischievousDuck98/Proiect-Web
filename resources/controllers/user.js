var Cryptr = require('cryptr');
cryptr = new Cryptr('mySecretKey');
var connection = require('./../../config');

exports.signup=function(req,res){
    var message='';
    var today = new Date();
    var encryptedString = cryptr.encrypt(req.body.password);
    var users={
        "name":req.body.name,
        "email":req.body.email,
        "password":encryptedString,
        "created_at":today,
        "updated_at":today
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        message="A aparut o eroare la cerere";
        return res.render("/pages/register.html", {message: message});
      }else{
          return res.redirect("login")
      }
    });
}
exports.login=function(req,res){
    var message='';
    var sess = req.session;
    if (req.method == "POST"){
    var email=req.body.email;
    var password=req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results) {
      if (error) {
          message="A aparut o eroare la cerere";
          return res.render("/pages/login.html", {message: message});
      }else{
        if(results.length >0){
  decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
                sess.userId = results[0].id;
                sess.user = results[0];
                return res.redirect("/index")
            }else{
                message="Emailul si parola nu se potrivesc";
                return res.render("pages/login.html", {message: message});
                
            }  
        }
        else{
          message="Emailul nu este inregistrat";
          return res.render("pages/register.html", {message: message});
        }
      }
    });
}
}
exports.logout=function(req,res){
  req.session.destroy();
  return res.redirect("/login"); 
}

exports.index=function(req,res){
  if(isLoggedIn(req))
  {
    var message=req.session.user.email;
    return res.render("pages/index.html",{message: message});
  }
  else
  {
    return res.redirect("login");
  }
}

exports.news=function(req,res){
  if(isLoggedIn(req))
  {
    var message=req.session.user.email;
    return res.render("pages/news.html",{message: message});
  }
  else
  {
    return res.redirect("login");
  }
}

exports.contact=function(req,res){
  if(isLoggedIn(req))
  {
    var message=req.session.user.email;
    return res.render("pages/contact.html",{message: message});
  }
  else
  {
    return res.redirect("login");
  }
}
exports.active=function(req,res){
  if(isLoggedIn(req))
  {
    var message=req.session.user.email;
    return res.render("views/active_tickets.ejs",{message: message});
  }
  else
  {
    return res.redirect("login");
  }
}
function isLoggedIn(req) {
  if(req.session.userId) {
      return true;
  } else {
      return false;
  }
}
