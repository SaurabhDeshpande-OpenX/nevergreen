// @flow

import * as React from 'react'
import styles from './tabs.scss'

type Props = {
  children: React.Node,
  titles: string[]
}

type State = {
  active: number
}

class Tabs extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {active: 0}
  }

  switchTabs = (index: number) => {
    this.setState({active: index})
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.tabs}>
          {this.props.titles.map((title, i) => {
            const isActive = i === this.state.active
            return (
              <button key={title}
                      className={styles.tab}
                      onClick={() => this.switchTabs(i)}
                      disabled={isActive}
                      data-locator={`tab-${title}`}>
                {title}
              </button>
            )
          })}
        </div>
        <div className={styles.contents}>
          {React.Children.toArray(this.props.children)[this.state.active]}
        </div>
      </React.Fragment>
    )
  }
}

export default Tabs
