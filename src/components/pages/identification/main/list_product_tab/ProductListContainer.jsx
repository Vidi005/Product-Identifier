import React from "react"
import PaginationSection from "../navigation/PaginationSection"
import DetailProductItem from "./pop_up/DetailProductItem"
import SyncProductItems from "./pop_up/SyncProductItems"
import ProductItemContent from "./ProductItemContent"
import ProductListToolbar from "./ProductListToolbar"
import TableRowGroup from "./TableRowGroup"

const ProductListContainer = ({ props, state, changeItemsPerPage, searchItem, changeUpdateSetting, onClickSyncBtn, syncProductData, sortItems, onSelectNavHandler, onClickDetailBtn, onCloseModal }) => (
  <React.Fragment>
    <ProductListToolbar
      props={props}
      changeItemsPerPage={changeItemsPerPage}
      searchItem={searchItem}
      onClickSyncBtn={onClickSyncBtn}
      sortItems={sortItems}
      isSyncBtnClicked={state.isSyncBtnClicked}
      isCheckingForUpdate={state.isCheckingForUpdate}
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
                    <article className="tab-product-list__content md:table md:table-auto border-2 border-black dark:border-white w-full max-h-full my-1 md:bg-gray-100 dark:bg-black font-sans text-sm overflow-y-auto md:shadow-lg md:overflow-x-hidden animate__animated animate__fadeIn animate__faster">
                      <TableRowGroup t={props.t} sortBy={state.sortBy} sortItemsHandler={sortItems}/>
                      {state.getProductsPerPage.map((productItem, i) => (
                        <ProductItemContent
                          state={state}
                          t={props.t}
                          key={i}
                          index={productItem.index}
                          productName={productItem.product_name}
                          vendor={productItem.vendor}
                          nameTag={productItem.name_tag}
                          colorTag={productItem.color_tag}
                          dateCreated={productItem.date_created}
                          i={i}
                          onClickDetailBtn={onClickDetailBtn}
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
  </React.Fragment>
)

export default ProductListContainer