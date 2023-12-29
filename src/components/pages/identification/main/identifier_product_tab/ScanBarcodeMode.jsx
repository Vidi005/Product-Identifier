import { Html5Qrcode } from "html5-qrcode"
import React from "react"
import { withTranslation } from "react-i18next"
import Swal from "sweetalert2"
import { convertDataURLtoFile } from "../../../../../utils/data"
import CameraSwitcher from "./CameraSwitcher"
import ImagePicker from "./ImagePicker"
import ScannedBarcode from "./pop_up/ScannedBarcode"

class ScanBarcodeMode extends React.Component {
  constructor(props) {
    super(props)
    this.barcodeReader = null
    this.state = {
      facingMode: 'environment',
      aspectRatio: 1,
      getScannedProduct: {},
      getScannedResult: '',
      isInverseModeEnabled: false,
      isModalOpened: false
    }
  }

  componentDidMount() {
    const barcodeReader = new Html5Qrcode('barcode-scanner')
    this.barcodeReader = barcodeReader
    if (innerWidth > innerHeight) {
      alert(this.props.t('device_orientation_alert'))
      this.setState({ aspectRatio: 4 / 3 }, () => {
        this.initScanner(barcodeReader, this.state.aspectRatio)
      })
    }
    else this.setState({ aspectRatio: 0.75 }, () => {
      this.initScanner(barcodeReader, this.state.aspectRatio)
    })
  }

  componentWillUnmount() {
    this.onClearScanner()
  }

  initScanner(barcodeReader, aspectRatio) {
    if (location.protocol.startsWith('https') || location.hostname === 'localhost') {
      if (this.state.isInverseModeEnabled) {
        const observer = new MutationObserver(() => {
          const videoElement = document.getElementById('barcode-scanner')?.querySelector('video')
          const canvas = document?.getElementById('qr-canvas')
          // const ctx = canvas?.getContext('2d')
          if (videoElement && canvas) {
            this.onInverseMode(canvas, videoElement, videoElement.videoWidth, videoElement.videoHeight)
            // ctx.globalCompositeOperation = 'difference'
            // ctx.fillStyle = 'white'
            // ctx.fillRect(0, 0, canvas.width, canvas.height)
            // videoElement.style.filter = 'invert(1)'
            // canvas.style.filter = 'invert(1)'
            // if (videoElement.readyState >= 2) {
            //   this.onInverseMode(canvas, videoElement, videoElement.videoWidth, videoElement.videoHeight)
            // } else {
            //   videoElement.addEventListener('loadedmetadata', () => {
            //     this.onInverseMode(canvas, videoElement, videoElement.videoWidth, videoElement.videoHeight)
            //   })
            // }
            observer.disconnect()
          }
        })
        observer.observe(document.getElementById('barcode-scanner'), {
          childList: true,
          subtree: true
        })
      }
      const config = {
        aspectRatio: aspectRatio,
        fps: 10,
        qrbox: {
          width: 250,
          height: 250
        },
        disableFlip: true
      }
      barcodeReader
        .start(
          { facingMode: this.state.facingMode },
          config,
          this.onScanSuccess.bind(this)
        ).catch(err => {
            Swal.fire(
              this.props.t('scanner_state_error.0'),
              `${err}`,
              'error'
            )
          })
    } else {
      Swal.fire(
        this.props.t('camera_title_alert.1'),
        this.props.t('camera_text_alert.1'),
        'warning'
      )
    }
  }

  handleScanFile(imageData) {
    this.barcodeReader.scanFile(imageData).then(decodedText => {
      this.onScanSuccess(decodedText)
    }).catch(err => {
      if (err.name === 'NotFoundException') {
        Swal.fire(
          this.props.t('scanner_state_error.0'),
          this.props.t('scanner_text_error.0'),
          'error'
        ).then(() => this.initScanner(this.barcodeReader, this.state.aspectRatio))
      } else {
        Swal.fire(
          this.props.t('scanner_state_error.0'),
          err,
          'error'
        ).then(() => this.initScanner(this.barcodeReader, this.state.aspectRatio))
      }
    })
  }

