/* eslint-disable no-undef */
import Vector from './vectors.js';
import { isSpace } from './input.js';
import Ship from './ship.js';

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
console.log(  'ship', ship);

const bullets = [];

// game loop
let lastBullet = 0;
app.ticker.add(() => {

  ship.update();

  // fire bullet if spacebar pressed
  if (isSpace) {
    const now = Date.now();
    if (now - lastBullet > 100) {
      lastBullet = now;

    // create new bullet
    bullets.push({
      pos: ship.pos,
      vel: ship.vel.add(Vector.fromAngle(ship.angle, 10))
    });
  }
  }

  // const decay = 0.99;
  // v = v * decay;

  // DRAW --------------------------------

  ship.draw();

  // draw bullets
  bulletGraphics.clear();
  bulletGraphics.beginFill(0xffffff);
  bullets.forEach(b => {
    // update positions (velocity is constant)
    b.pos = b.pos.add(b.vel);

    // TODO check off screen?

    // draw bullet
    bulletGraphics.drawCircle(b.pos.x, b.pos.y, 2);
  });
  bulletGraphics.endFill();

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