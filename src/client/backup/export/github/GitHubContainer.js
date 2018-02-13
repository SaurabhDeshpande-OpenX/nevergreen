// @flow

import {connect} from 'react-redux'
import type {Dispatch} from 'redux'
import {bindActionCreators} from 'redux'
import {uploadToGitHub} from '../../../actions/ExportActionCreators'
import {gitHubSetDescription, gitHubSetGistId} from '../../../actions/GitHubActionCreators'
import GitHub from './GitHub'
import type {Action, Store} from '../../../Types'

type Props = {
  configuration: string
}

function mapDispatchToProps(dispatch: Dispatch<Action>): Object {
  return bindActionCreators({uploadToGitHub, gitHubSetGistId, gitHubSetDescription}, dispatch)
}

function mapStateToProps(store: Store, ownProps: Props): Object {
  return {
    loaded: store.getIn(['backupExport', 'loaded']),
    gistId: store.getIn(['github', 'gistId']),
    description: store.getIn(['github', 'description']),
    configuration: ownProps.configuration
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub)
