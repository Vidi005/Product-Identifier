import React from "react"
import ProductItemContent from "./ProductItemContent"
import ProductListToolbar from "./ProductListToolbar"

const ProductListContainer = ({ props, state, searchItem, onClickSyncBtn, sortItems, onSelectNavHandler, onClickDeleteAllBtn, onClickDetailBtn, onClickEditBtn, onClickDeleteBtn }) => {
  if (state.isProductListLoading) {
    return (
      <article className="tab-product-list__container border border-green-900 dark:border-white rounded-lg p-4 bg-green-100 dark:bg-gray-700">
        <p className="w-8 h-8 aspect-square m-auto border-t-2 border-r-2 border-green-900 dark:border-white rounded-full bg-transparent animate-spin"></p>
      </article>
    )
  } else {
    if (state.getFilteredProducts.length > 0) {
      return (
        <React.Fragment>
          <ProductListToolbar
            t={props.t}
            searchItem={searchItem}
            onClickSyncBtn={onClickSyncBtn}
            sortItems={sortItems}
            onClickDeleteAllBtn={onClickDeleteAllBtn}
            isSyncBtnClicked={state.isSyncBtnClicked}
          />
          <article className="tab-product-list__content max-h-full my-1 font-sans text-sm overflow-y-auto animate__animated animate__fadeIn animate__faster">
            {state.getProductsPerPage.map((productItem, i) => (
              <ProductItemContent
                key={i}
                index={productItem.index}
                productName={productItem.product_name}
                vendor={productItem.vendor}
                nameTag={productItem.name_tag}
                colorTag={productItem.color_tag}
                i={i}
                onClickDetailBtn={onClickDetailBtn}
                onClickEditBtn={onClickEditBtn}
                onClickDeleteBtn={onClickDeleteBtn}
              />
            ))}
          </article>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <ProductListToolbar
            t={props.t}
            searchItem={searchItem}
            onClickSyncBtn={onClickSyncBtn}
            sortItems={sortItems}
            onClickDeleteAllBtn={onClickDeleteAllBtn}
            isSyncBtnClicked={state.isSyncBtnClicked}
          />
          <article className="tab-product-list__content font-sans font-bold text-center text-green-900 dark:text-white border border-green-700 dark:border-gray-200 rounded-lg inset-2 p-4 bg-green-100 dark:bg-gray-900">
            <p>{props.t('empty_list')}</p>
          </article>
        </React.Fragment>
      )
    }
  }
}

export default ProductListContainer