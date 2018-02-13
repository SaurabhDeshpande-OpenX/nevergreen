// @flow

import React, {Component} from 'react'
import Mousetrap from 'mousetrap'
import _ from 'lodash'

function click(node: ?HTMLElement): boolean {
  if (node) {
    node.focus()
    node.click()
  }
  return false
}

type Props = {
  hotkeys: string[]
}

class Shortcut extends Component<Props> {
  node: ?HTMLElement

  componentDidMount() {
    Mousetrap.bind(this.props.hotkeys, () => click(this.node))
  }

  componentWillUnmount() {
    Mousetrap.unbind(this.props.hotkeys)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!_.isEqual(this.props.hotkeys, nextProps.hotkeys)) {
      Mousetrap.unbind(this.props.hotkeys)
      Mousetrap.bind(nextProps.hotkeys, () => click(this.node))
    }
  }

  render() {
    return <span ref={(node) => this.node = node}/>
  }
}

export default Shortcut
