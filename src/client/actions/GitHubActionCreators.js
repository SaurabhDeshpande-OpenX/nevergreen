// @flow

import {GITHUB_SET_DESCRIPTION, GITHUB_SET_GIST_ID} from './Actions'
import type {SetDescriptionIdAction, SetGistIdAction} from '../Types'

export function gitHubSetGistId(gistId: string): SetGistIdAction {
  return {type: GITHUB_SET_GIST_ID, gistId}
}

export function gitHubSetDescription(description: string): SetDescriptionIdAction {
  return {type: GITHUB_SET_DESCRIPTION, description}
}
