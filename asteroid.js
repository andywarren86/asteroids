import Vector from './vectors.js';
import { adjustPositionForEdge, WIDTH, HEIGHT } from './global.js';


export default class Asteroid {
  constructor(app) {
    // eslint-disable-next-line no-undef
    this.graphics = new PIXI.Graphics();
    app.stage.addChild(this.graphics);

    this.pos = new Vector(Math.random() * WIDTH, Math.random() * HEIGHT);
    this.vel = Vector.fromAngle( Math.random() * 360, Math.random() * 3 );
  }

  update() {
    this.pos = this.pos.add( this.vel );
    this.pos = adjustPositionForEdge( this.pos );
  }

  draw() {
    this.graphics.clear();
    this.graphics.beginFill(0xcccccc);
    this.graphics.drawCircle( this.pos.x, this.pos.y, 20 );
    this.graphics.endFill();
  }
}