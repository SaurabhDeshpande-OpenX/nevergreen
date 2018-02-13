// @flow

import React, {Component} from 'react'
import classNames from 'classnames'
import styles from './interesting-project.scss'
import {isBlank} from '../Utils'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

type Props = {
  prognosis: 'sick' | 'healthy-building' | 'sick-building' | 'unknown',
  name: string,
  stage?: ?string,
  trayName?: ?string,
  lastBuildTime?: string,
  lastBuildLabel?: string,
  showBrokenBuildTimers: boolean,
  showTrayName: boolean,
  showBuildLabel: boolean
}

function shorten(distance: string): string {
  return distance
    .replace('less than a', '<1')
    .replace('about ', '')
    .replace('almost ', '')
    .replace('over ', '>')
    .replace(/ minutes?/, 'm')
    .replace(/ hours?/, 'h')
    .replace(/ days?/, 'd')
    .replace(/ months?/, 'mo')
    .replace(/ years?/, 'y')
}

class InterestingProject extends Component<Props> {
  render() {
    const {lastBuildTime} = this.props
    const classes = classNames(styles.interestingProject, styles[this.props.prognosis])
    const isSick = this.props.prognosis === 'sick'

    const trayName = this.props.showTrayName && !isBlank(this.props.trayName) ?
      <span data-locator='tray-name'>{this.props.trayName} </span> : null

    const stage = this.props.stage ? <span data-locator='project-stage'> {this.props.stage}</span> : null

    // $FlowFixMe
    const timeBrokenLabel = isBlank(lastBuildTime) ? '??' : shorten(distanceInWordsToNow(lastBuildTime))

    const timeBroken = this.props.showBrokenBuildTimers && isSick ?
      <span className={styles.timeBroken} data-locator='time-broken'> {timeBrokenLabel}</span> : null

    const buildLabel = this.props.showBuildLabel && isSick && !isBlank(this.props.lastBuildLabel) ?
      <span className={styles.buildLabel}
            // $FlowFixMe
            data-locator='build-label'> #{this.props.lastBuildLabel.substr(0, 10)}</span> : null

    return (
      <div className={classes} data-locator='interesting-project'>
        <div className={styles.inner}>
          {trayName}
          <span data-locator='project-name'>{this.props.name}</span>
          {stage}
          {timeBroken}
          {buildLabel}
        </div>
      </div>
    )
  }
}

export default InterestingProject
