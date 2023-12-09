import React from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

const qrcodeRegionId = 'html5qr-code-full-region'

class Html5QrcodePlugin extends React.Component {
  render () {
    return <div id={qrcodeRegionId} />
  }

  componentWillUnmount () {
    // TODO(mebjas): See if there is a better way to handle
    //  promise in `componentWillUnmount`.
    try {
      this.html5QrcodeScanner.clear().catch(error => {
        console.error('Failed to clear html5QrcodeScanner. ', error)
      })
    } catch (error) {
      localStorage.removeItem('HTML5_QRCODE_DATA')
      alert(`${this.props.t('scanner-state-error.0')} ${error.message}\n${this.props.t('scanner-state-error.1')}`)
    }
  }

  componentDidMount () {
    // Creates the configuration object for Html5QrcodeScanner.
    function createConfig (props) {
      const config = {}
      if (props.fps) {
        config.fps = props.fps
      }
      if (props.qrbox) {
        config.qrbox = props.qrbox
      }
      if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio
      }
      if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip
      }
      return config
    }

    const config = createConfig(this.props)
    const verbose = this.props.verbose === true

    // Suceess callback is required.
    if (!(this.props.qrCodeSuccessCallback)) {
      throw Error('qrCodeSuccessCallback is required callback.')
    }

    this.html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId, config, verbose)
    this.html5QrcodeScanner.render(
      this.props.qrCodeSuccessCallback,
      this.props.qrCodeErrorCallback)
  }
}

export default Html5QrcodePlugin
