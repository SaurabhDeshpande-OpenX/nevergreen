// @flow

import React, {Component} from 'react'
import Container from '../../common/container/Container'
import AvailableProjectsContainer from '../projects/AvailableProjectsContainer'
import TraySettingsContainer from '../settings/TraySettingsContainer'
import Loading from '../../common/loading/Loading'
import Tabs from '../../common/tabs/Tabs'

type Props = {
  trayId: string,
  index: number,
  loaded?: boolean,
  name?: string,
  url: string,
  highlight?: boolean
}

class Tray extends Component<Props> {
  render() {
    const title = this.props.name || this.props.url
    const subTitle = this.props.name ? this.props.url : ''

    return (
      <Container title={title} subTitle={subTitle} highlight={this.props.highlight}>
        <div data-locator='tray'>
          <Tabs titles={['projects', 'settings']}>
            <Loading loaded={this.props.loaded}>
              <AvailableProjectsContainer trayId={this.props.trayId} index={this.props.index}/>
            </Loading>
            <TraySettingsContainer trayId={this.props.trayId}/>
          </Tabs>
        </div>
      </Container>
    )
  }
}

export default Tray
