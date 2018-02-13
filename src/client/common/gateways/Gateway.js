// @flow

import superagent from 'superagent'
import * as log from '../Logger'
import _ from 'lodash'
import type {HttpRequest, HttpResponse} from '../../Types'

type Headers = {
  [string]: string
}

const THIRTY_SECONDS = 1000 * 30
const THREE_MINUTES = 1000 * 60 * 60 * 3
const TIMEOUT = {
  response: THIRTY_SECONDS,
  deadline: THREE_MINUTES
}
const ACCEPT_HEADER = 'application/json; charset=utf-8'

export function post<T>(url: string, data: mixed, headers: Headers = {}): HttpRequest<T> {
  return superagent
    .post(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type('application/json; charset=utf-8')
    .set(headers)
    .timeout(TIMEOUT)
}

export function patch<T>(url: string, data: mixed, headers: Headers = {}): HttpRequest<T> {
  return superagent
    .patch(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type('application/json; charset=utf-8')
    .set(headers)
    .timeout(TIMEOUT)
}

export function get<T>(url: string, headers: Headers = {}): HttpRequest<T> {
  return superagent
    .get(url)
    .accept(ACCEPT_HEADER)
    .set(headers)
    .timeout(TIMEOUT)
}

export function send<T>(request: HttpRequest<T>): Promise<T> {
  return request.then((res: HttpResponse<T>): Promise<T> => {
    return res.body
  }).catch((err) => {
    log.error('An unhandled exception was thrown from the server', err)
    const status = err.status || 0
    const message = _.get(err, 'response.body.error', 'timeout')
    throw {status, message}
  })
}

export function fakeResponse<T>(body: T): Promise<HttpResponse<T>> {
  return Promise.resolve({body})
}
