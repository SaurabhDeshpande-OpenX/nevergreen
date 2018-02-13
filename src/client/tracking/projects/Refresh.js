// @flow

import React, {Component, Fragment} from 'react'
import Shortcut from '../../common/Shortcut'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import Timer from '../../common/Timer'
import styles from './refresh.scss'
import {isBlank} from '../../common/Utils'

const ONE_MINUTE = 60

function lastFetched(timestamp: ?string): string {
  // $FlowFixMe
  return isBlank(timestamp) ? 'never' : `${distanceInWordsToNow(timestamp)} ago`
}

type Props = {
  index: number,
  timestamp?: string,
  refreshTray: () => void
}

type State = {
  lastFetched: string
}

class Refresh extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {lastFetched: lastFetched(props.timestamp)}
  }

  updateFetchedTime = () => {
    this.setState({lastFetched: lastFetched(this.props.timestamp)})
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({lastFetched: lastFetched(nextProps.timestamp)})
  }

  render() {
    return (
      <Fragment>
        <Timer onTrigger={this.updateFetchedTime} interval={ONE_MINUTE}/>
        <button className={styles.refresh} onClick={this.props.refreshTray}>
          refresh
          <Shortcut hotkeys={[`r ${this.props.index}`]}/>
        </button>
        <span className={styles.lastFetch}
              data-locator='refresh-time'>
          {`projects last refreshed ${this.state.lastFetched}`}
        </span>
      </Fragment>
    )
  }
}

export default Refresh
