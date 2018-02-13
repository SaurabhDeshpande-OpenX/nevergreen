// @flow

import React, {Component} from 'react'
import ScaledGrid from '../common/scale/ScaledGrid'
import styles from './success-message.scss'

type Props = {
  message: string
}

class SuccessMessage extends Component<Props> {
  render() {
    return (
      <ScaledGrid>
        <div className={styles.successMessage}>
          <div className={styles.message}>{this.props.message}</div>
        </div>
      </ScaledGrid>
    )
  }
}

export default SuccessMessage
