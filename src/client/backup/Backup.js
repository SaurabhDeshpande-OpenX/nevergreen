// @flow

import React, {Component} from 'react'
import Schema from './Schema'
import ImportContainer from './import/ImportContainer'
import ExportContainer from './export/ExportContainer'
import styles from './backup.scss'

type Props = {
  schema: string
}

class Backup extends Component<Props> {
  render() {
    return (
      <section className={styles.backup}>
        <h2 className={styles.title}>Backup</h2>
        <ImportContainer/>
        <ExportContainer/>
        <Schema schema={this.props.schema}/>
      </section>
    )
  }
}

export default Backup
