import React from "react"
import LargeDeviceDisplayList from "./LargeDeviceDisplayList"
import MobileDeviceDisplayList from "./MobileDeviceDisplayList"

const ProductItemContent = ({ state, t, index, productName, vendor, dateCreated, nameTag, colorTag, i, onClickEditBtn, onClickDeleteBtn }) => (
  <React.Fragment>
    <MobileDeviceDisplayList
      t={t}
      index={index}
      productName={productName}
      vendor={vendor}
      nameTag={nameTag}
      colorTag={colorTag}
      i={i}
      onClickEditBtn={onClickEditBtn}
      onClickDeleteBtn={onClickDeleteBtn}
    />
    <LargeDeviceDisplayList
      t={t}
      index={index}
      productName={productName}
      vendor={vendor}
      nameTag={nameTag}
      colorTag={colorTag}
      dateCreated={dateCreated}
      itemsPerPage={state.itemsPerPage}
      pagePosition={state.currentPage}
      i={i}
      onClickEditBtn={onClickEditBtn}
      onClickDeleteBtn={onClickDeleteBtn}
    />
  </React.Fragment>
)

export default ProductItemContent