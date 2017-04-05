export const START_POMODORO = 'START_POMODORO'
export const SECOND_ELAPSED = 'SECOND_ELAPSED'
export const ZERO = 'ZERO'
export const STARTED = 'STARTED'
export const PAUSED = 'PAUSED'
export const FINISHED = 'FINISHED'
export const CANCELED = 'CANCELED'
export const PAUSED_POMODORO = 'PAUSED_POMODORO'
export const CANCEL_POMODORO = 'CANCEL_POMODORO'
export const RESUME_POMODORO = 'RESUME_POMODORO'

export const TAB_POMODORO = 'TAB_POMODORO'
export const TAB_HISTORY = 'TAB_HISTORY'

export const action = (type) => () => ({ type })

export function start(pomData) {
  return {
    type: START_POMODORO,
    minutes: pomData.minutes,
    title: pomData.title,
  };
}

export const ADD_ENTRY = 'ADD_ENTRY'
export function addTask (data) {
  return {
    type: ADD_ENTRY,
    entry: data,
  };
}
