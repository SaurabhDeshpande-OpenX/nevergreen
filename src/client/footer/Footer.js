import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ExternalLink from '../common/ExternalLink'
import styles from './footer.scss'

class Footer extends Component {
  render() {
    const footerStyle = {
      borderColor: this.props.versionColour
    }
    const footerClassNames = classNames(styles.siteFooter, {[styles.fullscreen]: this.props.fullScreen})

    return (
      <footer role='contentinfo' className={footerClassNames} style={footerStyle}>
        <ExternalLink href='https://github.com/build-canaries/nevergreen/releases' className={styles.version}
                      title='Nevergreen releases on Github'>
          v{this.props.versionNumber}.{this.props.commitHash} {this.props.versionName}
        </ExternalLink>
        <span className={styles.copyright}>Copyright © 2017 Build Canaries</span>
      </footer>
    )
  }
}

Footer.propTypes = {
  versionNumber: PropTypes.string,
  versionName: PropTypes.string,
  commitHash: PropTypes.string,
  versionColour: PropTypes.string,
  fullScreen: PropTypes.bool
}

export default Footer
