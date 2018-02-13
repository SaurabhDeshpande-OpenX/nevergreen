// @flow

import _ from 'lodash'
import nameGenerator from 'project-name-generator'

export function generateRandomName(): string {
  return _.lowerCase(nameGenerator().spaced)
}
