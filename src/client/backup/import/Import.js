// @flow

import React, {Component} from 'react'
import Container from '../../common/container/Container'
import Messages from '../../common/messages/Messages'
import LocallyContainer from './locally/LocallyContainer'
import GitHubContainer from './github/GitHubContainer'
import Tabs from '../../common/tabs/Tabs'

type Props = {
  infos: string[],
  errors: string[]
}

class Import extends Component<Props> {
  render() {
    return (
      <Container title='import'>
        <Tabs titles={['locally', 'GitHub']}>
          <LocallyContainer/>
          <GitHubContainer/>
        </Tabs>
        <Messages type='error' messages={this.props.errors}/>
        <Messages type='info' messages={this.props.infos}/>
      </Container>
    )
  }
}

export default Import
