// @flow

import * as React from 'react'
import Input from '../../../common/forms/Input'
import styles from './github.scss'
import type {InputEvent} from '../../../Types'

type Props = {
  loaded?: boolean,
  configuration: string,
  uploadToGitHub: (string, string, string, string) => void,
  gitHubSetGistId: (string) => void,
  gitHubSetDescription: (string) => void,
  gistId: string,
  description: string
}

type State = {
  oauthToken: string,
  gistId: string,
  description: string
}

class GitHub extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      oauthToken: '',
      gistId: props.gistId,
      description: props.description
    }
  }

  oauthTokenChanged = (evt: InputEvent) => {
    this.setState({oauthToken: evt.currentTarget.value})
  }

  descriptionChanged = (evt: InputEvent) => {
    this.setState({description: evt.currentTarget.value})
  }

  gistIdChanged = (evt: InputEvent) => {
    this.setState({gistId: evt.currentTarget.value})
  }

  setDescription = () => {
    this.props.gitHubSetDescription(this.state.description)
  }

  setGistId = () => {
    this.props.gitHubSetGistId(this.state.gistId)
  }

  upload = () => {
    this.props.uploadToGitHub(this.state.gistId, this.state.description, this.props.configuration, this.state.oauthToken)
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({gistId: nextProps.gistId, description: nextProps.description})
  }

  render() {
    const disabled = !this.props.loaded

    return (
      <React.Fragment>
        <Input className={styles.oauthToken}
               onChange={this.oauthTokenChanged}
               onBlur={this.oauthTokenChanged}
               value={this.state.oauthToken}
               disabled={disabled}>
          access token
        </Input>
        <Input className={styles.description}
               value={this.state.description}
               onChange={this.descriptionChanged}
               onBlur={this.setDescription}
               disabled={disabled}>
          description
        </Input>
        <Input className={styles.gistId}
               value={this.state.gistId}
               onChange={this.gistIdChanged}
               onBlur={this.setGistId}
               placeholder='leave blank to create a new gist'
               disabled={disabled}>
          gist ID
        </Input>
        <button className={styles.export} onClick={this.upload} disabled={disabled}>export</button>
      </React.Fragment>
    )
  }
}

export default GitHub
