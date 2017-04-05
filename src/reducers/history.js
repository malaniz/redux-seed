import { ADD_ENTRY } from '../constants'

export default (state=[], action) => {
  switch(action.type) {
    case ADD_ENTRY:
      console.log(action);
      return state.concat([action.entry]);
    default:
      return state
  }
}

