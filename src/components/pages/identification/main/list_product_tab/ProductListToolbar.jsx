import React from "react"
import ProductListEntries from "./ProductListEntries"
import ProductListSearch from "./ProductListSearch"
import ProductListSort from "./ProductListSort"
import ProductListSync from "./ProductListSync"

const ProductListToolbar = ({ props, changeItemsPerPage, searchItem, sortItems, onClickSyncBtn, onClickDeleteAllBtn, isSyncBtnClicked }) => (
  <section className="product-toolbar sticky flex m-1 px-2 py-1 top-0 bg-green-100/75 dark:bg-gray-800/50 border border-b md:border-none border-green-900 dark:border-white z-10 backdrop-blur-sm rounded-lg shadow-md md:shadow-none dark:shadow-white/50">
    <ProductListEntries t={props.t} changeItemsPerPage={changeItemsPerPage}/>
    <ProductListSearch t={props.t} searchItem={searchItem}/>
    <ProductListSync t={props.t} onClickSyncBtn={onClickSyncBtn} isSyncBtnClicked={isSyncBtnClicked}/>
    {/* <ProductListDelete t={props.t} onClickDeleteAllBtn={onClickDeleteAllBtn}/> */}
    <ProductListSort t={props.t} sortProductsBy={sortItems}/>
  </section>
)

export default ProductListToolbar