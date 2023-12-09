import React from "react"
import ProductListToolbar from "./ProductListToolbar"

const ProductListContainer = ({ props, state }) => {
  if (state.isProductListLoading) {
    return (
      <article className="tab-product-list__container border border-green-900 rounded-lg p-4 bg-green-100">
        <p className="w-8 h-8 aspect-square m-auto border-t-2 border-r-2 border-green-900 rounded-full bg-transparent animate-spin"></p>
      </article>
    )
  } else {
    if (state.getSortedProducts.length > 0) {
      return (
        <React.Fragment>
          <ProductListToolbar t={props.t} searchItem={state.searchQuery} sortProductsBy={state.sortProductsBy}/>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <ProductListToolbar t={props.t} searchItem={state.searchQuery} sortProductsBy={state.sortProductsBy}/>
          <article className="tab-product-list__content font-sans font-bold text-center text-green-900 border border-green-700 rounded-lg inset-2 p-4 bg-green-100">
            <p>{props.t('empty_list')}</p>
          </article>
        </React.Fragment>
      )
    }
  }
}

export default ProductListContainer