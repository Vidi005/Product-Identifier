import React from "react"
import PaginationSection from "../navigation/PaginationSection"
import ProductListMenu from "../navigation/ProductListMenu"
import DetailProductItem from "./pop_up/DetailProductItem"
import EditProductItem from "./pop_up/EditProductItem"
import SyncProductItems from "./pop_up/SyncProductItems"
import ProductItemContent from "./ProductItemContent"
import ProductListToolbar from "./ProductListToolbar"

const ProductListContainer = ({ props, state, changeUpdateSetting, searchItem, onClickSyncBtn, syncProductData, sortItems, onSelectNavHandler, onClickDeleteAllBtn, onClickDetailBtn, onClickEditBtn, onClickDeleteBtn, findProductByIdx, editProductItem, onCloseModal }) => (
  <React.Fragment>
    <ProductListToolbar
      t={props.t}
      searchItem={searchItem}
      onClickSyncBtn={onClickSyncBtn}
      sortItems={sortItems}
      onClickDeleteAllBtn={onClickDeleteAllBtn}
      isSyncBtnClicked={state.isSyncBtnClicked}
    />
    {
      state.isProductListLoading
        ? (
          <article className="tab-product-list__container border border-green-900 dark:border-white rounded-lg m-1 p-4 bg-green-100 dark:bg-gray-700">
            <p className="w-8 h-8 aspect-square m-auto border-t-2 border-r-2 border-green-900 dark:border-white rounded-full bg-transparent animate-spin"></p>
          </article>
          )
        : (
          <React.Fragment>
            {
              state.getFilteredProducts.length > 0
                ? (
                  <React.Fragment>
                    <article className="tab-product-list__content max-h-full my-1 dark:bg-black font-sans text-sm overflow-y-auto animate__animated animate__fadeIn animate__faster">
                      {state.getProductsPerPage.map((productItem, i) => (
                        <ProductItemContent
                          t={props.t}
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
                    <PaginationSection
                      t={props.t}
                      onSelectNavHandler={onSelectNavHandler}
                      numProducts={state.getFilteredProducts.length}
                      itemsPerPage={state.itemsPerPage}
                      pagePosition={state.currentPage}
                      lastPage={state.lastPage}
                    />
                  </React.Fragment>
                  )
                : (
                  <article className="tab-product-list__content min-h-full font-sans font-bold text-center text-green-900 dark:text-white dark:bg-black">
                    <p className="border border-green-700 dark:border-gray-200 m-1 p-4 bg-green-100 dark:bg-gray-900 rounded-lg">{props.t('empty_list')}</p>
                  </article>
                  )
            }
          </React.Fragment>
          )
    }
    <ProductListMenu onClickEditBtn={onClickEditBtn}/>
    <SyncProductItems
      t={props.t}
      isSyncModalOpened={state.isSyncModalOpened}
      syncProductData={syncProductData}
      isAutoCheckUpdate={state.isAutoCheckUpdate}
      changeUpdateSetting={changeUpdateSetting}
      onCloseSyncModal={onCloseModal}/>
    <DetailProductItem
      props={props}
      isDetailModalOpened={state.isDetailModalOpened}
      selectedProduct={state.getSelectedProduct}
      onCloseDetailModal={onCloseModal} />
    <EditProductItem
      isEditModalOpened={state.isEditModalOpened}
      findProductByIdx={findProductByIdx}
      editProductItem={editProductItem}
      onCloseEditModal={onCloseModal}
    />
  </React.Fragment>
)

export default ProductListContainer