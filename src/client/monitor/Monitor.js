// @flow

import React, {Component} from 'react'
import classNames from 'classnames'
import InterestingProjects from './InterestingProjects'
import Success from './Success'
import Loading from '../common/loading/Loading'
import styles from './monitor.scss'
import Timer from '../common/Timer'
import _ from 'lodash'
import type {Project, Tray} from '../Types'

type Props = {
  loaded?: boolean,
  errors: string[],
  trays: Tray[],
  selected: string[],
  projects: Project[],
  showBrokenBuildTimers?: boolean,
  showTrayName?: boolean,
  showBuildLabel?: boolean,
  playBrokenBuildSounds?: boolean,
  brokenBuildFx?: string,
  messages: string[],
  fetchInteresting: (Tray[], string[]) => void,
  refreshTime: number,
  requestFullScreen: (boolean) => void,
  isFullScreen: boolean
}

class Monitor extends Component<Props> {
  fetch = () => {
    this.props.fetchInteresting(this.props.trays, this.props.selected)
  }

  componentDidMount() {
    this.props.requestFullScreen(true)
  }

  componentWillUnmount() {
    this.props.requestFullScreen(false)
  }

  render() {
    const monitorClassNames = classNames(styles.monitor, {[styles.fullscreen]: this.props.isFullScreen})

    let content

    if (_.isEmpty(this.props.projects) && _.isEmpty(this.props.errors)) {
      content = <Success messages={this.props.messages}/>
    } else {
      content = <InterestingProjects {...this.props}/>
    }

    return (
      <div className={monitorClassNames} aria-live='polite' aria-relevant='additions removals'>
        <Timer onTrigger={this.fetch} interval={this.props.refreshTime}/>
        <Loading loaded={this.props.loaded}>
          {content}
        </Loading>
      </div>
    )
  }
}

export default Monitor
