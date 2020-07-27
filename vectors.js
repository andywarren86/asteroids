export function createVector( angle, magnitude ) {
  const x = Math.sin(angle * Math.PI / 180) * magnitude;
  const y = -Math.cos(angle * Math.PI / 180) * magnitude;
  return { x, y };
}

export function addVectors( v1, v2 ) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  }
}

export function magnitude( v ) {
  return Math.sqrt( Math.pow( v.x, 2 ) + Math.pow( v.y, 2 ) );
}

/** Angle in degress of this vector */
export function heading( v ) {
  const deg = -Math.atan( v.x / v.y ) * 180 / Math.PI;
  if ( v.x > 0 && v.y > 0 ) {
    return deg + 180;
  } else if ( v.x < 0 && v.y > 0 ) {
    return deg + 180;
  } else if ( v.x < 0 && v.y < 0 ) {
    return deg + 360;
  }
  return deg;
}