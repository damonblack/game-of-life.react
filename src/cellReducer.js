import { Map, List } from 'immutable'
import nextGeneration from './nextGeneration'

function setState(oldState, newState) {
  let res = oldState.merge(newState);
  return res;
}

function toggleCell(cellList, point) {
  let targetPoint = List(point);
  let iTarget = cellList.findIndex((cell) => {
    return cell.equals(targetPoint);
  });
  let newCellList = List();

  if (iTarget === -1) {
    console.log(`Add point at ${point[0]}, ${point[1]}`);
    newCellList = cellList.push(targetPoint);
  } else {
    newCellList = cellList.delete(iTarget);
  }

  return newCellList;
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

    case 'TICK':
      console.log('ticking');
      let res = nextGeneration(state.get('cells'));
      return setState(state, { cells: res, generation: state.get('generation') + 1 });

    case 'TOGGLE_CELL':
      console.log('toggling cell');
      return setState(state, { cells: toggleCell(state.get('cells'), [action.x, action.y]) });
  }
}
