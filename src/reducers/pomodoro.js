import {
  START_POMODORO,
  SECOND_ELAPSED,

  ZERO,
  STARTED,
  PAUSED,
  FINISHED,
  CANCELED,

  PAUSED_POMODORO,
  CANCEL_POMODORO,
  RESUME_POMODORO,
} from '../constants'

const update = (state, newState) => Object.assign({}, state, newState)

export default (state={status: ZERO}, action) => {
  switch(action.type) {
    case START_POMODORO:
      return update(state, { 
        at: new Date(),
        secondsRemaining: action.minutes * 60, 
        status: STARTED, 
        title: action.title, 
        minutes: action.minutes 
      })
    case SECOND_ELAPSED:
      if (state.status === PAUSED) {
        return state;
      } else if (state.secondsRemaining === 0) {
        return update(state, { 
          status: FINISHED 
        })
      } else {
        return update(state,{ 
          secondsRemaining: state.secondsRemaining-1 
        })
      }
  
    case PAUSED_POMODORO: 
      return update(state, { 
        status: PAUSED 
      })
    case RESUME_POMODORO:
      return update(state, { 
        status: ZERO 
      })
    case CANCEL_POMODORO:
      return update(state, { 
        status: ZERO 
      });
    default:
      return state
  }
}
