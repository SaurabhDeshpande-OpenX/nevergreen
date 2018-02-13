// @flow

import React, {Component} from 'react'
import Shortcut from '../common/Shortcut'
import classNames from 'classnames'
import styles from './remove-link.scss'

type Props = {
  hotkeys: string[],
  removeMessage: () => void,
  message: string,
  className?: string
}

class RemoveLink extends Component<Props> {
  render() {
    const classes = classNames(styles.removeLink, this.props.className)

    return (
      <button className={classes}
              onClick={this.props.removeMessage}
              title={`remove ${this.props.message}`}>
        remove {this.props.message}
        <Shortcut hotkeys={this.props.hotkeys}/>
      </button>
    )
  }
}

export default RemoveLink
