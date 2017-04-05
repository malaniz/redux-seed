import { TAB_POMODORO } from '../constants'

export default (state, action) => {
  if (!state) {
    return TAB_POMODORO
  }
  return action.type
}
