import {Component} from 'react'
import PropTypes from 'prop-types'
import {debug} from './Logger'

class Timer extends Component {
  createTimeout = () => {
    this.timeoutId = setTimeout(this.run, this.props.interval * 1000)
    debug(`created timeout [${this.timeoutId}] to run in [${this.props.interval}s]`)
  }

  run = () => {
    return Promise.resolve(this.props.onTrigger())
      .then(this.createTimeout)
  }

  componentDidMount() {
    this.run()
  }

  componentWillUnmount() {
    debug(`clearing timeout [${this.timeoutId}]`)
    clearTimeout(this.timeoutId)
  }

  render() {
    return null
  }
}

Timer.propTypes = {
  onTrigger: PropTypes.func.isRequired,
  interval: PropTypes.number.isRequired
}

export default Timer
