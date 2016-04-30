export function setState(newState) {
  return {
    type: 'SET_STATE',
    state: newState
  };
}

export function startGame() {
  console.log('START game action fired');
  return {
    type: 'START_GAME'
  };
}

export function tick() {
  console.log('TICK game action fired');
  return {
    type: 'TICK'
  };
}

export function stopGame() {
  console.log('STOP game action fired');
  return {
    type: 'STOP_GAME'
  }
}

