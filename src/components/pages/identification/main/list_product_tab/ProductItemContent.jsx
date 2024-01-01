import React from "react"
import LargeDeviceDisplayList from "./LargeDeviceDisplayList"
import MobileDeviceDisplayList from "./MobileDeviceDisplayList"

const ProductItemContent = ({ state, t, index, productName, vendor, dateCreated, nameTag, colorTag, i, onClickDetailBtn }) => (
  <React.Fragment>
    <MobileDeviceDisplayList
      t={t}
      index={index}
      productName={productName}
      vendor={vendor}
      nameTag={nameTag}
      colorTag={colorTag}
      i={i}
      onClickDetailBtn={onClickDetailBtn}
    />
    <LargeDeviceDisplayList
      t={t}
      index={index}
      productName={productName}
      vendor={vendor}
      dateCreated={dateCreated}
      nameTag={nameTag}
      colorTag={colorTag}
      pagePosition={state.currentPage}
      itemsPerPage={state.itemsPerPage}
      i={i}
      onClickDetailBtn={onClickDetailBtn}
    />
  </React.Fragment>
)
  
export default ProductItemContent