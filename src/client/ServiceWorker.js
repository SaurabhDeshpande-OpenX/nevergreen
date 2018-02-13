// @flow

import {error, info} from './common/Logger'

export function registerServiceWorker() {
  if (
    navigator
    && navigator.serviceWorker
    && navigator.serviceWorker.register
  ) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing

        installingWorker.onstatechange = () => {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker && navigator.serviceWorker.controller) {
                info('New or updated content is available')
              } else {
                info('Content is now available offline')
              }
              break
            case 'redundant':
              info('The installing service worker became redundant')
              break
          }
        }
      }
      info('Service worker registration successful', registration)
    }).catch((err) => {
      error('Service worker registration failed', err)
    })
  }
}
