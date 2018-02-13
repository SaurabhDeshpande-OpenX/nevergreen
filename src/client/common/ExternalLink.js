// @flow

import * as React from 'react'
import _ from 'lodash'
import styles from './external-link.scss'

type Props = {
  children: React.Node
}

class ExternalLink extends React.Component<Props> {
  render() {
    const aProps = _.omit(this.props, ['children', 'target', 'rel'])

    return (
      <a {...aProps} target='_blank' rel='noopener noreferrer'>
        <span className={styles.newWindow}>opens in new window</span>
        {this.props.children}
      </a>
    )
  }
}

export default ExternalLink
