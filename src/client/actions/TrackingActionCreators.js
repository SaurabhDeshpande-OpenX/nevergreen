// @flow

import * as Immutable from 'immutable'
import {encryptPassword as encrypt} from '../common/gateways/SecurityGateway'
import {fetchAll} from '../common/gateways/ProjectsGateway'
import {send} from '../common/gateways/Gateway'
import {isBlank, now} from '../common/Utils'
import {generateRandomName} from '../common/project/Name'
import _ from 'lodash'
import {
  ENCRYPTING_PASSWORD,
  HIGHLIGHT_TRAY,
  PASSWORD_ENCRYPT_ERROR,
  PASSWORD_ENCRYPTED,
  PROJECTS_FETCH_ERROR,
  PROJECTS_FETCHED,
  PROJECTS_FETCHING,
  REMOVE_TRAY,
  SELECT_PROJECT,
  SET_SERVER_TYPE,
  SET_TRAY_ID,
  SET_TRAY_NAME,
  SET_TRAY_URL,
  SET_TRAY_USERNAME,
  TRAY_ADDED
} from './Actions'
import type {Action, HttpRequest, Project, ThunkAction, Tray} from '../Types'

function hasScheme(url: string): boolean {
  return _.size(_.split(url, '://')) > 1
}

function abortPendingRequest(req: ?HttpRequest): void {
  if (req) {
    req.abort()
  }
}

export function trayAdded(trayId: string, url: string, username: string): Action {
  return {
    type: TRAY_ADDED,
    trayId,
    data: Immutable.Map({trayId, url, username, name: generateRandomName(), highlight: true})
  }
}

export function highlightTray(trayId: string): Action {
  return {type: HIGHLIGHT_TRAY, trayId}
}

export function encryptingPassword(trayId: string, password: string, request: ?HttpRequest): Action {
  return {type: ENCRYPTING_PASSWORD, trayId, password, request}
}

export function passwordEncrypted(trayId: string, password: string): Action {
  return {type: PASSWORD_ENCRYPTED, trayId, password}
}

export function passwordEncryptError(trayId: string, errors: string[]): Action {
  return {type: PASSWORD_ENCRYPT_ERROR, trayId, errors: Immutable.List(errors)}
}

export function removeTray(trayId: string, pendingRequest: ?HttpRequest): Action {
  abortPendingRequest(pendingRequest)
  return {type: REMOVE_TRAY, trayId}
}

export function projectsFetching(trayId: string, request: ?HttpRequest): Action {
  return {type: PROJECTS_FETCHING, trayId, request}
}

export function projectsFetched(trayId: string, projects: Project[]): Action {
  const data = Immutable.fromJS(projects)
  const serverType = projects[0] ? projects[0].serverType : ''
  return {type: PROJECTS_FETCHED, trayId, data, serverType, timestamp: now()}
}

export function projectsFetchError(trayId: string, errors: string[]): Action {
  return {type: PROJECTS_FETCH_ERROR, trayId, errors: Immutable.List(errors)}
}

export function setTrayName(trayId: string, name: string): Action {
  return {type: SET_TRAY_NAME, trayId, name}
}

export function setServerType(trayId: string, serverType: string): Action {
  return {type: SET_SERVER_TYPE, trayId, serverType}
}

export function setTrayUsername(trayId: string, username: string): Action {
  return {type: SET_TRAY_USERNAME, trayId, username}
}

export function setTrayUrl(trayId: string, url: string): Action {
  return {type: SET_TRAY_URL, trayId, url}
}

export function setTrayId(originalTrayId: string, newTrayId: string): Action {
  return {type: SET_TRAY_ID, originalTrayId, newTrayId}
}

export function selectProject(trayId: string, projectId: string, selected: boolean): Action {
  return {type: SELECT_PROJECT, trayId, projectId, selected}
}

export function updateTrayId(tray: Tray, newTrayId: string, pendingRequest: ?HttpRequest): ThunkAction {
  return function (dispatch) {
    dispatch(setTrayId(tray.trayId, newTrayId))
    const updatedTray = {...tray, trayId: newTrayId}
    dispatch(refreshTray(updatedTray, pendingRequest))
  }
}

export function encryptPassword(trayId: string, password: string, pendingRequest: ?HttpRequest): ThunkAction {
  abortPendingRequest(pendingRequest)

  return function (dispatch) {
    if (!isBlank(password)) {
      const request = encrypt(password)

      dispatch(encryptingPassword(trayId, password, request))

      return send(request).then((data) => {
        dispatch(passwordEncrypted(trayId, data.password))
        return data.password
      }).catch((error) => dispatch(passwordEncryptError(trayId, [`nevergreen server ${error.status} ${error.message}`])))
    } else {
      dispatch(passwordEncrypted(trayId, ''))
      return Promise.resolve('')
    }
  }
}

export function addTray(enteredUrl: string, username: string, rawPassword: string, existingTrays: Tray[]): ThunkAction {
  return function (dispatch) {
    const url = hasScheme(enteredUrl) ? enteredUrl : 'http://' + enteredUrl
    const trayId = url

    if (_.includes(existingTrays, trayId)) {
      dispatch(highlightTray(trayId))
    } else {
      dispatch(trayAdded(trayId, url, username))

      if (!isBlank(rawPassword)) {
        return dispatch(encryptPassword(trayId, rawPassword))
          .then((encryptedPassword) => dispatch(refreshTray({trayId, url, username, password: encryptedPassword})))
      } else {
        return dispatch(refreshTray({trayId, url, username}))
      }
    }
  }
}

export function refreshTray(tray: Tray, pendingRequest: ?HttpRequest): ThunkAction {
  abortPendingRequest(pendingRequest)

  return function (dispatch) {
    const trayId = tray.trayId
    const request = fetchAll([tray])

    dispatch(projectsFetching(trayId, request))

    return send(request).then((json) => {
      const filteredProjects = json.filter((project) => !project.job)
      const errors = json.filter((project) => project.error).map((project) => project.error)
      if (_.isEmpty(errors)) {
        return dispatch(projectsFetched(trayId, filteredProjects))
      } else {
        return dispatch(projectsFetchError(trayId, errors))
      }
    }).catch((error) => dispatch(projectsFetchError(trayId, [`nevergreen server ${error.status} ${error.message}`])))
  }
}
