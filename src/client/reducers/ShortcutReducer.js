// @flow

import {KEYBOARD_SHORTCUT} from '../actions/Actions'
import type {Action} from '../Types'

type State = boolean

const DEFAULT_STATE = false

export function reduce(state: State = DEFAULT_STATE, action: Action) {
  switch (action.type) {
    case KEYBOARD_SHORTCUT:
      return action.show

    default:
      return state
  }
}
