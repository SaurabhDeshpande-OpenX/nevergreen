// @flow

import * as Immutable from 'immutable'
import {
  IMPORT_SUCCESS,
  INITIALISED,
  PROJECTS_FETCHED,
  REMOVE_TRAY,
  SELECT_PROJECT,
  SET_TRAY_ID,
  TRAY_ADDED
} from '../actions/Actions'
import type {Action} from '../Types'

type State = Immutable.Map<string, Immutable.Set<String>>

const DEFAULT_STATE = Immutable.Map()

export function reduce(state: State = DEFAULT_STATE, action: Action) {
  switch (action.type) {
    case INITIALISED:
    case IMPORT_SUCCESS: {
      const selected = action.data.get('selected')
      return selected ? Immutable.Map(selected).map((included) => included.toSet()) : state
    }

    case TRAY_ADDED:
      return state.set(action.trayId, Immutable.Set())

    case REMOVE_TRAY:
      return state.delete(action.trayId)

    case SELECT_PROJECT:
      return state.update(action.trayId, (included) =>
        action.selected ? included.add(action.projectId) : included.delete(action.projectId))

    case PROJECTS_FETCHED: {
      const currentUrls = action.data.map((project) => project.get('projectId'))
      return state.update(action.trayId, (included) => included.filter((projectId) => currentUrls.includes(projectId)))
    }

    case SET_TRAY_ID:
      return state.mapKeys((key) => key === action.originalTrayId ? action.newTrayId : key)

    default:
      return state
  }
}
