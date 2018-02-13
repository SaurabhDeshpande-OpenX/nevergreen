// @flow

import * as Immutable from 'immutable'
import {GITHUB_SET_DESCRIPTION, GITHUB_SET_GIST_ID, IMPORT_SUCCESS, INITIALISED} from '../actions/Actions'
import type {Action} from '../Types'

type State = Immutable.Map<string, mixed>

const DEFAULT_STATE = Immutable.Map({
  gistId: '',
  description: 'Nevergreen configuration backup'
})

export function reduce(state: State = DEFAULT_STATE, action: Action) {
  switch (action.type) {
    case INITIALISED:
      return state.merge(action.data.get('github'))

    case IMPORT_SUCCESS:
      return state.set('description', action.data.getIn(['github', 'description'], state.get('description')))

    case GITHUB_SET_DESCRIPTION:
      return state.set('description', action.description)

    case GITHUB_SET_GIST_ID:
      return state.set('gistId', action.gistId)

    default:
      return state
  }
}
