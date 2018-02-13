// @flow

import React, {Component} from 'react'
import classNames from 'classnames'
import Checkbox from '../../common/forms/Checkbox'
import styles from './available-project.scss'
import {isBlank} from '../../common/Utils'

type Props = {
  name: string,
  stage?: string,
  isNew: boolean,
  removed: boolean,
  selected: boolean,
  selectProject: () => void
}

class AvailableProject extends Component<Props> {
  render() {
    const listClasses = classNames(styles.availableProject, {[styles.removedProject]: this.props.removed})
    let info = null

    if (this.props.isNew) {
      info = <span className={styles.infoNew} data-locator='new'>new</span>
    } else if (this.props.removed) {
      info = <span className={styles.infoRemoved} data-locator='removed'>removed</span>
    }

    // $FlowFixMe
    const displayName = isBlank(this.props.stage) ? this.props.name : `${this.props.name} ${this.props.stage}`

    return (
      <li className={listClasses}>
        <Checkbox checked={this.props.selected} onToggle={this.props.selectProject} disabled={this.props.removed}>
          {info}
          <span className={styles.name} data-locator='name'>{displayName}</span>
        </Checkbox>
      </li>
    )
  }
}

export default AvailableProject
