import { Map } from 'immutable'
import nextGeneration from './nextGeneration'

function setState(oldState, newState) {
  let res = oldState.merge(newState);
  return res;
}

export default function(state = Map(), action) {

  switch (action.type) {
    case 'SET_STATE':
      console.log('setting state')
      return setState(state, action.state);

    case 'START_GAME':
      console.log('starging game')
      return setState(state, { status: 'RUNNING' });

    case 'STOP_GAME':
      console.log('stopping game');
      return setState(state, { status: 'STOPPED' });

    case 'TICK': {
      console.log('ticking');
      let res = nextGeneration(state.get('cells'));
      return setState(state, { cells: res });
    }
  }
}
