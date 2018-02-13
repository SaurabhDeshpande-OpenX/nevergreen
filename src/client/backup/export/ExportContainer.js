// @flow

import {connect} from 'react-redux'
import Export from './Export'
import {filter} from '../../common/repo/Data'
import {toJson} from '../../common/Json'
import {toJS} from '../../common/ImmutableToJs'
import type {Store} from '../../Types'

function mapStateToProps(store: Store): Object {
  return {
    loaded: store.getIn(['backupExport', 'loaded']),
    errors: store.getIn(['backupExport', 'errors']),
    infos: store.getIn(['backupExport', 'infos']),
    configuration: toJson(filter(store.toJS()))
  }
}

export default connect(mapStateToProps)(toJS(Export))
