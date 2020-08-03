const Vector = require('../vectors').default;
// import Vectors from '../vectors';

console.log("Vector", Vector);

describe("vector.js", () => {
  test('creates new vector', () => {
    const v = new Vector(1, 2);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
  });

  test('fromAngle()', () => {
    const v1 = Vector.fromAngle( 45, Math.sqrt(2) );
    expect(v1.x).toBeCloseTo( 1 );
    expect(v1.y).toBeCloseTo( 1 );

    const v2 = Vector.fromAngle( 30, 2 );
    expect( v2.x ).toBeCloseTo( Math.sqrt(3) );
    expect( v2.y ).toBeCloseTo( 1 );
  })

  test('Vector.add()', () => {
    const v1 = new Vector(1, 2);
    const v2 = new Vector(2, 3);
    const v3 = Vector.add(v1, v2);
    expect(v3.x).toBe(3);
    expect(v3.y).toBe(5);
  })

  test('mag()', () => {
    expect(new Vector(3, 4).mag()).toBe(5);
  });

  test('angle()', () => {
    expect(new Vector(1, 0).angle()).toBe(0);
    expect(new Vector(1, 1).angle()).toBe(45);
    expect(new Vector(0, 1).angle()).toBe(90);
    expect(new Vector(-1, 1).angle()).toBe(135);
    expect(new Vector(-1, 0).angle()).toBe(180);
    expect(new Vector(-1, -1).angle()).toBe(225);
    expect(new Vector(0, -1).angle()).toBe(270);
    expect(new Vector(1, -1).angle()).toBe(315);
  })
})

