// @flow

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toJS} from '../common/ImmutableToJs'
import {fetchInteresting} from '../actions/MonitorActionCreators'
import {requestFullScreen} from '../actions/NevergreenActionCreators'
import Monitor from './Monitor'
import type {Store} from '../Types'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchInteresting, requestFullScreen}, dispatch)
}

function mapStateToProps(store: Store) {
  const settings = store.get('audioVisual')
  const interesting = store.get('interesting')

  return {
    loaded: interesting.get('loaded'),
    errors: interesting.get('errors'),
    trays: store.get('trays').toList(),
    projects: interesting.get('projects'),
    selected: store.get('selected'),
    showBrokenBuildTimers: settings.get('showBrokenBuildTime'),
    showTrayName: settings.get('showTrayName'),
    showBuildLabel: settings.get('showBuildLabel'),
    playBrokenBuildSounds: settings.get('playBrokenBuildSoundFx'),
    brokenBuildFx: settings.get('brokenBuildSoundFx'),
    messages: store.get('success'),
    refreshTime: settings.get('refreshTime'),
    isFullScreen: store.getIn(['nevergreen', 'fullScreen'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Monitor))
