import nextGeneration, { survivors, births } from 'src/nextGeneration'
import { List } from 'immutable'
import { expect } from 'chai'

describe('nextGeneration', () => {
  it('empty fields remain dead', () => {
    let liveCells = List();

    expect(nextGeneration(liveCells).count()).toEqual
  });
});

describe('survivors', () => {
  it('should kill cell with no neighbors', () => {

    let livingCells = [[1,2]];
    //    0 1 2
    //  0| | | |
    //  1| |█| |
    //  2| | | |

    expect(survivors(livingCells)).to.be.empty;
  });

  it('should kill cell with only one neighbor', () => {

    let livingCells = [[0,0],[1,2]];
    //    0 1 2
    //  0|█| | |
    //  1| |█| |
    //  2| | | |

    expect(survivors(livingCells)).to.be.empty;

  });

  it('should persist cell with two neighbors', () => {

    let livingCells = [[2,0],[1,1],[1,2]];
    //    0 1 2
    //  0| | |█|
    //  1| |█| |
    //  2| |█| |

    expect(survivors(livingCells)).to.eql([[1,1]]);

  });

  it('should persist cell with three neighbors', () => {

    let livingCells = [[0,0],[2,0],[1,1],[1,2]];
    //    0 1 2
    //  0|█| |█|
    //  1| |█| |
    //  2| |█| |

    expect(survivors(livingCells)).to.eql([[1,1]]);

  });

  it('should kill cells with four neighbor', () => {

    let livingCells = [[0,0],[2,0],[1,1],[0,2],[2,2]];
    //    0 1 2
    //  0|█| |█|
    //  1| |█| |
    //  2|█| |█|

    expect(survivors(livingCells)).to.be.empty;

  });
});

describe('births', () => {
  it('should create new cells with exactly three neighbor', () => {

    let livingCells = [[2,0],[0,2],[2,2]];
    //    0 1 2
    //  0| | |█|
    //  1| | | |
    //  2|█| |█|

    expect(births(livingCells)).to.be.eql([[1,1]]);

  });

  it('should not create new cells with two neighbors', () => {

    let livingCells = [[2,0],[0,2]];
    //    0 1 2
    //  0| | |█|
    //  1| | | |
    //  2|█| | |

    expect(births(livingCells)).to.be.empty;

  });
});

