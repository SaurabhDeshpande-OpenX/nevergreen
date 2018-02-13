// @flow

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {restoreFromGitHub} from '../../../actions/ImportActionCreators'
import {gitHubSetGistId} from '../../../actions/GitHubActionCreators'
import GitHub from './GitHub'
import type {Store} from '../../../Types'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({restoreFromGitHub, gitHubSetGistId}, dispatch)
}

function mapStateToProps(store: Store) {
  return {
    loaded: store.getIn(['backupImport', 'loaded']),
    gistId: store.getIn(['github', 'gistId'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub)
