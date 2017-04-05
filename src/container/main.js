import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

import History from './history'
import Pomodoro from './pomodoro'
import { TAB_HISTORY, TAB_POMODORO, action } from '../constants'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  titleApp: {
    padding: '15px',
    backgroundColor: 'rgb(0, 188, 212)',
    color: 'white',
    fontSize: '2em',
    margin: '0px'
  }
}
class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'pomodoro',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (value) {
    switch(value) {
      case 'pomodoro': this.props.pomodoroTab(); break;
      case 'history': this.props.historyTab(); break;
    }
    this.setState({
      value,
    });
  }
  render() {
    return (
    <div style={style.root}>
      <div>
      <h1 style={style.titleApp}>Pomodoro App</h1>
      <Tabs 
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Pomodoro" value="pomodoro">
          <Pomodoro />
        </Tab>
        <Tab label="History" value="history">
          <History />
        </Tab>
      </Tabs>
      </div>
    </div>)
  }
}

export default connect(state => state, {
  pomodoroTab: action(TAB_POMODORO),
  historyTab: action(TAB_HISTORY)
})(MainContainer)
