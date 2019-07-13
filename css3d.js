C = {
  unit: "px",
  camX: 0,
  camY: 0,
  camZ: 0,
  camRX: 0,
  camRY: 0,
  camRZ: 0,
  sprite_count: 0,
  sprites: [],
  plane_count: 0,
  cube_count: 0,
  pyramid_count: 0,
  options: {},
  
  $: id => document.getElementById(id),
  
  set_unit: u => {
    C.unit = u;
  },
  
  set_perspective: o => {
    viewport.style.perspective = `${o}${C.unit}`;
  },
  
  init: o => {
    if(!o.css) o.css = "";
    if(!o.html) o.html = "";
    if(!o.g) o.g = "scene";
    if(!o.o) o.o = "center";
    if(o.o == "top left") o.x += o.w/2, o.y += o.h/2;
    if(o.o == "top") o.y += o.h/2;
    if(o.o == "top right") o.x -= o.w/2, o.y += o.h/2;
    if(o.o == "right") o.x -= o.w/2;
    if(o.o == "bottom right") o.x -= o.w/2, o.y -= o.h/2;
    if(o.o == "bottom") o.y -= o.h/2;
    if(o.o == "bottom left") o.x += o.w/2, o.y -= o.h/2;
    if(o.o == "left") o.x += o.w/2;
    if(!o.w) o.w = 0;
    if(!o.h) o.h = 0;
    if(!o.x) o.x = 0;
    if(!o.y) o.y = 0;
    if(!o.z) o.z = 0;
    if(!o.rx) o.rx = 0;
    if(!o.ry) o.ry = 0;
    if(!o.rz) o.rz = 0;
    if(!o.sx) o.sx = 1;
    if(!o.sy) o.sy = 1;
    if(!o.sz) o.sz = 1;
    C.options[o.n] = o;
  },
  
  group: o => {
    if(!o.d && !(o.d === 0)) o.d = o.h;
    C.init(o);
    C.$(o.g).innerHTML += `<div id="${o.n}"class="group"style="position:absolute;width:${o.w}${C.unit};height:${o.d}${C.unit};transform:${C.tr(o)}">`;
  },
  
  plane: o => {
    if(!o.n) o.n = `plane${C.plane_count++}`;
    C.init(o);
    C.$(o.g).innerHTML += `<div id="${o.n}"class="plane ${o.css}"style="position:absolute;width:${o.w}${C.unit};height:${o.h}${C.unit};background:${o.b};transform-origin:${o.o};transform:${C.tr(o)}">${o.html}`;
    C.camera();
  },
  
  sprite: o => {
    if(!o.n) o.n = `sprite${C.sprite_count++}`;
    C.init(o);
    C.$(o.g).innerHTML += `<div id="${o.n}"class="sprite ${o.css}"style="position:absolute;width:${o.w}${C.unit};height:${o.h}${C.unit};background:${o.b};transform-origin:${o.o};transform:${C.tr(o)}">${o.html}`;
    C.sprites.push(o.n);
    C.camera();
  },

  cube: o => {
    if(!o.n) o.n = `cube${C.cube_count++}`;
    C.init(o);
    C.group(o);
    C.plane({g:o.n,x:o.w/2,y:o.d/2,w:o.w,h:o.d,b:o.b,css:"bottom"}); // bottom
    C.plane({g:o.n,y:o.d/2,w:o.d,h:o.h,b:o.b,rx:-90,ry:-90,o:"bottom",css:"left"}); // left
    C.plane({g:o.n,x:o.w,y:o.d/2,w:o.d,h:o.h,b:o.b,rx:-90,ry:-90,o:"bottom",css:"right"}); // right
    C.plane({g:o.n,x:o.w/2,y:0,w:o.w,h:o.h,b:o.b,rx:-90,o:"bottom",css:"back"}); // back
    C.plane({g:o.n,x:o.w/2,y:o.d,w:o.w,h:o.h,b:o.b,rx:-90,o:"bottom",css:"front"}); // front
    C.plane({g:o.n,x:o.w/2,y:o.d/2,z:o.h,w:o.w,h:o.d,b:o.b,css:"top"}); // top
  },

  pyramid: o => {
    if(!o.n) o.n = `pyramid${C.pyramid_count++}`;
    C.init(o);
    C.group({n:o.n,g:o.g,x:o.x,y:o.y,z:o.z,w:100,d:100,rx:o.rx,ry:o.ry,rz:o.rz,sx:o.w/100,sy:o.d/100,sz:o.h/86.6025});
    C.plane({g:o.n,x:50,y:50,w:100,h:100,b:o.b,css:"bottom"}); // bottom
    C.plane({g:o.n,y:50,w:100,h:100,b:o.b,ry:-60,rz:90,css:"triangle left",o:"bottom"}); // left
    C.plane({g:o.n,x:100,y:50,w:100,h:100,b:o.b,ry:-120,rz:90,css:"triangle right",o:"bottom"}); // right
    C.plane({g:o.n,x:50,y:0,w:100,h:100,b:o.b,rx:-120,css:"triangle back",o:"bottom"}); // back
    C.plane({g:o.n,x:50,y:100,w:100,h:100,b:o.b,rx:-60,css:"triangle front",o:"bottom"}); // front
  },

  camera: o => {
    if(o && (o.x || o.x === 0)) C.camX = o.x;
    if(o && (o.y || o.y === 0)) C.camY = o.y;
    if(o && (o.z || o.z === 0)) C.camZ = o.z;
    if(o && (o.rx || o.rx === 0)) C.camRX = o.rx;
    if(o && (o.ry || o.ry === 0)) C.camRY = o.ry;
    if(o && (o.rz || o.rz === 0)) C.camRZ = o.rz;
    C.camX += ((Math.random() - .5)/1000);
    scene.style.transformOrigin = `${C.camX}${C.unit} ${C.camY}${C.unit}`;
    scene.style.transform = `translateX(${-C.camX}${C.unit})translateY(${-C.camY}${C.unit})translateZ(${-C.camZ}${C.unit})rotateX(${C.camRX}deg)rotateY(${C.camRY}deg)rotateZ(${C.camRZ}deg)`;
    for(var i in C.sprites){
      var s = C.$(C.sprites[i]);
      var t = s.style.transform.replace(/ *rotate.*\(.*?deg\)/g,"");
      s.style.transform = t + `rotateZ(${-C.camRZ}deg)rotateX(${-C.camRX}deg)`;
    }
  },

  move: o => {
    if(o.n){
      var obj = C.$(o.n);
      var opt = C.options[o.n];
      if(o.x || o.x === 0) opt.x = o.x;
      if(o.y || o.y === 0) opt.y = o.y;
      if(o.z || o.z === 0) opt.z = o.z;
      if(o.rx || o.rx === 0) opt.rx = o.rx;
      if(o.ry || o.ry === 0) opt.ry = o.ry;
      if(o.rz || o.rz === 0) opt.rz = o.rz;
      C.options[o.n] = opt;
      obj.style.transform = C.tr(opt);
    }
  },
  
  tr: o => `translateX(-50%)translateY(-50%)translateX(${o.x}${C.unit})translateY(${o.y}${C.unit})translateZ(${o.z}${C.unit})rotateX(${o.rx}deg)rotateY(${o.ry}deg)rotateZ(${o.rz}deg)scaleX(${o.sx})scaleY(${o.sy})scaleZ(${o.sz})`
}

/*
C.plane({n:"ground",x:0,y:0,z:0,w:450,h:450,b:"#8D8"})
C.camera({x:0,y:0,z:150})
C.camera({rx:45,ry:0,rz:0})
C.plane({n:"p1",w:100,h:100,x:0,y:0,z:0,rx:-90,b:"#def",o:"bottom"})
C.plane({n:"t1",w:100,h:100,x:-150,y:-150,z:0,rx:-90,ry:30,b:"#edf",css:"triangle",o:"bottom"})
C.sprite({n:"s1",w:100,h:200,x:150,y:-150,z:0,b:"#fed",o:"bottom"})
C.sprite({n:"s2",w:100,h:100,x:0,y:-150,z:0,b:"#efd",css:"circle",o:"bottom"})
C.cube({n:"c1",g:"g1",x:120,y:120,w:120,h:75,d:100,rz:45,b:"#ddd"})
C.pyramid({n:"py1",g:"g1",x:-120,y:120,w:110,h:150,d:100,rz:-45,b:"#777"})
C.move({n:"p1",x:0,y:10,z:250,rx:0,rz:0});
C.move({n:"c1",z:50,ry:45});
*/
