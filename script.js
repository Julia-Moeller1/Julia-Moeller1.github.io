(function(){
  var c=document.getElementById("pixelfoto"), x=c.getContext("2d"),
      img=new Image(), t=document.createElement("canvas"), tx=t.getContext("2d"),
      crop, running=false, steps=[64,48,36,28,20,14,10,7,5,3,2,1];
  function draw(s){
    var w=Math.ceil(c.width/s), h=Math.ceil(c.height/s);
    t.width=w; t.height=h;
    tx.drawImage(img,crop.x,crop.y,crop.w,crop.h,0,0,w,h);
    x.imageSmoothingEnabled=false;
    x.drawImage(t,0,0,w,h,0,0,c.width,c.height);
  }
  function play(){
    if(running) return;
    running=true;
    var i=0;
    (function next(){
      draw(steps[i]);
      if(++i<steps.length){setTimeout(next,200)}else{running=false}
    })();
  }
  img.onload=function(){
    var ar=c.width/c.height, w=img.width, h=img.height;
    if(w/h>ar){w=h*ar}else{h=w/ar}
    crop={x:(img.width-w)/2,y:(img.height-h)/2,w:w,h:h};
    if(matchMedia("(prefers-reduced-motion: reduce)").matches){draw(1);return}
    draw(steps[0]);
    var io=new IntersectionObserver(function(e){
      if(e[0].isIntersecting){io.disconnect();setTimeout(play,300)}
    },{threshold:.6});
    io.observe(c);
    c.addEventListener("pointerenter",play);
  };
  img.src="foto.jpg";
})();

// Der Name wird dicker und breiter, je weiter rechts der Mauszeiger ist.
(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var h=document.getElementById("name");
  addEventListener("pointermove",function(e){
    var x=e.clientX/innerWidth, y=e.clientY/innerHeight;
    var w=Math.round(200+x*600), s=Math.round(100-y*25);
    h.style.fontVariationSettings='"wght" '+w+',"wdth" '+s;
  },{passive:true});
})();

(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var root=document.documentElement;
  addEventListener("pointermove",function(e){
    root.style.setProperty("--mx",e.clientX+"px");
    root.style.setProperty("--my",e.clientY+"px");
  },{passive:true});
})();