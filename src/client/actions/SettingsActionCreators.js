// @flow

import {
  BROKEN_BUILD_SOUND_FX,
  PLAY_BROKEN_BUILD_SOUND_FX,
  REFRESH_TIME,
  SHOW_BROKEN_BUILD_TIME,
  SHOW_BUILD_LABEL,
  SHOW_TRAY_NAME
} from './Actions'
import type {Action} from '../Types'

export const MIN_REFRESH_TIME = 5
export const VALID_REFRESH_TIMES = [5, 10, 30, 60, 300, 600, 1800, 3600, 43200, 86400]

function absoluteClosestNumber(actual: number, a: number, b: number): number {
  return Math.abs(b - actual) < Math.abs(a - actual) ? b : a
}

export function setShowBrokenBuildTime(value: boolean): Action {
  return {type: SHOW_BROKEN_BUILD_TIME, value}
}

export function setShowTrayName(value: boolean): Action {
  return {type: SHOW_TRAY_NAME, value}
}

export function setPlayBrokenBuildSoundFx(value: boolean): Action {
  return {type: PLAY_BROKEN_BUILD_SOUND_FX, value}
}

export function setBrokenBuildSoundFx(value: string): Action {
  return {type: BROKEN_BUILD_SOUND_FX, value}
}

export function setRefreshTime(value: string): Action {
  const intValue = parseInt(value)
  const closestMatch = VALID_REFRESH_TIMES.reduce((prev, curr) => absoluteClosestNumber(intValue, prev, curr))
  return {type: REFRESH_TIME, value: closestMatch}
}

export function setShowBuildLabel(value: boolean): Action {
  return {type: SHOW_BUILD_LABEL, value}
}
