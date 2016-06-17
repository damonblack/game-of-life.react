import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actionCreators'
import * as styles from './app.css'

export class GameOfLife extends Component {
  constructor () {
    super(arguments);
    _.bindAll(this, ['nextTurn', 'startGame', 'stopGame', 'clearAllIntervals', 'canvasClicked']);
  }

  /* eslint no-unused-vars: 0 */
  componentWillMount () {
    this.intervals = []
  }

  /* eslint no-unused-vars: 0 */
  componentDidMount () {
    const cellContext = this.refs.cellImage.getContext('2d');
    cellContext.fillStyle = 'white';
    cellContext.fillRect(0, 0, 6, 6);

    const ORIGX = Math.floor(this.props.gameWidth/16)- 15;
    const ORIGY = Math.floor(this.props.gameHeight/16) - 8;

    const INIT_CELLS = [
      [ORIGX, ORIGY+2],
      [ORIGX+1, ORIGY+2],
      [ORIGX+3, ORIGY+1],
      [ORIGX+4, ORIGY+2],
      [ORIGX+5, ORIGY+2],
      [ORIGX+6, ORIGY+2],
      [ORIGX+1, ORIGY]
    ]

    this.props.setState({ cells : INIT_CELLS })
  }

  componentWillUnmount () {
    this.clearAllIntervals()
  }

  setInterval () {
    this.intervals.push(setInterval.apply(null, arguments))
  }

  stopGame () {
    this.clearAllIntervals();
    this.props.stopGame();
  }

  startGame () {
    if (this.props.status !== 'RUNNING') {
      this.props.startGame();
      this.setInterval(this.nextTurn, 300);
    }
  }

  nextTurn () {
    if (this.props.status === 'RUNNING') {
      this.props.tick();
    } else {
      this.intervals.forEach(clearInterval);
    }
  }

  clearAllIntervals () {
    this.intervals.forEach(clearInterval);
  }

  canvasClicked (e) {
    const rawPoint = e.target.relMouseCoords(e);
    this.props.toggleCell(Math.floor(rawPoint.x / 8), Math.floor(rawPoint.y / 8));
  }

  /* eslint no-unused-vars: 0 */
  render () {
    const universe = this.refs.universe;
    const cellImage = this.refs.cellImage;
    const cells = this.props.cells;

    if (universe && cellImage && cells) {
      const universeContext = universe.getContext('2d');
      universeContext.clearRect(0, 0, this.props.gameWidth, this.props.gameHeight);

      cells.forEach(cell => {
        universeContext.drawImage(
          cellImage,
          cell.get(0) * 8,
          cell.get(1) * 8
        );
      })
    }

    const running = this.props.status === 'RUNNING';

    return (
      <div>
        <div className={styles.controls}>
          <div className={styles.label}>
            <span>Population: {this.props.cells.count()}</span>
          </div>
          <div className={styles.label}>
            <span>Generation: {this.props.generation}</span>
          </div>
          <div className={styles.hint}>
            <span>Click map to add/remove cells</span>
          </div>
          <div className={styles.buttons}>
            <button onClick={this.stopGame}
                    className={running ? styles.active : styles.inactive}
                    disabled={!running}>Stop</button>
            <button onClick={this.startGame}
                    className={running ? styles.inactive : styles.active}
                    disabled={running}>Play</button>
          </div>
          <canvas ref='cellImage' width='6' height='6' style={{ display : 'none' }} />
        </div>
        <canvas ref='universe' onClick={this.canvasClicked} width={this.props.gameWidth} height={this.props.gameHeight} />
      </div>
    )
  }
}

function loadCells (state) {
  return {
    cells : state.get('cells'),
    generation : state.get('generation'),
    status : state.get('status')
  }
}

function relMouseCoords (event) {
  let totalOffsetX = 0;
  let totalOffsetY = 0;
  let currentElement = event.target;

  do {
    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    currentElement = currentElement.offsetParent;
  }
  while (currentElement);

  const canvasX = event.pageX - totalOffsetX;
  const canvasY = event.pageY - totalOffsetY;

  return { x : canvasX, y : canvasY };
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

export const GameOfLifeContainer = connect(loadCells, actions)(GameOfLife);

