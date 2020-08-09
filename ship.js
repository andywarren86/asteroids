import * as keys from './input.js';
import Vector from './vectors.js';

export default class Ship {

  constructor(app) {
    this.app = app;
    console.log('cstr', app);

    // eslint-disable-next-line no-undef
    this.graphics = new PIXI.Graphics();
    app.stage.addChild(this.graphics);

    // current direction
    this.angle = -90;

    // current x,y position
    this.pos = new Vector(200, 200);

    // current velocty vector
    this.vel = new Vector(0, 0);

  }

  update() {

    // update direction
    if (keys.isRight) this.angle += 4;
    if (keys.isLeft) this.angle -= 4;

    // keep within 0-360 range
    if (this.angle < 0) {
      this.angle += 360;
    } else if (this.angle >= 360) {
      this.angle -= 360;
    }

    // apply thrust
    if (keys.isUp) {
      const acc = Vector.fromAngle(this.angle, 0.15);
      this.vel = this.vel.add(acc);
    }

    // reset velcity if down pressed
    if (keys.isDown) {
      this.vel = new Vector(0, 0);
    }

    // update position based on velocity
    this.pos = this.pos.add(this.vel);

    // adjust for going off screen
    const viewWidth = this.app.view.width;
    const viewHeight = this.app.view.height;
    if (this.pos.x > viewWidth) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = viewWidth;
    if (this.pos.y > viewHeight) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = viewHeight;
  }

  draw() {

    // update graphics object
    this.graphics.position.x = this.pos.x;
    this.graphics.position.y = this.pos.y;
    this.graphics.angle = this.angle;

    // draw ship
    this.graphics.clear();
    this.graphics.beginFill(0x00ff00);
    // shipGraphics.drawPolygon(0, -10, +5, +10, -5, +10)
    this.graphics.drawPolygon(-5, -5, +10, 0, -5, +5)
    this.graphics.endFill();

    // draw thruster
    if (keys.isUp) {
      this.graphics.beginFill(0xff0000);
      this.graphics.drawRect(-9, -2, 4, 4);
      this.graphics.endFill();
    }
  }
}