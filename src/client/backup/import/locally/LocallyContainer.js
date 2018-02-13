// @flow

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {importData} from '../../../actions/ImportActionCreators'
import Locally from './Locally'
import type {Store} from '../../../Types'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({importData}, dispatch)
}

function mapStateToProps(store: Store) {
  return {loaded: store.getIn(['backupImport', 'loaded'])}
}

export default connect(mapStateToProps, mapDispatchToProps)(Locally)
