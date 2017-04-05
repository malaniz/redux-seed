import React from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionInfo from 'material-ui/svg-icons/action/info';

import Time from 'react-time'

import { action } from '../constants'

const style = {
  card: {
    paddingTop: '5px',
    header: {
      padding: '15px',
      backgroundColor: 'rgb(0, 188, 212)',
      color: 'white',
      h1: {
        fontSize: '2em',
        color: "white",
      },
      h3: {
        fontSize: '1em',
        color: "white",
      },
    },
    content: {
      padding: '15px',
      backgroundColor: 'white',
      color: 'black',
    }
  },
}
class History extends React.Component {
  render() {
    console.log(this.props);
    return (<Card>
      {this.props.history.map((x, index) => (
        <Card key={index} style={style.card}>
          <div style={style.card.header}>
            <h1>{x.title}</h1>
            <h3><Time value={new Date(x.at)} format="dddd Do, HH:mm" />hs</h3>
          </div>
          <div style={style.card.content}>
            <p>{x.minutes} minutes</p>
          </div>
        </Card>
      ))}
    </Card>)
  }
}

export default connect(state => state, {
})(History)
