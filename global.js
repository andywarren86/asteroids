export const WIDTH = 800;
export const HEIGHT = 600;

export function adjustPositionForEdge(pos) {
  if (pos.x > WIDTH) pos.x = 0;
  if (pos.x < 0) pos.x = WIDTH;
  if (pos.y > HEIGHT) pos.y = 0;
  if (pos.y < 0) pos.y = HEIGHT;
  return pos;
}