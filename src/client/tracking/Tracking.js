// @flow

import React, {Component} from 'react'
import AddTray from './AddTray'
import TrayContainer from './tray/TrayContainer'
import styles from './tracking.scss'

type Props = {
  trayIds: string[],
  addTray: () => void
}

class Tracking extends Component<Props> {
  render() {
    return (
      <section className={styles.tracking}>
        <h2 className={styles.title}>Tracking</h2>
        <AddTray addTray={this.props.addTray} existingTrayIds={this.props.trayIds}/>
        {this.props.trayIds.map((trayId, index) => <TrayContainer key={trayId} index={index} trayId={trayId}/>)}
      </section>
    )
  }
}

export default Tracking
