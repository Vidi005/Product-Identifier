import React from "react"
import ProductListDelete from "./ProductListDelete"
import ProductListSearch from "./ProductListSearch"
import ProductListSort from "./ProductListSort"
import ProductListSync from "./ProductListSync"

const ProductListToolbar = ({ t, searchItem, sortItems, onClickSyncBtn, onClickDeleteAllBtn, isSyncBtnClicked }) => (
  <section className="product-toolbar sticky flex m-1 md:m-1 px-2 py-1 top-0 bg-green-100 dark:bg-gray-800 border border-b border-green-900 dark:border-white z-10 rounded-lg shadow-md dark:shadow-white">
    <ProductListSearch t={t} searchItem={searchItem}/>
    <ProductListSync onClickSyncBtn={onClickSyncBtn} isSyncBtnClicked={isSyncBtnClicked}/>
    <ProductListDelete onClickDeleteAllBtn={onClickDeleteAllBtn}/>
    <ProductListSort t={t} sortProductsBy={sortItems}/>
  </section>
)

export default ProductListToolbar