/* eslint-disable no-undef */
import { createVector, addVectors, magnitude as m, heading as h } from './vectors.js';

let type = "Asteroids!";
PIXI.utils.sayHello(type);

const WIDTH = 800;
const HEIGHT= 500;

var app = new PIXI.Application({
  width: WIDTH, 
  height: HEIGHT, 
  antialias: true 
});

document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();
const shipGraphics = new PIXI.Graphics();
const rText = new PIXI.Text( "hihihihi", {
  fontSize: 20,
  fill: 0xff1010
});
const vText =  new PIXI.Text( "", {
  fontSize: 20,
  fille: 0xff1010
});
app.stage.addChild( graphics, shipGraphics, rText, vText );

let heading = 0;
let pos = {
  x: 200,
  y: 200
};

let vel = createVector( 0, 0 );

let isUp = false;
let isDown = false;
let isLeft = false;
let isRight = false;
window.addEventListener( 'keydown', (e) => {
  if ( e.key === "ArrowDown" ) {
    isDown = true;
    e.preventDefault();
  } else if ( e.key === "ArrowUp" ) {
    isUp = true;
    e.preventDefault();
  } else if ( e.key === "ArrowLeft" ) {
    isLeft = true;
  } else if ( e.key === "ArrowRight" ) {
    isRight = true;
  }
});

window.addEventListener( 'keyup', (e) => {
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

  // update rotation
  if ( isRight ) heading += 4;
  if ( isLeft ) heading -= 4;
  if ( heading < 0 ) {
    heading += 360;
  } else  if ( heading >= 360 ) {
    heading -= 360;
  }
  
  // update velocity
  if ( isUp ) {
    const a = createVector( heading, 0.1 );
    vel = addVectors( vel, a );
  }
  if ( isDown ) {
    vel = { x: 0, y: 0 };
  }
  // if ( isUp ) vel += 0.1;
  // if ( isDown ) vel -= 0.1;

  // const min = 0;
  // const max = 3;
  // if( vel > max ) {
  //   vel = max;
  // } else if ( v < min ) {
  //   vel = 0;
  // }

  // const decay = 0.99;
  // v = v * decay;

  // update position based on velocity
  pos = addVectors( pos, vel );

  // adjust for going off screen
  if ( pos.x > WIDTH ) pos.x = 0;
  if ( pos.x < 0 ) pos.x = WIDTH;
  if ( pos.y > HEIGHT ) pos.y = 0;
  if ( pos.y < 0 ) pos.y = HEIGHT;


  // clear graphics
  graphics.clear();

  // draw current state
  shipGraphics.position.x = pos.x;
  shipGraphics.position.y = pos.y;
  shipGraphics.angle = heading;

  // draw ship
  shipGraphics.clear();
  shipGraphics.beginFill( 0x00ff00 );
  shipGraphics.drawPolygon( 0, -10, +5, +10, -5, +10 )
  shipGraphics.endFill();

  // thruster
  if ( isUp ) {
    shipGraphics.beginFill( 0xff0000 );
    shipGraphics.drawRect( -2, +10, 4, 4 );
    shipGraphics.endFill();
  }

  // draw debug
  const debug = [
    `Heading: ${heading}`,
    `Pos: (${Math.round(pos.x)}, ${Math.round(pos.y)})`,
    `Velocity: (${vel.x.toFixed(2)},${vel.y.toFixed(2)}) r=${m(vel).toFixed(2)} deg=${h(vel).toFixed(2)}`
  ];
  rText.text = debug.join('\n');
  rText.position.set( 20, 20 );
});