/* eslint-disable no-undef */
import Vector from './vectors.js';
import { isSpace } from './input.js';
import Ship from './ship.js';
import Asteroid from './asteroid.js';
import { adjustPositionForEdge } from './global.js';

let type = "Asteroids!";
PIXI.utils.sayHello(type);

var app = new PIXI.Application({
  width: 800,
  height: 600,
  antialias: true
});

document.body.appendChild(app.view);

const bulletGraphics = new PIXI.Graphics();
const rText = new PIXI.Text("Debug:", {
  fontSize: 15,
  fill: 0xff1010
});
app.stage.addChild(rText, bulletGraphics);

// create ship
const ship = new Ship( app );

// create asteroids
const asteroids = [];
for( let i=0; i<10; i++) {
  asteroids.push( new Asteroid( app ) );
}

// game loop
let bullets = [];
let lastBullet = 0;
app.ticker.add(() => {

  // UPDATE ------------------------------------
  // update ship position
  ship.update();

  // update asteroid positions
  asteroids.forEach( a => a.update() );

  // update bullet time-to-live
  bullets.forEach(b => (b.ttl = b.ttl - 1) );

  // remove expired bullets
  bullets = bullets.filter( b => b.ttl > 0 );
    
  // update bullet position
  bullets.forEach( b => {
    b.pos = b.pos.add(b.vel);
    b.pos = adjustPositionForEdge( b.pos );
  });

  // create new bullet if spacebar pressed and sufficient time has elapsed
  // since last bullet was fired
  if (isSpace) {
    const now = Date.now();
    if (now - lastBullet > 100) {
      lastBullet = now;

      // create new bullet
      bullets.push({
        pos: ship.pos,
        vel: ship.vel.add(Vector.fromAngle(ship.angle, 10)),
        ttl: 80 // number of frames until the bullet expires
      });
    }
  }

  // const decay = 0.99;
  // v = v * decay;

  // DRAW --------------------------------
  // draw ship
  ship.draw();

  // draw asteroids
  asteroids.forEach( a => a.draw() ); 

  // draw bullets
  bulletGraphics.clear();
  bulletGraphics.beginFill(0xffffff);
  bullets.forEach(b => {
    bulletGraphics.drawCircle(b.pos.x, b.pos.y, 2);
  });
  bulletGraphics.endFill();

  // DEBUG -----------------------------------

  // add debug info
  const debug = [
    `Ship ~~~~~~~~~~~~~~~`,
    `Angle: ${ship.angle}`,
    `Pos: (${Math.round(ship.pos.x)}, ${Math.round(ship.pos.y)})`,
    `Velocity: (${ship.vel.x.toFixed(2)},${ship.vel.y.toFixed(2)}) mag=${ship.vel.mag().toFixed(2)} angle=${ship.vel.angle().toFixed(2)}`,
    `Bullets ~~~~~~~~~~~~~~~~`,
    `Count: ${bullets.length}`
  ];
  rText.text = debug.join('\n');
  rText.position.set(20, 20);
});