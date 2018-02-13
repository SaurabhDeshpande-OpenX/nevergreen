// @flow

import {NOTIFICATION, NOTIFICATION_DISMISS} from '../actions/Actions'
import type {Action} from '../Types'

type State = ?string

const DEFAULT_STATE = null

export function reduce(state: State = DEFAULT_STATE, action: Action) {
  switch (action.type) {
    case NOTIFICATION:
      return action.message

    case NOTIFICATION_DISMISS:
      return null

    default:
      return state
  }
}
