// @flow

import * as React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './input.scss'
import type {InputEvent} from '../../Types'

type Props = {
  children: React.Node,
  onEnter?: (InputEvent) => void,
  className?: string,
  readOnly?: boolean,
  focus?: boolean,
  disabled?: boolean
}

class Input extends React.Component<Props> {
  node: HTMLElement

  maybeFocus = () => {
    if (this.props.focus) {
      this.node.focus()
    }
  }

  onEnter = (evt: InputEvent) => {
    if (evt.key === 'Enter' && this.props.onEnter) {
      this.props.onEnter(evt)
    }
  }

  componentDidMount() {
    this.maybeFocus()
  }

  componentDidUpdate() {
    this.maybeFocus()
  }

  render() {
    const inputProps = _.omit(this.props, ['children', 'onEnter', 'className', 'focus'])
    const labelClasses = classNames(styles.label, this.props.className)

    return (
      <label className={labelClasses}>
        <span className={styles.description}>{this.props.children}</span>
        <input className={styles.input}
               onKeyPress={this.onEnter}
               spellCheck={false}
               autoComplete='off'
               {...inputProps}
               tabIndex={this.props.readOnly ? -1 : 0}
               aria-disabled={this.props.disabled}
               ref={(node) => this.node = node}/>
        {this.props.readOnly && <i className={styles.readOnly} title='read only'/>}
      </label>
    )
  }
}

export default Input
