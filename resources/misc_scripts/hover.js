function addhover() {
    var navli,i;
    navli = document.getElementById('centeredmenu').getElementsByTagName('li')
    for(i=0;i<navli.length;i++) {
       navli[i].onmouseover=function(){hover(this,'hover');};
       navli[i].onmouseout=function(){hover(this,'');};
    }
 }
 function hover(o,sClass) {
    if (o) {
       o.className = sClass;
    }
 }
 addhover();