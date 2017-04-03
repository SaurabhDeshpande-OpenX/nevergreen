import Immutable from 'immutable'
import {IMPORT_ERROR, IMPORT_SUCCESS, IMPORTING} from '../actions/ImportActions'

const DefaultState = Immutable.Map()

export function reduce(state = DefaultState, action) {
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

    default:
      return state
  }
}
