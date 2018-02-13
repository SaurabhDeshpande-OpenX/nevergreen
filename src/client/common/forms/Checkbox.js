// @flow

import * as React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './checkbox.scss'
import type {InputEvent} from '../../Types'

type Props = {
  children: React.Node,
  onToggle: (boolean) => void,
  className?: string,
  disabled?: boolean
}

class Checkbox extends React.Component<Props> {
  onChange = (evt: InputEvent) => {
    this.props.onToggle(evt.currentTarget.checked)
  }

  render() {
    const classes = classNames(styles.checkbox, this.props.className)
    const inputProps = _.omit(this.props, ['children', 'onToggle', 'className'])
    const id = _.uniqueId()

    return (
      <div className={classes}>
        <input id={id}
               className={styles.input}
               type='checkbox'
               onChange={this.onChange}
               {...inputProps}
               aria-disabled={this.props.disabled}/>
        <label htmlFor={id} className={styles.children}>{this.props.children}</label>
      </div>
    )
  }
}

export default Checkbox
