import React from 'react'
import { Grid, Row, Cell } from 'react-inline-grid';

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'

import tabs from './reducers/tabs'
import pomodoro from './reducers/pomodoro'
import history from './reducers/history'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainContainer from './container/main'

const store = createStore(combineReducers({
  tabs, 
  history,
  pomodoro,
}))

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <MainContainer />
    </MuiThemeProvider>
  </Provider>, document.getElementById('root')
)
