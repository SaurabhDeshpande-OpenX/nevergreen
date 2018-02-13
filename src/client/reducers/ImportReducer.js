// @flow

import * as Immutable from 'immutable'
import {IMPORT_ERROR, IMPORT_SUCCESS, IMPORTING, NAVIGATED} from '../actions/Actions'
import type {Action} from '../Types'

type State = Immutable.Map<string, mixed>

const DEFAULT_STATE = Immutable.Map({
  loaded: true
})

export function reduce(state: State = DEFAULT_STATE, action: Action) {
  switch (action.type) {
    case IMPORTING:
      return state.withMutations((map) =>
        map.set('loaded', false).delete('infos').delete('errors'))

    case IMPORT_SUCCESS:
      return state.withMutations((map) =>
        map.set('loaded', true).set('infos', action.messages).delete('errors'))

    case IMPORT_ERROR:
      return state.withMutations((map) =>
        map.set('loaded', true).delete('infos').set('errors', action.errors))

    case NAVIGATED:
      return state.withMutations((map) =>
        map.delete('infos').delete('errors'))

    default:
      return state
  }
}
