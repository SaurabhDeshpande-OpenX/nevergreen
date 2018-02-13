// @flow

import React, {Component} from 'react'
import AddedMessages from './AddedMessages'
import AddedImages from './AddedImages'
import AddMessage from './AddMessage'
import styles from './success.scss'

type Props = {
  messages: string[],
  addMessage: () => void,
  removeMessage: () => void
}

class Success extends Component<Props> {
  render() {
    const messages = this.props.messages.filter((m) => !m.startsWith('http'))
    const images = this.props.messages.filter((m) => m.startsWith('http'))

    return (
      <section className={styles.success}>
        <h2 className={styles.title}>Success</h2>
        <AddMessage addMessage={this.props.addMessage}/>
        <AddedMessages messages={messages} removeMessage={this.props.removeMessage}/>
        <AddedImages urls={images} removeMessage={this.props.removeMessage}/>
      </section>
    )
  }
}

export default Success
