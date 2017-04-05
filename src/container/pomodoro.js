import React from 'react'
import { connect } from 'react-redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconPlay from 'material-ui/svg-icons/av/play-arrow';
import IconPause from 'material-ui/svg-icons/av/pause';

import { 
  ZERO, 
  STARTED, 
  PAUSED, 
  FINISHED, 
  SECOND_ELAPSED, 
  PAUSED_POMODORO,
  CANCEL_POMODORO,
  RESUME_POMODORO,
  action, 
  start, 
  addTask,
} from '../constants'


const style = {
  buttonPlay: {
    marginLeft: '35%',
  },
  buttonPause: {
    display: 'block',
    float: 'right',
    marginTop: '-5px',
  },
  buttonContinue: {
    marginLeft:  '25%',
  },
  counter: {
    fontSize: '2.5em',
    textAlign: 'center',
  },
  counterRed: {
    fontSize: '2.5em',
    textAlign: 'center',
    color: 'red',
  },
  spacer: {
    display: 'inline-block',
    width: '40%',
  },
}

class Pomodoro extends React.Component {


  constructor(props) {
    super(props);
    this.state = { minutes: 25, title: '' };
    this.updateMinutes = this.updateMinutes.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.zero = this.zero.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.cancel = this.cancel.bind(this);
    this.next = this.next.bind(this);
    this.done = this.done.bind(this);
  }

  updateMinutes(e) {
    this.setState({ minutes: e.target.value })
  }

  updateTitle(e) {
    this.setState({ title: e.target.value })
  }

  zero () {
    this.props.pomodoroZero();
  }

  done () {
    this.props.pomodoroAddTask(this.props.pomodoro);
    this.props.pomodoroZero();
  }

  start() {
    const that = this;
    this.props.pomodoroStart(this.state);  
    this._timer = setInterval(function() {
      that.props.pomodoroStep();
      console.log(that.props.pomodoro);
      if (that.props.pomodoro.status === FINISHED) {
        clearInterval(that._timer)
      }
    }, 100);
  }

  pause() {
    clearInterval(this._timer);
    this.props.pomodoroPause();
  }

  cancel() {
    if (this._timer) {
      clearInterval(this._timer);
    }
    this.props.pomodoroCancel();
  }

  next() {
    if (this._timer) {
      clearInterval(this._timer);
    }
    this.start();
  }

  render() {
    return (<div>
        {(this.props.pomodoro.status === ZERO) && 
          <div>
            <Card>
              <CardHeader
                title="Start a new Pomodoro"
                actAsExpander={false}
                showExpandableButton={false}
              />
              <CardActions>
                <TextField
                  hintText="Minutes"
                  floatingLabelText="Minutes"
                  value={this.state.minutes}
                  onChange={this.updateMinutes}
                /><br />
                <TextField
                  hintText="Title"
                  floatingLabelText="Title"
                  value={this.state.title}
                  onChange={this.updateTitle}
                /><br />
                <FloatingActionButton onClick={this.start} style={style.buttonPlay}>
                  <IconPlay />
                </FloatingActionButton> || 
              </CardActions>
            </Card>
          </div>
        || ((this.props.pomodoro.status === STARTED) || (this.props.pomodoro.status === PAUSED)) && 
          <div> 
            <Card>
              <CardHeader
                title="Running Pomodoro"
                subtitle={this.state.title}
                actAsExpander={false}
                showExpandableButton={false}
              />
              <CardActions>
                <h3 style={style.counter}> 
                  {("0" + Math.floor(this.props.pomodoro.secondsRemaining /60)).slice(-2)} 
                  : 
                  {("0" + (this.props.pomodoro.secondsRemaining %60)).slice(-2)}
                </h3>
                <br />
                <div>
                  <RaisedButton label="Cancel" secondary={true} onClick={this.cancel} />
                  <span style={style.spacer}></span>
                  { (this.props.pomodoro.status !== PAUSED) &&
                    <FloatingActionButton onClick={this.pause} mini={true} style={style.buttonPause}>
                      <IconPause />
                    </FloatingActionButton> || 
                    <FloatingActionButton onClick={this.start} mini={true} style={style.buttonPause}>
                      <IconPlay />
                    </FloatingActionButton> 
                  }
                </div>
e             </CardActions>
            </Card>
          </div>
        || (this.props.pomodoro.status === FINISHED) &&
          <div>
            <Card>
              <CardHeader
                title="Time is up!"
                subtitle={this.state.title}
                actAsExpander={false}
                showExpandableButton={false}
              />
              <CardActions>
                <h3 style={style.counterRed}> 00:00</h3>
                <RaisedButton label="CONTINUE" primary={true} onClick={this.done} style={style.buttonContinue}/>
              </CardActions>
            </Card>
          </div>
        }

    </div>)
  }
}

export default connect(state => state, {
  pomodoroZero: action(RESUME_POMODORO),
  pomodoroStart: start,
  pomodoroAddTask: addTask,
  pomodoroStep: action(SECOND_ELAPSED),
  pomodoroPause: action(PAUSED_POMODORO),
  pomodoroCancel: action(CANCEL_POMODORO),
})(Pomodoro)
