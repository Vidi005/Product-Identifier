import React from "react"
import { withTranslation } from "react-i18next"
import Swal from "sweetalert2"
import Tesseract from "tesseract.js"
import { convertDataURLtoFile } from "../../../../../utils/data"
import CameraContainer from "./CameraContainer"
import CameraSwitcher from "./CameraSwitcher"
import ImagePicker from "./ImagePicker"
import RecognizedProduct from "./pop_up/RecognizedProduct"

class OCRMode extends React.Component {
  constructor(props) {
    super(props)
    this.cameraRef = React.createRef()
    this.canvasRef = React.createRef()
    this.containerRef = React.createRef()
    this.previewRef = React.createRef()
    this.stream = null
    this.state = {
      downloadingProgress: 0,
      facingMode: 'environment',
      imgFile: null,
      filteredImgFile: null,
      getRecognizedProduct: {},
      getRecognizedVendor: {},
      getRecognizedText: '',
      boundingBoxes: [],
      isCameraPermissionGranted: false,
      isDownloading: true,
      isBtnCaptureClicked: false,
      isRecognizing: false,
      isModalOpened: false,
      isPreviewRemoved: true
    }
  }

  componentDidMount() {
    if (innerWidth > innerHeight) {
      alert(this.props.t('device_orientation_alert'))
    }
    this.downloadAndCacheLangFiles()
    this.setUpCamera()
  }

  componentDidUpdate() {
    if (this.state.isRecognizing) {
      document.body.style.overflow = 'hidden'
    } else document.body.style.overflow = 'unset'
  }

  componentWillUnmount() {
    this.stopCamera()
  }

