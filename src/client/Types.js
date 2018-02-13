import type {Dispatch} from 'redux'
import type {List, Map} from 'immutable'
import type {SyntheticEvent} from 'react'
import * as Actions from './actions/Actions'

// gateways

export type HttpResponse<T> = {
  body: T
}

export type HttpRequest<T> = {
  abort: () => void,
  then: (HttpResponse<T>) => mixed,
  catch: (HttpResponse<T>) => mixed
}

// react

export type InputEvent = SyntheticEvent<HTMLInputElement>

// redux

export type Store = Map

export type ThunkAction = (dispatch: Dispatch<Action>) => mixed
export type ExportingAction = { type: typeof Actions.EXPORTING }
export type ExportSuccessAction = { type: typeof Actions.EXPORT_SUCCESS, messages: List<string> }
export type ExportErrorAction = { type: typeof Actions.EXPORT_ERROR, errors: List<string> }
export type SetGistIdAction = { type: typeof Actions.GITHUB_SET_GIST_ID, gistId: string }
export type SetDescriptionIdAction = { type: typeof Actions.GITHUB_SET_DESCRIPTION, description: string }
export type ImportingAction = { type: typeof Actions.IMPORTING }
export type ImportErrorAction = { type: typeof Actions.IMPORT_ERROR, errors: List<string> }
export type Action =
  | ExportingAction
  | ExportSuccessAction
  | ExportErrorAction
  | SetGistIdAction
  | SetDescriptionIdAction
  | ImportingAction
  | ImportErrorAction
  | { type: string }

// domain

export type Project = {
  projectId: string,
  trayId: string,
  name: string,
  stage?: string,
  serverType: string,
  isNew: boolean,
  removed: boolean,
  prognosis: 'sick' | 'healthy-building' | 'sick-building' | 'unknown'
}

export type Tray = {
  trayId: string,
  url: string,
  username?: string,
  password?: string,
  serverType?: string,
  included: string[]
}
