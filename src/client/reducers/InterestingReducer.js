// @flow

import * as Immutable from 'immutable'
import {INTERESTING_PROJECTS} from '../actions/Actions'
import type {Action} from '../Types'

type State = Immutable.Map<string, mixed>

const DEFAULT_STATE = Immutable.Map({
  projects: Immutable.List(),
  errors: Immutable.List(),
  loaded: false
})

export function reduce(state: State = DEFAULT_STATE, action: Action) {
  switch (action.type) {
    case INTERESTING_PROJECTS:
      return state.withMutations((map) =>
        map.set('loaded', true).set('projects', action.projects).set('errors', action.errors))

    default:
      return state
  }
}
