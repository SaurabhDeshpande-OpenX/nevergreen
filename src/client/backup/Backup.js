import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Schema from './Schema'
import ImportContainer from './import/ImportContainer'
import ExportContainer from './export/ExportContainer'
import styles from './backup.scss'
import VisuallyHidden from '../common/VisuallyHidden'

class Backup extends Component {
  render() {
    return (
      <section className={styles.backup}>
        <VisuallyHidden>
          <h2>Backup</h2>
        </VisuallyHidden>
        <ImportContainer/>
        <ExportContainer/>
        <Schema schema={this.props.schema}/>
      </section>
    )
  }
}

Backup.propTypes = {
  schema: PropTypes.string
}

export default Backup
