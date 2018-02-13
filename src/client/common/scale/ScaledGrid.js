// @flow

import * as React from 'react'
import Resizable from '../Resizable'
import {ideal} from './ScaleText'
import FontMetrics from './FontMetrics'
import _ from 'lodash'
import styles from './scaled-grid.scss'

// These need to match those in the CSS
const TABLET_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1440

const MIN_CHILD_HEIGHT = 32
const CHILD_MARGIN = 5

function columns(width: number): number {
  if (width < TABLET_BREAKPOINT) {
    return 1
  } else if (width < DESKTOP_BREAKPOINT) {
    return 2
  } else {
    return 3
  }
}

function numberOfRows(totalNumberOfItems: number, width: number): number {
  return Math.ceil(totalNumberOfItems / columns(width))
}

function numberOfColumns(totalNumberOfItems: number, width: number): number {
  return Math.min(columns(width), totalNumberOfItems)
}

function calculateChildWidth(totalNumberOfItems: number, width: number): number {
  const columns = numberOfColumns(totalNumberOfItems, width)
  return Math.floor((width - (columns * CHILD_MARGIN * 2)) / columns)
}

function calculateChildHeight(totalNumberOfItems: number, width: number, height: number): number {
  const rows = numberOfRows(totalNumberOfItems, width)
  const calculated = Math.floor((height - (rows * CHILD_MARGIN * 2)) / rows)
  return Math.max(calculated, MIN_CHILD_HEIGHT)
}

function calculateChildDimensions(node: ?HTMLElement, fontMetrics: ?FontMetrics, childrenText: string[]): State {
  if (!node || !fontMetrics) {
    return {childWidth: 0, childHeight: 0, fontSize: 0}
  }

  const totalNumberOfItems = childrenText.length
  const width = node.offsetWidth
  const height = node.offsetHeight

  const childWidth = calculateChildWidth(totalNumberOfItems, width)
  const childHeight = calculateChildHeight(totalNumberOfItems, width, height)

  const heightScale = fontMetrics.height
  const widthScale = fontMetrics.width

  const fontSize = ideal(childrenText, childHeight, childWidth, heightScale, widthScale)

  return {childWidth, childHeight, fontSize}
}

type Props = {
  children: React.Node
}

type State = {
  childWidth: number,
  childHeight: number,
  fontSize: number
}

class ScaledGrid extends React.Component<Props, State> {
  fontMetrics: ?FontMetrics
  childrenText: string[]
  node: ?HTMLElement

  constructor(props: Props) {
    super(props)
    this.state = {childWidth: 0, childHeight: 0, fontSize: 0}
    this.childrenText = []
  }

  componentDidMount() {
    this.setState(calculateChildDimensions(this.node, this.fontMetrics, this.childrenText))
  }

  componentDidUpdate() {
    const dimension = calculateChildDimensions(this.node, this.fontMetrics, this.childrenText)
    if (!_.isEqual(this.state, dimension)) {
      this.setState(dimension)
    }
  }

  render() {
    const style = {
      width: `${this.state.childWidth}px`,
      height: `${this.state.childHeight}px`,
      fontSize: `${this.state.fontSize}px`,
      margin: `${CHILD_MARGIN}px`
    }

    return (
      <span>
        <FontMetrics ref={(node) => this.fontMetrics = node}/>
        <ul className={styles.scaledGrid} ref={(node) => this.node = node}>
          {
            React.Children.map(this.props.children, (child, index) => {
              const getTextContent = (node: ?HTMLElement) => {
                if (node) {
                  this.childrenText[index] = node.textContent
                } else {
                  _.remove(this.childrenText, (v: string, i: number): boolean => i === index)
                }
              }
              return <li className={styles.item} ref={getTextContent} style={style}>{child}</li>
            })
          }
        </ul>
        <Resizable
          onResize={() => this.setState(calculateChildDimensions(this.node, this.fontMetrics, this.childrenText))}/>
      </span>
    )
  }
}

export default ScaledGrid
