let type = "WebGL";
PIXI.utils.sayHello(type);

var app = new PIXI.Application({
  width: 256, 
  height: 256, 
  antialias: true 
});

document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();
app.stage.addChild( graphics );


let cx = 100;
let cy = 100
let vx = 0;
let vy = 0;

let isUp = false;
let isDown = false;
let isLeft = false;
let isRight = false;
window.addEventListener( 'keydown', (e) => {
  console.log( e.key );
  if ( e.key === "ArrowDown" ) {
    isDown = true;
  } else if ( e.key === "ArrowUp" ) {
    isUp = true;
  } else if ( e.key === "ArrowLeft" ) {
    isLeft = true;
  } else if ( e.key === "ArrowRight" ) {
    isRight = true;
  }
});
window.addEventListener( 'keyup', (e) => {
  console.log( e.key );
  if ( e.key === "ArrowDown" ) {
    isDown = false;
  } else if ( e.key === "ArrowUp" ) {
    isUp = false;
  } else if ( e.key === "ArrowLeft" ) {
    isLeft = false;
  } else if ( e.key === "ArrowRight" ) {
    isRight = false;
  }
});


app.ticker.add( () => {
  
  // update velocity
  if ( isUp ) {
    vy -= 0.1;
  }
  if ( isDown ) {
    vy += 0.1;
  }
  const max = 2;
  if( vy > max ) {
    vy = max;
  } else if ( vy < max * -1 ) {
    vy = max * -1;
  }

  const decay = 0.99;
  vy = vy * decay;

  // update position based on velocity
  cx += vx;
  cy += vy;


  // draw state
  graphics.clear();
  graphics.beginFill( 0xFF0000 );
  graphics.drawShape( new PIXI.Circle(20, 20, 10) );
  graphics.endFill();

  graphics.beginFill( 0x00FFFF );
  graphics.drawPolygon( cx, cy-10, cx+5, cy+10, cx-5, cy+10 );
  graphics.endFill();
});