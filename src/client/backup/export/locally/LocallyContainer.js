// @flow

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {exportError, exportSuccess} from '../../../actions/ExportActionCreators'
import Locally from './Locally'
import type {Store} from '../../../Types'

type Props = {
  configuration: string
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({exportSuccess, exportError}, dispatch)
}

function mapStateToProps(store: Store, ownProps: Props) {
  return {configuration: ownProps.configuration}
}

export default connect(mapStateToProps, mapDispatchToProps)(Locally)