  async downloadAndCacheLangFiles() {
    const langPath = `${import.meta.env.BASE_URL}/models/`
    const trainedDataFiles = ['eng.traineddata', 'ind.traineddata', 'ara.traineddata']
    const cacheName = 'langFiles'
    const cache = await caches.open(cacheName)
    const cachedFiles = await cache.match('dummyFile')
    if (cachedFiles) {
      this.setState({ isDownloading: false })
      return
    }
    try {
      let progress = 0
      const downloadPromises = trainedDataFiles.map(async (file) => {
        const response = await fetch(`${langPath}/${file}`, { mode: 'cors' }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: this.props.t('download_error'),
            text: error.message
          }).then(() => this.setState({ isDownloading: false }))
        })
        const responseBody = await response.blob()
        const headers = new Headers(response.headers)
        const status = response.status
        const statusText = response.statusText
        const clonedResponse = new Response(responseBody, {
          headers, status, statusText
        })
        await cache.put(file, clonedResponse)
        progress += 100 / trainedDataFiles.length
        this.setState({ downloadingProgress: progress })
      })
      await Promise.all(downloadPromises)
      await cache.put('dummyFile', new Response('Dummy content'))
      this.setState({ isDownloading: false })
      return cache
    } catch (error) {
      cache.delete(cacheName)
      this.setState({ isDownloading: false }, () => Swal.fire({
        icon: 'error',
        title: this.props.t('download_error'),
        text: error.message
      }))
    }
  }

  setUpCamera = async () => {
    if (location.protocol.startsWith('https') || location.hostname === 'localhost') {
      let idealAspectRatio = 3 / 4
      if (window.innerHeight < window.innerWidth) idealAspectRatio = 4 / 3
      else idealAspectRatio = 3 / 4
      const constraints = {
        audio: false,
        video: {
          facingMode: { exact: this.state.facingMode },
          aspectRatio: { ideal: idealAspectRatio }
        }
      }
      try {
        this.stream = await navigator.mediaDevices.getUserMedia(constraints)
        this.setState({ isCameraPermissionGranted: true }, () => {
          this.cameraRef.current.srcObject = this.stream
        })
      } catch (error) {
        this.setState(() => ({
          isCameraPermissionGranted: false
        }))
        Swal.fire({
          icon: 'error',
          title: this.props.t('camera_title_alert.0'),
          text: `${error.message}`
        })
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: this.props.t('camera_title_alert.1'),
        text: this.props.t('camera_text_alert.1')
      })
    }
  }

  switchCamera () {
    this.stopCamera()
    this.setState(prevState => ({
      isPreviewRemoved: true,
      facingMode: prevState.facingMode === 'environment' ? 'user' : 'environment'
    }), () => this.setUpCamera())
  }

  captureImage () {
    if (this.stream && this.state.isPreviewRemoved && !this.state.isDownloading) {
      this.setState(prevState => ({
        isBtnCaptureClicked: !prevState.isBtnCaptureClicked,
        isRecognizing: true,
        getRecognizedProduct: {},
        getRecognizedVendor: {},
        getRecognizedText: ''
      }))
      const canvas = this.canvasRef.current
      const video = this.cameraRef.current
      if (canvas) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
        this.setState({
          imgFile: canvas.toDataURL('image/png'),
          filteredImgFile: canvas.toDataURL('image/png'),
          isPreviewRemoved: false
        }, () => {
          this.recognizeImage(this.state.imgFile)
        })
      } else {
        this.setState({ isRecognizing: false })
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.props.t('canvas_is_null')
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: this.props.t('camera_title_alert.2'),
        text: this.props.t('camera_text_alert.2')
      })
    }
  }

  pickImage(files) {
    if (files.length === 0 && this.state.isDownloading) return
    this.setState(() => ({
      imgFile: URL.createObjectURL(files[0]),
      isPreviewRemoved: false,
      isRecognizing: true,
      getRecognizedProduct: {},
      getRecognizedVendor: {},
      getRecognizedText: ''
    }), () => {
      const file = files[0]
      const validImageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'bmp', 'heic', 'svg']
      const fileExtension = file.name.split('.').pop().toLowerCase()
      if (!validImageExtensions.includes(fileExtension)) {
        this.setState({
          isRecognizing: false,
          isPreviewRemoved: true
        }, () => {
          Swal.fire({
            icon: 'error',
            title: this.props.t('img_extension_title_alert'),
            text: this.props.t('img_extension_text_alert')
          })
        })
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        const canvas = this.canvasRef.current
        const previewContainer = this.containerRef.current
        if (!canvas || !previewContainer) {
          this.setState({ isRecognizing: false })
          return
        }
        const previewWidth = previewContainer.clientWidth
        const previewHeight = previewContainer.clientHeight
        const img = new Image()
        img.onload = () => {
          const aspectRatio = img.width / img.height
          let newWidth = previewWidth
          let newHeight = previewWidth / aspectRatio
          if (newHeight > previewHeight) {
            newHeight = previewHeight
            newWidth = previewHeight * aspectRatio
          }
          canvas.width = newWidth
          canvas.height = newHeight
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, newWidth, newHeight)
          const resizedImageUrl = convertDataURLtoFile(canvas.toDataURL(file.type), file.name)
          this.setState({
            imgFile: URL.createObjectURL(resizedImageUrl),
            filteredImgFile: URL.createObjectURL(resizedImageUrl)
          }, () => this.recognizeImage(this.state.imgFile))
        }
        img.src = reader.result
      }
      reader.readAsDataURL(file)
    })
  }

  async recognizeImage(file) {
    const trainedDataFiles = [
      'eng.traineddata',
      'ind.traineddata',
      'ara.traineddata'
    ]
    const langCache = await caches.open('langFiles')
    try {
      const cachedFileURls = trainedDataFiles.map(file => langCache.match(file).then(response => response.url))
      const { data } = await Tesseract.recognize(
        file,
        trainedDataFiles.map(file => file.replace('.traineddata', '')),
        {
          langPath: cachedFileURls,
          // logger: info => console.log(info),
          recognize_character: true,
          deskew: true,
          invert: true
        }
      )
      this.findRecognizedText(data.text)
      let boundingBoxes = data.lines.map(line => line.bbox)
      boundingBoxes = this.updateBoundingBoxes(boundingBoxes)
      this.setState({
        isRecognizing: false,
        getRecognizedText: data.text.split('\n'),
        boundingBoxes: boundingBoxes,
        isModalOpened: true
      }, () => this.stopCamera())
    } catch (error) {
      this.setState({ isRecognizing: false })
      Swal.fire({
        icon: 'error',
        title: this.props.t('recognition_error'),
        text: `${error.message}`
      })
    }
  }

  updateBoundingBoxes (boundingBoxes) {
    if (this.previewRef.current) {
      const deltaX = this.containerRef.current.clientWidth - this.previewRef.current.clientWidth
      // const deltaY = this.containerRef.current.clientHeight - this.previewRef.current.clientHeight
      const marginX = deltaX > 0 ? deltaX / 2 : 0
      // const marginY = deltaY > 0 ? deltaY / 2 : 0
      boundingBoxes.forEach((bbox, i) => {
        boundingBoxes[i] = {
          ...bbox,
          x0: bbox.x0 + marginX,
          y0: bbox.y0,
          x1: bbox.x1 + marginX,
          y1: bbox.y1
        }
      })
    }
    return boundingBoxes
  }

  invertImage (ctx, canvas) {
    const imageDataCopy = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageDataCopy.data
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i] // red
      data[i + 1] = 255 - data[i + 1] // green
      data[i + 2] = 255 - data[i + 2] // blue
    }
    ctx.putImageData(imageDataCopy, 0, 0)
    this.setState({
      filteredImgFile: canvas.toDataURL()
    }, () => this.recognizeImage(this.state.filteredImgFile))
  }

  grayScaleImage (ctx, canvas) {
    const imageDataCopy = ctx.getImageData(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < imageDataCopy.data.length; i += 4) {
      const avg = (imageDataCopy.data[i] + imageDataCopy.data[i + 1] + imageDataCopy.data[i + 2]) / 3
      imageDataCopy.data[i] = avg // red
      imageDataCopy.data[i + 1] = avg // green
      imageDataCopy.data[i + 2] = avg // blue
    }
    ctx.putImageData(imageDataCopy, 0, 0)
    this.setState({
      filteredImgFile: canvas.toDataURL()
    }, () => this.recognizeImage(this.state.filteredImgFile))
  }

  invertWithGrayscale (ctx, canvas) {
    const imageDataCopy = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageDataCopy.data
    for (let i = 0; i < data.length; i += 4) {
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
      const invertedBrightness = 255 - brightness
      data[i] = invertedBrightness
      data[i + 1] = invertedBrightness
      data[i + 2] = invertedBrightness
    }
    ctx.putImageData(imageDataCopy, 0, 0)
    this.setState({
      filteredImgFile: canvas.toDataURL()
    }, () => this.recognizeImage(this.state.filteredImgFile))
  }

  filterImage (filterImg) {
    if (filterImg === 'Normal') {
      this.setState({
        isRecognizing: true,
        getRecognizedProduct: {},
        getRecognizedVendor: {},
        getRecognizedText: '',
        filteredImgFile: this.state.imgFile
      }, () => this.recognizeImage(this.state.filteredImgFile))
    } else {
      this.setState({
        isRecognizing: true,
        getRecognizedProduct: {},
        getRecognizedVendor: {},
        getRecognizedText: ''
      })
      const canvas = this.canvasRef.current
      const img = new Image()
      img.crossOrigin = 'anonymous'
      if (canvas) {
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d', { willReadFrequently: true })
          ctx.drawImage(img, 0, 0, img.width, img.height)
          if (filterImg === 'Inverted') {
            this.invertImage(ctx, canvas)
          } else if (filterImg === 'Grayscale') {
            this.grayScaleImage(ctx, canvas)
          } else if (filterImg === 'Grayscale Inverted') {
            this.invertWithGrayscale(ctx, canvas)
          } else {
            this.setState({
              filteredImgFile: this.state.imgFile
            }, () => this.recognizeImage(this.state.filteredImgFile))
          }
        }
        img.src = this.state.imgFile
      } else {
        this.setState({ isRecognizing: false })
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.props.t('canvas_is_null')
        })
      }
    }
  }

  findRecognizedText (recognizedText) {
    const dataCopy = [...this.props.getProductList]
    const recognizedTextLower = recognizedText.toLowerCase()
    for (const productItem of dataCopy) {
      if (recognizedTextLower.includes(productItem.product_name.toLowerCase())) {
        this.setState({ getRecognizedProduct: productItem })
        break
      }
    }
    for (const productItem of dataCopy) {
      if (recognizedTextLower.includes(productItem.vendor.toLowerCase())) {
        this.setState({ getRecognizedVendor: productItem })
        break
      }
      
    }
  }

  discardPreview () {
    this.stopCamera()
    this.setUpCamera()
    this.setState({
      imgFile: null,
      filteredImgFile: null,
      isPreviewRemoved: true
    })
  }

  stopCamera () {
    if (this.stream) {
      const tracks = this.stream.getTracks()
      tracks.forEach(track => track.stop())
    }
  }

  onCloseRecognitionModal () {
    this.setState({
      isModalOpened: false
    })
  }
  
  render() {
    return (
      <React.Fragment>
        <CameraContainer
          props={this.props}
          cameraRef={this.cameraRef}
          containerRef={this.containerRef}
          previewRef={this.previewRef}
          canvasRef={this.canvasRef}
          imgFile={this.state.filteredImgFile}
          isCameraReady={this.stream}
          isPreviewRemoved={this.state.isPreviewRemoved}
          discardPreview={this.discardPreview.bind(this)}
          isRecognizing={this.state.isRecognizing}
          boundingBoxes={this.state.boundingBoxes}
          filterImage={this.filterImage.bind(this)}
        />
        <div className="camera-menu absolute grid grid-cols-3 place-items-center justify-between bg-gradient-to-t from-black w-full p-2 bottom-0">
          <ImagePicker pickImage={this.pickImage.bind(this)}/>
          {
            this.state.isCameraPermissionGranted && this.state.isPreviewRemoved
              ? <button className="h-14 w-14 p-0.5 border-4 border-double border-white rounded-full shadow-lg" onClick={this.captureImage.bind(this)}>
                  <span className="inline-block w-full h-full rounded-full bg-white active:bg-gray-300"></span>
                </button>
              : <button className="h-14 w-14 p-0.5 border-4 border-double border-gray-500 rounded-full shadow-inner" disabled>
                  <span className="inline-block w-full h-full rounded-full bg-gray-500"></span>
                </button>
          }
          <CameraSwitcher switchCamera={this.switchCamera.bind(this)}/>
        </div>
        {
          this.stream
            ? null
            : (
              <div className="flex justify-center items-center w-full h-full">
                <button
                  className="bg-white my-2 active:bg-green-700 active:border-2 active:border-white p-3 font-sans text-green-900 active:text-white duration-200 rounded-xl shadow-xl"
                  onClick={this.setUpCamera.bind(this)}
                >{this.props.t('camera_permission')}</button>
              </div>
              )
        }
        {this.state.isDownloading
          ? (
            <div className="fixed inset-0 w-screen h-full flex flex-col items-center justify-center text-white bg-black/50 backdrop-blur-sm animate__animated animate__fadeIn z-10">
              <h3>{this.props.t('downloading_models')}</h3>
              <span className="relative inline-block border border-white my-2 py-1 w-3/4 rounded-full overflow-hidden">
                <span className="absolute top-0 bottom-0 left-0 h-full bg-white animate__animated animate__slideInLeft rounded-full" style={{ width: `${this.state.downloadingProgress}%` }}></span>
              </span>
              <h4>{this.state.downloadingProgress.toFixed(0)}%</h4>
            </div>
            )
          : null}
        <RecognizedProduct
          props={this.props}
          isRecognitionModalOpened={this.state.isModalOpened}
          recognizedProduct={this.state.getRecognizedProduct}
          recognizedVendor={this.state.getRecognizedVendor}
          recognizedText={this.state.getRecognizedText}
          onCloseRecognitionModal={this.onCloseRecognitionModal.bind(this)}
        />
      </React.Fragment>
    )
  }
}

export default withTranslation()(OCRMode)