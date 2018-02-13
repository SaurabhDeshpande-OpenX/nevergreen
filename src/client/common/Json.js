// @flow

export function toJson(o: Object): string {
  return JSON.stringify(o, null, 2)
}

export function fromJson(s: string): Object {
  try {
    return JSON.parse(s)
  } catch (e) {
    throw e.message
  }
}
