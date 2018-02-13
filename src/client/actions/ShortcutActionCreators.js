// @flow

import {KEYBOARD_SHORTCUT} from './Actions'
import type {Action} from '../Types'

export function keyboardShortcut(show: boolean): Action {
  return {type: KEYBOARD_SHORTCUT, show}
}
