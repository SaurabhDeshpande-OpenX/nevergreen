// @flow

import React, {Component} from 'react'
import Container from '../common/container/Container'
import DropDown from '../common/forms/DropDown'
import styles from './timing-settings.scss'
import {friendlyFormatDuration} from '../common/Utils'
import type {InputEvent} from '../Types'

type Props = {
  refreshTime: number,
  setRefreshTime: (number) => void,
  validRefreshTimes: number[]
}

class TimingSettings extends Component<Props> {
  setRefreshTime = (evt: InputEvent) => {
    this.props.setRefreshTime(evt.currentValue.value)
  }

  render() {
    return (
      <Container title='timing' className={styles.container}>
        <DropDown title='poll for tray changes every' value={this.props.refreshTime} onChange={this.setRefreshTime}>
          {this.props.validRefreshTimes.map((time) => {
            return <option key={time} value={time}>{friendlyFormatDuration(time)}</option>
          })}
        </DropDown>
      </Container>
    )
  }
}

export default TimingSettings
