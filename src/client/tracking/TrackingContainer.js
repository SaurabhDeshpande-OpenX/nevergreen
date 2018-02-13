// @flow

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../common/ImmutableToJs'
import {addTray} from '../actions/TrackingActionCreators'
import Tracking from './Tracking'
import type {Store} from '../Types'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addTray}, dispatch)
}

function mapStateToProps(store: Store) {
  return {trayIds: store.get('trays').keySeq()}
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Tracking))
