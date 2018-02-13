// @flow

import * as React from 'react'
import styles from './loading.scss'

type Props = {
  children: React.Node,
  loaded?: boolean
}

class Loading extends React.Component<Props> {
  render() {
    if (this.props.loaded) {
      return <React.Fragment>{this.props.children}</React.Fragment>
    } else {
      return (
        <div className={styles.loading}
             data-locator='loading'
             role='alertdialog'
             aria-busy='true'
             aria-live='assertive'>
          <span className={styles.loadingText}>loading</span>
          <span className={styles.pulse}/>
          <span className={styles.pulse}/>
          <span className={styles.pulse}/>
        </div>
      )
    }
  }
}

export default Loading
