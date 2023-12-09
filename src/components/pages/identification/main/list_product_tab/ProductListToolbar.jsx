import React from "react"
import ProductListDelete from "./ProductListDelete"
import ProductListSearch from "./ProductListSearch"
import ProductListSort from "./ProductListSort"
import ProductListSync from "./ProductListSync"

const ProductListToolbar = ({ t, searchItem, sortProductsBy, onClickSyncBtn, deleteAllItems, isSyncBtnClicked }) => (
  <section className="product-toolbar sticky flex m-1 md:m-1 px-2 py-1 top-0 bg-green-100 border border-b border-green-900 z-10 rounded-lg shadow-lg">
    <ProductListSearch t={t} searchItem={searchItem}/>
    <ProductListSync onClickSyncBtn={onClickSyncBtn} isSyncBtnClicked={isSyncBtnClicked}/>
    <ProductListDelete deleteAllItems={deleteAllItems}/>
    <ProductListSort t={t} sortProductsBy={sortProductsBy}/>
  </section>
)

export default ProductListToolbar