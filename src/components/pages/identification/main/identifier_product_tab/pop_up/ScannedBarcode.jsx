import React from "react"

const ScannedBarcode = ({ props, isScanResultModalOpened, selectedProduct, onCloseScanResultModal }) => {
  if (Object.keys(selectedProduct).length > 0) {
    return (
      <React.Fragment></React.Fragment>
    )
  } else {
    return (
      <React.Fragment></React.Fragment>
    )
  }
}

export default ScannedBarcode