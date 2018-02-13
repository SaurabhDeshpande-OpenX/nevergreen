// @flow

import React, {Component} from 'react'
import classNames from 'classnames'
import styles from './notification.scss'
import {isBlank} from './common/Utils'

type Props = {
  notification?: string,
  fullScreen?: boolean,
  dismiss: () => void
}

class Notification extends Component<Props> {
  render() {
    const notificationClassNames = classNames(styles.popUpNotification, {[styles.fullscreen]: this.props.fullScreen})

    return isBlank(this.props.notification) ? null :
      <section className={notificationClassNames} aria-live='polite'>
        <div className={styles.titleBar}>
          <h1 className={styles.title}>Notification</h1>
          <button className={styles.dismiss} onClick={this.props.dismiss}>dismiss</button>
        </div>
        {this.props.notification}
      </section>
  }
}

export default Notification
