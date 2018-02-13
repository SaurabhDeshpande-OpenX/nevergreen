// @flow

import React, {Component} from 'react'
import styles from './font-metrics.scss'

const fontMeasureSize = 100

class FontMetrics extends Component<any> {
  measure: ?HTMLElement
  width: number
  height: number

  constructor(props: any) {
    super(props)
    this.width = 0
    this.height = 0
  }

  componentDidMount() {
    if (this.measure) {
      this.width = this.measure.offsetWidth / fontMeasureSize
      this.height = this.measure.offsetHeight / fontMeasureSize
    }
  }

  render() {
    const style = {fontSize: `${fontMeasureSize}px`}
    return <span className={styles.body} style={style} ref={(node) => this.measure = node}>a</span>
  }
}

export default FontMetrics
