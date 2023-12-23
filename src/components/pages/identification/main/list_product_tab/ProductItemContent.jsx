import React from "react"
import LargeDeviceDisplayList from "./LargeDeviceDisplayList"
import MobileDeviceDisplayList from "./MobileDeviceDisplayList"

const ProductItemContent = ({ t, index, productName, productIds, category, vendor, origin, dateCreated, nameTag, colorTag, description, alternatives, sources, addedBy, modifiedBy, i, onClickDetailBtn, onClickEditBtn, onClickDeleteBtn }) => (
  <React.Fragment>
    <MobileDeviceDisplayList
      t={t}
      index={index}
      productName={productName}
      productIds={productIds}
      category={category}
      vendor={vendor}
      origin={origin}
      dateCreated={dateCreated}
      nameTag={nameTag}
      colorTag={colorTag}
      description={description}
      alternatives={alternatives}
      sources={sources}
      addedBy={addedBy}
      modifiedBy={modifiedBy}
      i={i}
      onClickDetailBtn={onClickDetailBtn}
      onClickEditBtn={onClickEditBtn}
      onClickDeleteBtn={onClickDeleteBtn}
    />
    <LargeDeviceDisplayList
      t={t}
      index={index}
      productName={productName}
      productIds={productIds}
      category={category}
      vendor={vendor}
      origin={origin}
      dateCreated={dateCreated}
      nameTag={nameTag}
      colorTag={colorTag}
      description={description}
      alternatives={alternatives}
      sources={sources}
      addedBy={addedBy}
      modifiedBy={modifiedBy}
      i={i}
      onClickDetailBtn={onClickDetailBtn}
      onClickEditBtn={onClickEditBtn}
      onClickDeleteBtn={onClickDeleteBtn}
    />
  </React.Fragment>
)
  
export default ProductItemContent