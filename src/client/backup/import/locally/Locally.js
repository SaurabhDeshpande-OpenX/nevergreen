// @flow

import * as React from 'react'
import styles from './locally.scss'
import type {InputEvent} from '../../../Types'

type Props = {
  loaded?: boolean,
  importData: (string) => void
}

type State = {
  data: string
}

const PLACEHOLDER = 'paste exported configuration here and press import'

class Locally extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {data: ''}
  }

  updateData = (evt: InputEvent) => {
    this.setState({data: evt.currentTarget.value})
  }

  doImport = () => {
    this.props.importData(this.state.data)
  }

  render() {

    return (
      <React.Fragment>
        <label>
          <span className={styles.label}>configuration to import</span>
          <textarea className={styles.data}
                    placeholder={PLACEHOLDER}
                    value={this.state.data}
                    onChange={this.updateData}
                    spellCheck='false'
                    data-locator='import-data'/>
        </label>
        <button className={styles.import} onClick={this.doImport} data-locator='import'>import</button>
      </React.Fragment>
    )
  }
}

export default Locally
