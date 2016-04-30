import Immutable from 'immutable'

const NEIGHBOR_OFFSETS = [
  [-1,-1],[-1, 0],[-1, 1],
  [ 0,-1],/* xx */[ 0, 1],
  [ 1,-1],[ 1, 0],[ 1, 1]
]

export default function(liveCells) {
  let liveCellsJS = liveCells.toJS();
  return Immutable.fromJS(_.concat(survivors(liveCellsJS), births(liveCellsJS)));
}

export function survivors(liveCells) {
  return _.filter(liveCells, (liveCell) => {
    let livingNeighbors = liveNeighbors(liveCell, liveCells);
    return (livingNeighbors.length === 2 || livingNeighbors.length === 3);
  });
}

export function births(liveCells) {
  return _.filter(fertileGround(liveCells), (cell) => {
    return liveNeighbors(cell, liveCells).length === 3;
  });
}

export function fertileGround(liveCells) {
  let neighborsOfAllLiveCells = _.flatMap(liveCells, (liveCell) => {
    return neighborCells(liveCell);
  });

  let uniqNeighbors = _.uniqWith(neighborsOfAllLiveCells, _.isEqual);
  return _.differenceWith(uniqNeighbors, liveCells, _.isEqual);
}

export function liveNeighbors(cell, liveCells) {
  let neighbors = neighborCells(cell);

  return _.filter(neighbors, (neighbor) => {
    return _.some(liveCells, (liveCell) => {
      return liveCell[0] === neighbor[0] && liveCell[1] === neighbor[1];
    });
  });
}

export function neighborCells(cell) {
  return NEIGHBOR_OFFSETS.map((offset) => {
    return [ cell[0] + offset[0], cell[1] + offset[1]]
  });
}
