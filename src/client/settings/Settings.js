// @flow

import React, {Component} from 'react'
import TimingSettings from './TimingSettings'
import DisplaySettings from './DisplaySettings'
import AudioSettings from './AudioSettings'
import styles from './settings.scss'

type Props = {
  showTrayName: boolean,
  showBrokenBuildTime: boolean,
  playBrokenBuildSoundFx: boolean,
  showBuildLabel: boolean,
  brokenBuildSoundFx?: string,
  setShowBrokenBuildTime: () => void,
  setShowTrayName: () => void,
  setPlayBrokenBuildSoundFx: () => void,
  setBrokenBuildSoundFx: () => void,
  refreshTime: number,
  setRefreshTime: () => void,
  setShowBuildLabel: () => void,
  validRefreshTimes: number[]
}

class Settings extends Component<Props> {
  render() {
    return (
      <section className={styles.settings}>
        <TimingSettings {...this.props}/>
        <DisplaySettings {...this.props}/>
        <AudioSettings {...this.props}/>
      </section>
    )
  }
}

export default Settings
