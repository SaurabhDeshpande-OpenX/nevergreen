// @flow

import {Component} from 'react'
import Clipboard from 'clipboard'

type Callback = (mixed) => void

type Props = {
  elementSelector: string,
  onSuccess: () => void,
  onError: () => void
}

type State = {
  clipboard: ?Clipboard
}

function createClipboard(elementSelector: string, onSuccess: Callback, onError: Callback): Clipboard {
  const clipboard = new Clipboard(elementSelector)

  clipboard.on('error', (evt) => onError(evt))

  clipboard.on('success', (evt) => {
    onSuccess(evt)
    evt.clearSelection()
  })

  return clipboard
}

class ClipboardComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {clipboard: null}
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.clipboard) {
      this.state.clipboard.destroy()
    }
    createClipboard(nextProps.elementSelector, nextProps.onSuccess, nextProps.onError)
  }

  componentDidMount() {
    this.setState({clipboard: createClipboard(this.props.elementSelector, this.props.onSuccess, this.props.onError)})
  }

  componentWillUnmount() {
    if (this.state.clipboard) {
      this.state.clipboard.destroy()
    }
  }

  render() {
    return null
  }
}

export default ClipboardComponent
