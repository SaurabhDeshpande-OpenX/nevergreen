// @flow

import {post} from './Gateway'
import type {HttpRequest} from '../../Types'

export function encryptPassword(password: string): HttpRequest<{ password: string }> {
  return post('/api/encrypt', {password})
}
