// @flow

import React, {Component} from 'react'
import Input from '../common/forms/Input'
import styles from './add-message.scss'
import type {InputEvent} from '../Types'

type Props = {
  addMessage: (string) => void
}

type State = {
  message: string
}

class AddMessage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {message: ''}
  }

  updateMessage = (evt: InputEvent) => {
    this.setState({message: evt.currentTarget.value})
  }

  addMessage = () => {
    this.props.addMessage(this.state.message)
    this.setState({message: ''})
  }

  render() {
    return (
      <div className={styles.addMessage}>
        <Input className={styles.addMessageInput}
               placeholder='text or image URL'
               value={this.state.message}
               onChange={this.updateMessage}
               onEnter={this.addMessage}
               data-locator='message'
               autoFocus>
          message
        </Input>
        <button className={styles.add} onClick={this.addMessage} data-locator='add-message'>add</button>
      </div>
    )
  }
}

export default AddMessage
