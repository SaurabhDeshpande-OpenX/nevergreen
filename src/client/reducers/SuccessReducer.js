// @flow

import * as Immutable from 'immutable'
import {IMPORT_SUCCESS, INITIALISED, MESSAGE_ADDED, MESSAGE_REMOVED} from '../actions/Actions'
import type {Action} from '../Types'

type State = Immutable.OrderedSet<string>

const DEFAULT_STATE = Immutable.OrderedSet(['=(^.^)='])

export function reduce(state: State = DEFAULT_STATE, action: Action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORT_SUCCESS: {
      const success = action.data.get('success')
      return success ? Immutable.OrderedSet(success) : state
    }

    case MESSAGE_ADDED:
      return state.add(action.message)

    case MESSAGE_REMOVED:
      return state.delete(action.message)

    default:
      return state
  }
}
