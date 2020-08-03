const toDegs = (rads) => rads * 180 / Math.PI;
const toRads = (degs) => degs * Math.PI / 180;

export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  /** Angle in degrees */
  angle() {
    const degs = toDegs(Math.atan2(this.y,this.x));
    return degs < 0 ? degs + 360 : degs;
  }
}

Vector.fromAngle = (angle, magnitude) => {
  const x = Math.cos(toRads(angle)) * magnitude;
  const y = Math.sin(toRads(angle)) * magnitude;
  return new Vector(x, y);
}

Vector.add = (v1, v2) => ({
  x: v1.x + v2.x,
  y: v1.y + v2.y
});