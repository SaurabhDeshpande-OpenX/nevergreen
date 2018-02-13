// @flow

import * as React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './drop-down.scss'

type Props = {
  children: React.Node,
  title?: string,
  className?: string
}

class DropDown extends React.Component<Props> {
  render() {
    const inputProps = _.omit(this.props, ['children', 'title', 'className'])
    const labelClasses = classNames(styles.dropDown, this.props.className)

    return (
      <label className={labelClasses}>
        <span className={styles.label}>{this.props.title}</span>
        <select className={styles.input} {...inputProps}>
          {this.props.children}
        </select>
      </label>
    )
  }
}

export default DropDown
