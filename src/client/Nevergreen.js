// @flow

import type {TimeoutID} from 'flow-typed'
import * as React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import Mousetrap from 'mousetrap'
import 'mousetrap/plugins/global-bind/mousetrap-global-bind'
import _ from 'lodash'
import styles from './nevergreen.scss'
import Timer from './common/Timer'
import Notification from './Notification'
import version from '../../resources/version.txt'
import {registerServiceWorker} from './ServiceWorker'

const ONE_SECONDS = 1000
const THREE_SECONDS = 3 * 1000
const TWENTY_FOUR_HOURS = 24 * 60 * 60

type Props = {
  children: React.Node,
  loaded?: boolean,
  notification: string,
  initalise: () => void,
  keyboardShortcut: (boolean) => void,
  checkForNewVersion: (string, string) => void,
  dismiss: () => void,
  history: {
    push: (string) => void
  },
  isFullScreen?: boolean,
  fullScreenRequested?: boolean,
  enableFullScreen: (?boolean) => void
};

type State = {
  fullScreenTimer?: TimeoutID
}

class Nevergreen extends React.Component<Props, State> {
  disableFullScreen: () => void

  constructor(props: Props) {
    super(props)
    this.state = {}
    this.disableFullScreen = _.throttle(this.disableFullScreen, ONE_SECONDS, {trailing: false}).bind(this)
  }

  checkVersion = () => {
    this.props.checkForNewVersion(version, window.location.hostname)
  }

  componentDidMount() {
    this.props.initalise()

    Mousetrap.bindGlobal('esc', () => {
      if (document.activeElement) {
        document.activeElement.blur()
      }
    })
    Mousetrap.bind('?', () => {
      this.props.keyboardShortcut(true)
      this.props.history.push('help')
    })

    registerServiceWorker()
  }

  componentWillUnmount() {
    Mousetrap.unbind(['?', 'esc'])
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.fullScreenRequested !== this.props.fullScreenRequested) {
      this.props.enableFullScreen(nextProps.fullScreenRequested)
    }
  }

  render() {
    return (
      <main className={styles.nevergreen} onMouseMove={this.disableFullScreen}>
        <Timer onTrigger={this.checkVersion} interval={TWENTY_FOUR_HOURS}/>
        <Header fullScreen={this.props.isFullScreen}/>
        <Notification notification={this.props.notification}
                      dismiss={this.props.dismiss}
                      fullScreen={this.props.isFullScreen}/>
        {this.props.loaded ? this.props.children : null}
        <Footer fullScreen={this.props.isFullScreen}/>
      </main>
    )
  }

  disableFullScreen() {
    clearTimeout(this.state.fullScreenTimer)
    if (this.props.isFullScreen) {
      this.props.enableFullScreen(false)
    }
    if (this.props.fullScreenRequested) {
      this.setState({fullScreenTimer: setTimeout(() => this.props.enableFullScreen(true), THREE_SECONDS)})
    }
  }
}

export default Nevergreen
