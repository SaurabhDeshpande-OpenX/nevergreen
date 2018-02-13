// @flow

import React, {Component} from 'react'
import Message from './SuccessMessage'
import Image from './SuccessImage'
import _ from 'lodash'

type Props = {
  messages: string[]
}

type State = {
  message: string
}

class Success extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      message: props.messages[Math.floor(Math.random() * props.messages.length)]
    }
  }

  render() {
    const isUrl = _.startsWith(this.state.message, 'http')

    if (isUrl) {
      return <Image url={this.state.message}/>
    } else {
      return <Message message={this.state.message}/>
    }
  }
}

export default Success
