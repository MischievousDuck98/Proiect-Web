var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Pavaroti_x20!#1',
  database : 'mydb'
});
connection.connect(function(err){
if(!err) {
    console.log("Baza de date este conectata");
} else {
    console.log("Eroare la conectarea cu baza de date");
}
});
module.exports = connection; 
