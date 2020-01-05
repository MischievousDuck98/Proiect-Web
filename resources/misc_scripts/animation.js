window.onload = test;
function myMove() {
  var elem = document.getElementById("animate");   
  var pos = 0;
  var id = setInterval(frame, 120);
  function frame() {
    if (pos == 120) {
      pos = 0;
    } else {
      pos+=10; 
      elem.style.left = pos + "px"; 
    }
  }
}
function test(){
   var timeout = setTimeout(myMove, 800);
}
function mover(obj){
     obj.style.backgroundColor = 'blue';
}
function mout(obj){
     obj.style.backgroundColor = 'red';
}