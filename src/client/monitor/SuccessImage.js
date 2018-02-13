// @flow

import React, {Component} from 'react'
import styles from './success-image.scss'

type Props = {
  url: string
}

class SuccessImage extends Component<Props> {
  render() {
    return (
      <div id='success-image'>
        <img src={this.props.url} className={styles.image} alt='success'/>
      </div>
    )
  }
}

export default SuccessImage
