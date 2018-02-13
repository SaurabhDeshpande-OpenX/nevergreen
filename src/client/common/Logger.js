// @flow
/* eslint-disable no-console */

export function debug(message: string, ...data: mixed[]): void {
  if (process.env.NODE_ENV !== 'production') {
    if (console.debug) {
      console.debug(message, data)
    }
  }
}

export function info(message: string, ...data: mixed[]): void {
  if (process.env.NODE_ENV !== 'production') {
    console.info(message, data)
  }
}

export function warn(message: string, ...data: mixed[]): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message, data)
  }
}

export function error(message: string, e: mixed): void {
  if (process.env.NODE_ENV !== 'production') {
    console.error(message, e)
  }
}
