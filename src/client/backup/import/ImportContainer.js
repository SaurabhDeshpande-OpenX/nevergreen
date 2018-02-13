// @flow

import {connect} from 'react-redux'
import {toJS} from '../../common/ImmutableToJs'
import Import from './Import'
import type {Store} from '../../Types'

function mapStateToProps(store: Store): Object {
  return {
    errors: store.getIn(['backupImport', 'errors']),
    infos: store.getIn(['backupImport', 'infos'])
  }
}

export default connect(mapStateToProps)(toJS(Import))
