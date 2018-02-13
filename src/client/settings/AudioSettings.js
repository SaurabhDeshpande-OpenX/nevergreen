// @flow

import React, {Component} from 'react'
import Container from '../common/container/Container'
import Messages from '../common/messages/Messages'
import Input from '../common/forms/Input'
import Checkbox from '../common/forms/Checkbox'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './audio-settings.scss'
import {isBlank} from '../common/Utils'
import type {InputEvent} from '../Types'

function hasScheme(url: string): boolean {
  return _.size(_.split(url, '://')) > 1
}

function pause(audio: ?HTMLAudioElement): void {
  if (audio) {
    audio.pause()
    audio.currentTime = 0
  }
}

type Props = {
  playBrokenBuildSoundFx: boolean,
  brokenBuildSoundFx: string,
  setPlayBrokenBuildSoundFx: (boolean) => void,
  setBrokenBuildSoundFx: (string) => void
}

type State = {
  errors: string[],
  audio: ?HTMLAudioElement,
  soundFx: string,
  playEnabled: boolean,
  playing: boolean
}

class AudioSettings extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const soundFx = isBlank(props.brokenBuildSoundFx) || hasScheme(props.brokenBuildSoundFx)
      ? this.props.brokenBuildSoundFx
      : `${window.location.origin}/${props.brokenBuildSoundFx}`
    this.state = {
      errors: [],
      audio: null,
      soundFx,
      playEnabled: !isBlank(props.brokenBuildSoundFx),
      playing: false
    }
  }

  toggleBrokenSounds = (newValue: boolean) => {
    this.props.setPlayBrokenBuildSoundFx(newValue)
  }

  updateSoundFx = (evt: InputEvent) => {
    this.setState({soundFx: evt.currentTarget.value, errors: []})
  }

  setSoundFx = () => {
    this.props.setBrokenBuildSoundFx(this.state.soundFx)
  }

  audioStopped = () => {
    this.setState({audio: null, playing: false})
  }

  play = () => {
    // $FlowFixMe
    const audio = new Audio(this.state.soundFx)
    this.setState({audio, errors: [], playing: true})
    audio.addEventListener('ended', this.audioStopped)
    audio.play().catch((e) => this.setState({
      errors: ['Unable to play broken build sound because of an error.', e.message],
      playing: false
    }))
  }

  stop = () => {
    pause(this.state.audio)
    this.audioStopped()
  }

  componentWillUnmount() {
    pause(this.state.audio)
  }

  render() {
    const playingDisabled = isBlank(this.state.soundFx) || !this.state.playEnabled
    const playButtonClasses = classNames(styles.testSoundFx, {
      [styles.play]: !this.state.playing,
      [styles.stop]: this.state.playing
    })

    return (
      <Container title='audio' className={styles.container}>
        <Checkbox checked={this.props.playBrokenBuildSoundFx}
                  onToggle={this.toggleBrokenSounds}
                  data-locator='play-sounds'>
          play a sound when a build breaks
        </Checkbox>
        <div className={styles.soundFx}>
          <Input type='url'
                 className={styles.soundFxInput}
                 placeholder='audio file URL'
                 onChange={this.updateSoundFx}
                 value={this.state.soundFx}
                 onBlur={this.setSoundFx}
                 onEnter={this.setSoundFx}
                 required={this.props.playBrokenBuildSoundFx}
                 disabled={this.state.playing}>
            broken build sound
          </Input>
          <button className={playButtonClasses}
                  onClick={this.state.playing ? this.stop : this.play}
                  disabled={playingDisabled}
                  aria-disabled={playingDisabled}>
            {this.state.playing ? 'stop' : 'play'}
          </button>
        </div>
        <Messages className={styles.playbackErrors} type='error' messages={this.state.errors}/>
      </Container>
    )
  }
}

export default AudioSettings
