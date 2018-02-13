// @flow

import type {TimeoutID} from 'flow-typed'
import {Component} from 'react'

type Props = {
  onTrigger: () => void,
  interval: number
}

class Timer extends Component<Props> {
  timeoutId: TimeoutID

  componentDidMount() {
    const run = () => {
      this.timeoutId = setTimeout(run, this.props.interval * 1000)
      this.props.onTrigger()
    }
    run()
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  render() {
    return null
  }
}

export default Timer
