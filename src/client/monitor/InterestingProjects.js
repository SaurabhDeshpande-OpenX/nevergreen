// @flow

import React, {Component} from 'react'
import _ from 'lodash'
import ScaledGrid from '../common/scale/ScaledGrid'
import InterestingProject from '../common/project/InterestingProject'
import styles from './interesting-projects.scss'
import {isBlank} from '../common/Utils'
import type {Project, Tray} from '../Types'

type Props = {
  projects: Project[],
  trays: Tray[],
  showBrokenBuildTimers: boolean,
  showTrayName: boolean,
  playBrokenBuildSounds: boolean,
  brokenBuildFx?: string,
  showBuildLabel?: boolean,
  errors: string[]
}

class InterestingProjects extends Component<Props> {
  sfx: ?HTMLAudioElement

  componentWillUnmount() {
    if (this.sfx) {
      this.sfx.pause()
    }
  }

  render() {
    const brokenProject = _.reduce(this.props.projects, (previous, project) => previous || project.prognosis === 'sick', false)
    const playBrokenSfx = this.props.playBrokenBuildSounds && (brokenProject || !_.isEmpty(this.props.errors))
    const brokenSfx = playBrokenSfx && !isBlank(this.props.brokenBuildFx) ?
      <audio ref={(node) => this.sfx = node} src={this.props.brokenBuildFx} autoPlay/> : null

    const errors = _.map(this.props.errors, (error) => {
      return (
        <div key={error} className={styles.error}>
          <div className={styles.inner}>{error}</div>
        </div>
      )
    })

    const projects = _.map(this.props.projects, (project) => {
      const tray = this.props.trays.find((tray) => tray.trayId === project.trayId)
      return tray && <InterestingProject {...project}
                                         trayName={tray.name}
                                         key={`${tray.trayId}#${project.projectId}`}
                                         showBrokenBuildTimers={this.props.showBrokenBuildTimers}
                                         showTrayName={this.props.showTrayName}
                                         showBuildLabel={this.props.showBuildLabel}/>
    })

    return (
      <span className={styles.interestingProjects} data-locator='interesting-projects'>
        <ScaledGrid>{_.concat(errors, projects)}</ScaledGrid>
        {brokenSfx}
      </span>
    )
  }
}

export default InterestingProjects
