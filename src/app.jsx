import React, { Component } from 'react'
import { List } from 'immutable'
import { render } from 'react-dom'
import { compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { GameOfLifeContainer } from './GameOfLife'
import cellReducer from './cellReducer'


const createStoreWithDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithDevTools(cellReducer);

store.dispatch({
  type: 'SET_STATE',
  state: {
    cells: List(),
    generation: 0,
    status: 'STOPPED'
  }
})

export default class App extends Component {

  render () {
    return (
      <Provider store={store}>
        <GameOfLifeContainer />
      </Provider>
    );
  }

}

if (process.env.NODE_ENV !== 'test')
  render(<App />, document.getElementById('main'));

