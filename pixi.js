/* eslint-disable no-undef */
import { createVector, addVectors, magnitude as m, heading as h } from './vectors.js';
import { isUp, isDown, isLeft, isRight, isSpace } from './input.js';

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
const bulletGraphics = new PIXI.Graphics();
const rText = new PIXI.Text( "Debug:", {
  fontSize: 15,
  fill: 0xff1010
});
app.stage.addChild( graphics, shipGraphics, rText, bulletGraphics );

let heading = 0;
let pos = {
  x: 200,
  y: 200
};

let vel = createVector( 0, 0 );

const bullets = [];


// game loop
app.ticker.add( () => {

  // update heading
  if ( isRight ) heading += 4;
  if ( isLeft ) heading -= 4;
  if ( heading < 0 ) {
    heading += 360;
  } else  if ( heading >= 360 ) {
    heading -= 360;
  }
  
  // update thrust
  if ( isUp ) {
    const a = createVector( heading, 0.15 );
    vel = addVectors( vel, a );
  }
  if ( isDown ) {
    vel = { x: 0, y: 0 };
  }

  // fire bullet if spacebar pressed
  if ( isSpace ) {

    // calculate initial velocity
    // const bHead = heading;
    // const bMag = m( vel );
    const bVel = addVectors( vel, createVector( heading, 10 ) );

    // create new bullet
    bullets.push({
      pos: {
        ...pos
      },
      vel: bVel
    });
  }

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

  // draw thruster
  if ( isUp ) {
    shipGraphics.beginFill( 0xff0000 );
    shipGraphics.drawRect( -2, +10, 4, 4 );
    shipGraphics.endFill();
  }

  // draw bullets
  bulletGraphics.clear();
  bulletGraphics.beginFill( 0xffffff );
  bullets.forEach( b => {
    // update positions (velocity is constant)
    b.pos = addVectors( b.pos, b.vel );

    // TODO check off screen?

    // draw bullet
    bulletGraphics.drawCircle( b.pos.x, b.pos.y, 2 );
  });
  bulletGraphics.endFill();

  // add debug info
  const debug = [
    `Heading: ${heading}`,
    `Pos: (${Math.round(pos.x)}, ${Math.round(pos.y)})`,
    `Velocity: (${vel.x.toFixed(2)},${vel.y.toFixed(2)}) r=${m(vel).toFixed(2)} deg=${h(vel).toFixed(2)}`,
    `Bullets: ${bullets.length}`
  ];
  rText.text = debug.join('\n');
  rText.position.set( 20, 20 );
});