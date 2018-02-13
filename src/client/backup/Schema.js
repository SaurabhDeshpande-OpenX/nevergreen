// @flow

import React, {Component} from 'react'
import Container from '../common/container/Container'
import styles from './schema.scss'

type Props = {
  schema: string
}

class Schema extends Component<Props> {
  render() {
    return (
      <Container title='schema' hidden={true} className={styles.container}>
        <pre className={styles.schema}>{this.props.schema}</pre>
      </Container>
    )
  }
}

export default Schema
