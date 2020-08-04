/* eslint-disable no-undef */
import Vector from './vectors.js';
import { isUp, isDown, isLeft, isRight, isSpace } from './input.js';

let type = "Asteroids!";
PIXI.utils.sayHello(type);

const WIDTH = 800;
const HEIGHT = 500;

var app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true
});

document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();
const shipGraphics = new PIXI.Graphics();
const bulletGraphics = new PIXI.Graphics();
const rText = new PIXI.Text("Debug:", {
  fontSize: 15,
  fill: 0xff1010
});
app.stage.addChild(graphics, shipGraphics, rText, bulletGraphics);

let angle = 0;
let pos = new Vector(200, 200);
let vel = new Vector(0, 0);
const bullets = [];

// game loop
app.ticker.add(() => {

  // update heading
  if (isRight) angle += 4;
  if (isLeft) angle -= 4;
  if (angle < 0) {
    angle += 360;
  } else if (angle >= 360) {
    angle -= 360;
  }

  // update thrust
  if (isUp) {
    const acc = Vector.fromAngle( angle, 0.15);
    vel = vel.add(acc);
  }
  if (isDown) {
    vel = new Vector(0, 0);
  }

  // fire bullet if spacebar pressed
  if (isSpace) {

    // calculate initial velocity
    const bVel = vel.add(new Vector(angle, 10));

    // create new bullet
    bullets.push({
      pos: pos,
      vel: bVel
    });
  }

  // const decay = 0.99;
  // v = v * decay;

  // update position based on velocity
  pos = pos.add(vel);

  // adjust for going off screen
  if (pos.x > WIDTH) pos.x = 0;
  if (pos.x < 0) pos.x = WIDTH;
  if (pos.y > HEIGHT) pos.y = 0;
  if (pos.y < 0) pos.y = HEIGHT;

  // DRAW --------------------------------

  // clear graphics
  graphics.clear();

  // draw current state
  shipGraphics.position.x = pos.x;
  shipGraphics.position.y = pos.y;
  shipGraphics.angle = angle;

  // draw ship
  shipGraphics.clear();
  shipGraphics.beginFill(0x00ff00);
  shipGraphics.drawPolygon(0, -10, +5, +10, -5, +10)
  shipGraphics.endFill();

  // draw thruster
  if (isUp) {
    shipGraphics.beginFill(0xff0000);
    shipGraphics.drawRect(-2, +10, 4, 4);
    shipGraphics.endFill();
  }

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
    `Heading: ${angle}`,
    `Pos: (${Math.round(pos.x)}, ${Math.round(pos.y)})`,
    `Velocity: (${vel.x.toFixed(2)},${vel.y.toFixed(2)}) mag=${vel.mag().toFixed(2)} angle=${vel.angle().toFixed(2)}`,
    `Bullets: ${bullets.length}`
  ];
  rText.text = debug.join('\n');
  rText.position.set(20, 20);
});