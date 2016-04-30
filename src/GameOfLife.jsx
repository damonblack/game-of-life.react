import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actionCreators'

const INIT_CELLS = [
  [24,21],[24,22],[24,23],[22,23],[22,21],[20,20],
  [21,20],[5,5],[3,3],[4,4],[3,2],[5,4],[2,2],
  [15,14],[16,14],[16,16],[15,17],[13,35],[11,33],
  [12,34],[11,32],[13,34],[10,32]
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
    this.props.toggleCell(e.pageX/8, e.pageY/8);
  }

  render() {
    let universe = this.refs.universe;
    let cellImage = this.refs.cellImage;
    let cells = this.props.cells;

    if (universe && cellImage && cells) {
      let universeContext = universe.getContext('2d');
      universeContext.clearRect(0,0, 400, 400);

      cells.forEach( (cell) => {
        universeContext.drawImage(
          cellImage,
          cell.get(0) * 8,
          cell.get(1) * 8
        );
      });
    }

    return (
      <div>
        <button onClick={this.stopGame}>Stop</button>
        <button onClick={this.startGame}>Play</button>
        <span>Population: {this.props.cells.count()}</span>
        <canvas ref='cellImage' width='5' height='5' />
        <canvas ref='universe' onClick={this.canvasClicked} width='600' height='400' />
      </div>
    );
  }
}

function loadCells(state) {
  return {
    cells: state.get('cells'),
    status: state.get('status')
  }
}

export const GameOfLifeContainer = connect(loadCells, actions)(GameOfLife);