  pickImage(files) {
    if (files.length === 0 && !this.barcodeReader && !this.barcodeReader.isScanning) return
    this.barcodeReader.stop()
    const file = files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const canvas = document.createElement('canvas')
      const parentElement = document.getElementsByClassName('tab-identifier__capture')[0]
      const parentWidth = parentElement.clientWidth
      const parentHeight = parentElement.clientHeight
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.width / img.height
        let newWidth = parentWidth
        let newHeight = parentWidth / aspectRatio
        if (newHeight > parentHeight) {
          newHeight = parentHeight
          newWidth = parentHeight * aspectRatio
        }
        canvas.width = newWidth
        canvas.height = newHeight
        if (this.state.isInverseModeEnabled) {
          this.onInverseMode(canvas, img, newWidth, newHeight)
          const invertedImageUrl = canvas.toDataURL(file.type)
          const invertedImageData = convertDataURLtoFile(invertedImageUrl, file.name)
          this.handleScanFile(invertedImageData)
        } else {
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, newWidth, newHeight)
          const resizedImageUrl = canvas.toDataURL(file.type)
          const resizedImageData = convertDataURLtoFile(resizedImageUrl, file.name)
          this.handleScanFile(resizedImageData)
        }
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  onInverseMode(canvas, obj, objWidth, objHeight) {
    const ctx = canvas.getContext('2d')
    if (this.barcodeReader.isScanning) {
      obj.style.filter = 'invert(1)'
      // canvas.style.filter = 'invert(1)'
      ctx.filter = 'invert(1)'
      // requestAnimationFrame(this.onInverseMode)
    }
    canvas.width = objWidth
    canvas.height = objHeight
    ctx.drawImage(obj, 0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'difference'
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    // const data = imageData.data
    // for (let i = 0; i < data.length; i += 4) {
    //   data[i] = 255 - data[i]
    //   data[i + 1] = 255 - data[i + 1]
    //   data[i + 2] = 255 - data[i + 2]
    // }
    // ctx.putImageData(imageData, 0, 0)
  }

  changeReadMode() {
    this.onClearScanner()
    this.setState(prevState => ({
      isInverseModeEnabled: !prevState.isInverseModeEnabled
    }), () => this.initScanner(this.barcodeReader, this.state.aspectRatio))
  }

  switchCamera() {
    this.onClearScanner()
    this.setState(prevState => ({
      facingMode: prevState.facingMode === 'environment' ? 'user' : 'environment'
    }), () => this.initScanner(this.barcodeReader, this.state.aspectRatio))
  }

  onScanSuccess(decodedText) {
    if (this.barcodeReader.isScanning) {
      this.setState({ getScannedResult: decodedText }, () => {
        if (this.state.getScannedResult !== 0 && this.state.getScannedResult !== '') {
          this.barcodeReader.pause()
          this.findScannedBarcode(decodedText)
        }
      })
    } else {
      this.setState({ getScannedResult: decodedText }, () => {
        if (this.state.getScannedResult !== 0 && this.state.getScannedResult !== '') {
          this.findScannedBarcode(decodedText)
        }
      })
    }
  }

  findScannedBarcode(scannedBarcode) {
    const dataCopy = [...this.props.getProductList]
    const foundProduct = dataCopy.find(productItem => productItem.product_id && productItem.product_id.toString().includes(scannedBarcode))
    if (foundProduct !== undefined) {
      this.setState({ getScannedProduct: foundProduct, getScannedResult: '', isModalOpened: true })
    } else this.setState({ getScannedProduct: {}, isModalOpened: true })
  }

  onCloseScanResultModal() {
    this.setState({ isModalOpened: false }, () => {
      if (this.barcodeReader.isScanning) setTimeout(() => this.barcodeReader.resume(), 500)
      else setTimeout(() => this.initScanner(this.barcodeReader, this.state.aspectRatio), 500)
    })
  }
  
  onClearScanner() {
    if (this.barcodeReader && this.barcodeReader.isScanning) {
      this.barcodeReader.stop().then(() => {
        this.barcodeReader.clear()
      })
    }
  }

  render() {
    return (
      <div className="tab-identifier__capture relative h-full overflow-hidden">
        <div id="barcode-scanner" className="absolute flex items-center justify-center inset-0 max-h-full object-center"></div>
        <div className="camera-menu absolute grid grid-cols-3 justify-between place-items-center bg-gradient-to-t from-black w-full p-2 bottom-0">
          <ImagePicker pickImage={this.pickImage.bind(this)}/>
          {
            this.state.isInverseModeEnabled
              ? (
                <button className="h-14 w-14 p-1 border-2 border-white rounded-full shadow-lg" onClick={this.changeReadMode.bind(this)}>
                  <img className="w-full object-contain object-center" src="images/barcode-scanner-icon.svg" alt="Inverse Mode" />
                </button>
                )
              : (
                <button className="h-14 w-14 p-1 border-2 border-white bg-white rounded-full shadow-lg" onClick={this.changeReadMode.bind(this)}>
                  <img className="w-full object-contain object-center" src="images/barcode-scanner-icon-dark.svg" alt="Normal Mode" />
                </button>
                )
          }
          <CameraSwitcher switchCamera={this.switchCamera.bind(this)}/>
        </div>
        <ScannedBarcode
          props={this.props}
          isScanResultModalOpened={this.state.isModalOpened}
          scannedProduct={this.state.getScannedProduct}
          scannedResult={this.state.getScannedResult}
          onCloseScanResultModal={this.onCloseScanResultModal.bind(this)}
        />
      </div>
    )
  }
}

export default withTranslation()(ScanBarcodeMode)