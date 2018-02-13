// @flow

import {get, patch, post} from './Gateway'
import type {HttpRequest} from '../../Types'

type Gist = {
  id: string,
  files: {
    'configuration.json': {
      size: number,
      truncated: boolean,
      raw_url: string
    }
  },
  description: string,
}

const gistApiUrl = 'https://api.github.com/gists'
const mimeType = 'application/vnd.github.v3+json'

export function createGist(description: string, configuration: string, oauthToken: string): HttpRequest<Gist> {
  const data = {
    description,
    'public': false,
    files: {
      'configuration.json': {
        content: configuration
      }
    }
  }

  return post(gistApiUrl, data, {Authorization: `token ${oauthToken}`, Accept: mimeType})
}

export function updateGist(gistId: string, description: string, configuration: string, oauthToken: string): HttpRequest<Gist> {
  const data = {
    description,
    files: {
      'configuration.json': {
        content: configuration
      }
    }
  }

  return patch(`${gistApiUrl}/${gistId}`, data, {Authorization: `token ${oauthToken}`, Accept: mimeType})
}

export function getGist(gistId: string): HttpRequest<Gist> {
  return get(`${gistApiUrl}/${gistId}`, {Accept: mimeType})
}

export function getTruncatedFile(url: string): HttpRequest<string> {
  return get(url, {Accept: 'text/plain; charset=utf-8'})
}
