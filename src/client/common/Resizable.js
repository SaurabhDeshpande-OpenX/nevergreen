// @flow

import {Component} from 'react'
import _ from 'lodash'

const WAIT_MS = 16
const MAX_WAIT_MS = 32
const DEBOUNCE_OPTIONS = {leading: true, trailing: true, maxWait: MAX_WAIT_MS}

type Props = {
  onResize: () => void
}

type State = {
  onResizeDebounced: () => void
}

class Resizable extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {onResizeDebounced: _.debounce(props.onResize, WAIT_MS, DEBOUNCE_OPTIONS)}
  }

  componentDidMount() {
    window.addEventListener('resize', this.state.onResizeDebounced)
  }

  componentWillReceiveProps(nextProps: Props) {
    window.removeEventListener('resize', this.state.onResizeDebounced)
    this.setState({onResizeDebounced: _.debounce(nextProps.onResize, WAIT_MS, DEBOUNCE_OPTIONS)})
  }

  componentDidUpdate() {
    window.addEventListener('resize', this.state.onResizeDebounced)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.onResizeDebounced)
  }

  render() {
    return null
  }
}

export default Resizable
