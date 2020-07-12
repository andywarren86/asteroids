const createVector = require('../vectors');

test('creates vector', () => {
  console.log(createVector);
  const v = createVector( 0, 3 );

  expect(v.x).toBe(3);
  expect(v.y).toBe(0);
});