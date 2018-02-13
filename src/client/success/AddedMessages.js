// @flow

import React, {Component} from 'react'
import Container from '../common/container/Container'
import RemoveLink from './RemoveLink'
import styles from './added-messages.scss'
import _ from 'lodash'

type Props = {
  messages: string[],
  removeMessage: (string) => void
}

class AddedMessages extends Component<Props> {
  render() {
    if (_.isEmpty(this.props.messages)) {
      return null
    }

    return (
      <Container title='messages'>
        <ol className={styles.successMessages}>
          {
            this.props.messages.map((message, index) => {
              const remove = () => this.props.removeMessage(message)

              return (
                <li key={`m${index}`} className={styles.successItem}>
                  <RemoveLink hotkeys={[`y m ${index}`]} removeMessage={remove} message={message}/>
                  <span className={styles.message} data-locator='success-message'>{message}</span>
                </li>
              )
            })
          }
        </ol>
      </Container>
    )
  }
}

export default AddedMessages
