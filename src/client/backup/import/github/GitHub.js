// @flow

import * as React from 'react'
import Input from '../../../common/forms/Input'
import styles from './github.scss'
import type {InputEvent} from '../../../Types'

type Props = {
  loaded?: boolean,
  restoreFromGitHub: (string) => void,
  gitHubSetGistId: (string) => void,
  gistId: string
}

type State = {
  gistId: string
}

class GitHub extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {gistId: props.gistId}
  }

  gistIdChanged = (evt: InputEvent) => {
    this.setState({gistId: evt.currentTarget.value})
  }

  setGistId = () => {
    this.props.gitHubSetGistId(this.state.gistId)
  }

  restore = () => {
    this.props.restoreFromGitHub(this.state.gistId)
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({gistId: nextProps.gistId})
  }

  render() {
    const disabled = !this.props.loaded

    return (
      <React.Fragment>
        <Input className={styles.gistId}
               value={this.state.gistId}
               onChange={this.gistIdChanged}
               onBlur={this.setGistId}
               disabled={disabled}>
          gist ID
        </Input>
        <button className={styles.import} onClick={this.restore} disabled={disabled}>import</button>
      </React.Fragment>
    )
  }
}

export default GitHub
