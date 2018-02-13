// @flow

import * as Immutable from 'immutable'
import LocalRepository from '../common/repo/LocalRepository'
import {filter} from '../common/repo/Data'
import {migrate} from '../common/repo/Migrations'
import {FULL_SCREEN, INITIALISED, INITIALISING, NAVIGATED, REQUEST_FULL_SCREEN} from './Actions'
import type {Action, ThunkAction} from '../Types'

export function initalising(): Action {
  return {type: INITIALISING}
}

export function initalised(configuration: Object): Action {
  return {type: INITIALISED, data: Immutable.fromJS(configuration)}
}

export function navigated(): Action {
  return {type: NAVIGATED}
}

export function initalise(): ThunkAction {
  return function (dispatch) {
    dispatch(initalising())
    return LocalRepository.init()
      .then(LocalRepository.load)
      .then((configuration) => dispatch(initalised(filter(migrate(configuration)))))
      .catch(() => {
        // TODO: handle loading configuration failure
      })
  }
}

export function enableFullScreen(enabled: boolean): Action {
  return {type: FULL_SCREEN, enabled}
}

export function requestFullScreen(requested: boolean): Action {
  return {type: REQUEST_FULL_SCREEN, requested}
}
