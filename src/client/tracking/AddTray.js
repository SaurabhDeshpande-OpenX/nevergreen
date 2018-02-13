// @flow

import React, {Component} from 'react'
import Input from '../common/forms/Input'
import styles from './add-tray.scss'
import type {InputEvent} from '../Types'

type Props = {
  existingTrayIds: string[],
  addTray: (string, string, string, string[]) => void
}

type State = {
  url: string,
  username: string,
  password: string
}

class AddTray extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {url: '', username: '', password: ''}
  }

  addTray = () => {
    this.props.addTray(this.state.url, this.state.username, this.state.password, this.props.existingTrayIds)
    this.setState({url: '', username: '', password: ''})
  }

  updateUrl = (evt: InputEvent) => {
    this.setState({url: evt.currentTarget.value})
  }

  updateUsername = (evt: InputEvent) => {
    this.setState({username: evt.currentTarget.value})
  }

  updatePassword = (evt: InputEvent) => {
    this.setState({password: evt.currentTarget.value})
  }

  render() {

    return (
      <div className={styles.addTray}>
        <div className={styles.inputs}>
          <Input className={styles.trackingTrayUrl}
                 placeholder='CCTray XML file'
                 value={this.state.url}
                 onChange={this.updateUrl}
                 onEnter={this.addTray}
                 data-locator='add-tray-url'
                 autoFocus>
            URL
          </Input>
          <Input className={styles.username}
                 value={this.state.username}
                 onChange={this.updateUsername}
                 onEnter={this.addTray}
                 data-locator='add-tray-username'>
            username
          </Input>
          <Input className={styles.password}
                 value={this.state.password}
                 onChange={this.updatePassword}
                 onEnter={this.addTray}
                 data-locator='add-tray-password'>
            password
          </Input>
        </div>
        <button className={styles.add} onClick={this.addTray} data-locator='add-tray'>add</button>
      </div>
    )
  }
}

export default AddTray
