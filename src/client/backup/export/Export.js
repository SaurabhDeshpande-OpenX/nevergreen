// @flow

import React, {Component} from 'react'
import Container from '../../common/container/Container'
import Messages from '../../common/messages/Messages'
import LocallyContainer from './locally/LocallyContainer'
import GitHubContainer from './github/GitHubContainer'
import Tabs from '../../common/tabs/Tabs'

type Props = {
  configuration: string,
  loaded?: boolean,
  infos: string[],
  errors: string[]
}

class Export extends Component<Props> {
  render() {
    return (
      <Container title='export'>
        <Tabs titles={['locally', 'GitHub']}>
          <LocallyContainer configuration={this.props.configuration}/>
          <GitHubContainer configuration={this.props.configuration}/>
        </Tabs>
        <Messages type='error' messages={this.props.errors}/>
        <Messages type='info' messages={this.props.infos}/>
      </Container>
    )
  }
}

export default Export
