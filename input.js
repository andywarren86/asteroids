export let isUp = false;
export let isDown = false;
export let isLeft = false;
export let isRight = false;
export let isSpace = false;

window.addEventListener( 'keydown', (e) => {
  // console.log( e.key );
  // e.preventDefault();
  let handled = false;
  if ( e.key === "ArrowDown" ) {
    isDown = true;
    handled = true;
  } else if ( e.key === "ArrowUp" ) {
    isUp = true;
    handled = true;
  } else if ( e.key === "ArrowLeft" ) {
    isLeft = true;
    handled = true;
  } else if ( e.key === "ArrowRight" ) {
    isRight = true;
    handled = true;
  } else if ( e.key === " " ) {
    isSpace = true;
    handled = true;
  }

  if ( handled ) {
    e.preventDefault()
  }
});

window.addEventListener( 'keyup', (e) => {
  if ( e.key === "ArrowDown" ) {
    isDown = false;
  } else if ( e.key === "ArrowUp" ) {
    isUp = false;
  } else if ( e.key === "ArrowLeft" ) {
    isLeft = false;
  } else if ( e.key === "ArrowRight" ) {
    isRight = false;
  } else if ( e.key === " " ) {
    isSpace = false;
  }
});
