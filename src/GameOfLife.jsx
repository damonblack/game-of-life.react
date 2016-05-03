import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actionCreators'
import * as styles from './app.css'

const INIT_CELLS = [
  [54,36],[55,36],[57,35],[58,36],[59,36],[60,36],[55,34]
];


export class GameOfLife extends Component {
  constructor() {
    super(arguments)
    _.bindAll(this, ['nextTurn', 'startGame', 'stopGame', 'clearAllIntervals', 'canvasClicked'])
  }

  componentDidMount() {
    let cellContext = this.refs.cellImage.getContext('2d');
    cellContext.fillStyle = "black";
    cellContext.fillRect(0,0,5,5);

    this.props.setState({ cells: INIT_CELLS });
  }

  componentWillMount() {
    this.intervals = []
  }

  setInterval () {
    this.intervals.push(setInterval.apply(null, arguments));
  }

  componentWillUnmount() {
    this.clearAllIntervals();
  }

  stopGame() {
    this.clearAllIntervals();
    this.props.stopGame();
  }

  startGame() {
    if (this.props.status !== 'RUNNING') {
      this.props.startGame();
      this.setInterval(this.nextTurn, 300);
    }
  }

  nextTurn() {
    if (this.props.status === 'RUNNING') {
      this.props.tick();
    } else {
      this.intervals.forEach(clearInterval);
    }
  }

  clearAllIntervals() {
    this.intervals.forEach(clearInterval);
  }

  canvasClicked(e) {
    let rawPoint = e.target.relMouseCoords(e);
    this.props.toggleCell(Math.floor(rawPoint.x/8), Math.floor(rawPoint.y/8));
  }

  render() {
    let universe = this.refs.universe;
    let cellImage = this.refs.cellImage;
    let cells = this.props.cells;

    if (universe && cellImage && cells) {
      let universeContext = universe.getContext('2d');
      universeContext.clearRect(0,0, 1200, 1000);

      cells.forEach( (cell) => {
        universeContext.drawImage(
          cellImage,
          cell.get(0) * 8,
          cell.get(1) * 8
        );
      });
    }

    let running = this.props.status === 'RUNNING';
    return (
      <div>
        <div className={styles.controls}>
          <button onClick={this.stopGame}
                  className={ running ? styles.active : styles.inactive }
                  disabled={ !running }>Stop</button>
          <button onClick={this.startGame}
                  className={ running ? styles.inactive : styles.active }
                  disabled={ running }>Play</button>
          <span className={styles.label}>Population: {this.props.cells.count()}</span>
          <span className={styles.label}>Generation: {this.props.generation}</span>
          <canvas ref='cellImage' width='5' height='5' style={ {display: "none"} } />
        </div>
        <canvas ref='universe' onClick={this.canvasClicked} width='1200' height='1000' />
      </div>
    );
  }
}

function loadCells(state) {
  return {
    cells: state.get('cells'),
    generation: state.get('generation'),
    status: state.get('status')
  }
}

function relMouseCoords(event){
  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var canvasX = 0;
  var canvasY = 0;
  var currentElement = this;

  do{
    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
  }
  while(currentElement = currentElement.offsetParent)

  canvasX = event.pageX - totalOffsetX;
  canvasY = event.pageY - totalOffsetY;

  return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

export const GameOfLifeContainer = connect(loadCells, actions)(GameOfLife);

