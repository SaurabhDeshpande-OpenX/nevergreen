// @flow

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../common/ImmutableToJs'
import {addMessage, removeMessage} from '../actions/SuccessActionCreators'
import Success from './Success'
import type {Store} from '../Types'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addMessage, removeMessage}, dispatch)
}

function mapStateToProps(store: Store) {
  return {messages: store.get('success')}
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Success))
