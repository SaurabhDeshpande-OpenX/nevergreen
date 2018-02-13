// @flow

import * as React from 'react'
import classNames from 'classnames'
import styles from './container.scss'
import type {InputEvent} from '../../Types'

type Props = {
  children: React.Node,
  title: string,
  subTitle?: string,
  className?: string,
  hidden?: boolean,
  highlight?: boolean
}

type State = {
  hidden: boolean
}

class Container extends React.Component<Props, State> {
  node: ?HTMLElement

  constructor(props: Props) {
    super(props)
    this.state = {
      hidden: props.hidden || false
    }
  }

  toggleHidden = () => {
    this.setState({hidden: !this.state.hidden})
  }

  keyToggle = (evt: InputEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      this.toggleHidden()
      evt.preventDefault()
    }
  }

  componentDidMount() {
    if (this.props.highlight && this.node) {
      this.node.scrollIntoView(true)
    }
  }

  render() {
    const titleBarClasses = classNames(styles.titleBar, {
      [styles.highlight]: this.props.highlight,
      [styles.show]: this.state.hidden,
      [styles.hide]: !this.state.hidden
    })
    const label = `${this.state.hidden ? 'show' : 'hide'} section ${this.props.title}`

    return (
      <section className={styles.container} ref={(node) => this.node = node}>
        <div className={titleBarClasses}
             title={label}
             onClick={this.toggleHidden}
             onKeyPress={this.keyToggle}
             tabIndex='0'
             aria-label={label}
             aria-expanded={!this.state.hidden}
             role='button'>
          <h3 className={styles.title}>{this.props.title}</h3>
          {this.props.subTitle && <h4 className={styles.subTitle}>{this.props.subTitle}</h4>}
        </div>
        {!this.state.hidden && <div className={this.props.className}>{this.props.children}</div>}
      </section>
    )
  }
}

export default Container
