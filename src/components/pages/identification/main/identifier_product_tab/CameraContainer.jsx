import React from "react"
import FilterMenu from "./FilterMenu"

const CameraContainer = ({ props, cameraRef, canvasRef, containerRef, previewRef, imgFile, isCameraReady, isPreviewRemoved, isRecognizing, boundingBoxes, discardPreview, filterImage }) => (
  <React.Fragment>
    {isPreviewRemoved
      ? (
        <React.Fragment>
          {isCameraReady
            ? <video
                ref={cameraRef}
                className="tab-identifier__capture w-full"
                autoFocus
                autoPlay
                playsInline
                muted
                width="100%">
              </video>
            : null
          }
        </React.Fragment>
        )
      : (
        <div ref={containerRef} className="tab-identifier__preview absolute inset-0 max-h-full overflow-hidden">
          <img ref={previewRef} className="m-auto max-h-full object-center object-contain" src={imgFile} alt="Image Preview" />
          <div className="bbox-container absolute inset-0">
            {boundingBoxes.map((bbox, index) => (
              <span key={index} className="absolute inset-0 max-w-full border border-red-700 shadow-inner shadow-white/50" style={{
                top: bbox.y0 + 'px',
                left: bbox.x0 + 'px',
                width: bbox.x1 - bbox.x0 + 'px',
                height: bbox.y1 - bbox.y0 + 'px',
              }}></span>
            ))}
          </div>
          <FilterMenu props={props.t} filterImage={filterImage}/>
          <button className="w-9 h-9 absolute top-2 right-2 p-1 border border-white hover:bg-black/50 bg-black/25 backdrop-blur-sm rounded-md shadow-inner" onClick={() => discardPreview()} aria-label="Remove preview">
            <img className="w-full object-contain object-center" src="images/delete-icon.svg" alt="Remove preview" />
          </button>
        </div>
        )}
    {isRecognizing
    ? (
      <div className="fixed inset-0 w-screen h-full flex items-center justify-center bg-black/50 backdrop-blur-sm duration-200 z-10">
        <div className="flex items-center justify-center space-x-2">
          <span className="w-8 h-8 aspect-square border-t-2 border-r-2 border-t-white border-r-white rounded-full bg-transparent animate-spin"></span>
          <span className="text-white text-xl">{props.t('recognizing')}</span>
        </div>
      </div>
      )
    : null}
    <canvas ref={canvasRef} className="hidden"></canvas>
  </React.Fragment>)

export default CameraContainer