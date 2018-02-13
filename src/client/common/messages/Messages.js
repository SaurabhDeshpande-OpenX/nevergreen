// @flow

import React, {Component} from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './messages.scss'

type Props = {
  type: 'info' | 'error',
  messages: string[],
  className?: string
}

class Messages extends Component<Props> {
  render() {
    if (_.isEmpty(this.props.messages)) {
      return null
    }

    const isError = this.props.type === 'error'
    const classes = classNames(styles[this.props.type], this.props.className)

    return (
      <ul className={classes} data-locator='messages' aria-live={isError ? 'alert' : 'polite'}>
        {
          this.props.messages.map((msg) => {
            return <li key={msg} className={styles.message}>{msg}</li>
          })
        }
      </ul>
    )
  }
}

export default Messages
