// @flow

import React, {Component} from 'react'
import Container from '../common/container/Container'
import RemoveLink from './RemoveLink'
import styles from './added-images.scss'
import _ from 'lodash'

type Props = {
  urls: string[],
  removeMessage: (string) => void
}

class AddedImages extends Component<Props> {
  render() {
    if (_.isEmpty(this.props.urls)) {
      return null
    }

    return (
      <Container title='images' className={styles.container}>
        <ol className={styles.successImages}>
          {
            this.props.urls.map((url, index) => {
              const remove = () => this.props.removeMessage(url)

              return (
                <li key={`i${index}`} className={styles.imageItem}>
                  <div className={styles.imageWrapper}>
                    <img className={styles.image} src={url} alt={url} title={url} data-locator='success-image'/>
                  </div>
                  <RemoveLink hotkeys={[`y i ${index}`]}
                              removeMessage={remove}
                              message={url}
                              className={styles.remove}/>
                </li>
              )
            })
          }
        </ol>
      </Container>
    )
  }
}

export default AddedImages
