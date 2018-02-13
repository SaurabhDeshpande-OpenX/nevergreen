// @flow

import {MESSAGE_ADDED, MESSAGE_REMOVED, NOOP} from './Actions'
import {isBlank} from '../common/Utils'
import type {Action} from '../Types'

const SPACES = / /g
const NON_BREAKING_SPACE = String.fromCharCode(160)

function isSentenceLike(message: string): boolean {
  const numberOfLetters = (message.match(/[A-Za-z]/g) || []).length
  return (numberOfLetters / message.length) > 0.3
}

function transformMessage(message: string): string {
  return isSentenceLike(message) ? message : message.replace(SPACES, NON_BREAKING_SPACE)
}

export function addMessage(message: string): Action {
  if (isBlank(message)) {
    return {type: NOOP}
  } else {
    return {type: MESSAGE_ADDED, message: transformMessage(message)}
  }
}

export function removeMessage(message: string): Action {
  return {type: MESSAGE_REMOVED, message: transformMessage(message)}
}
