import React from "react"
import PaginationSection from "../navigation/PaginationSection"
import DetailProductItem from "./pop_up/DetailProductItem"
import SyncProductItems from "./pop_up/SyncProductItems"
import ProductItemContent from "./ProductItemContent"
import ProductListToolbar from "./ProductListToolbar"

const ProductListContainer = ({ props, state, changeItemsPerPage, searchItem, changeUpdateSetting, onClickSyncBtn, syncProductData, sortItems, onSelectNavHandler, onClickDeleteAllBtn, onClickDetailBtn, onClickEditBtn, onClickDeleteBtn, findProductByIdx, editProductItem, onCloseModal }) => (
  <React.Fragment>
    <ProductListToolbar
      t={props.t}
      changeItemsPerPage={changeItemsPerPage}
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
                    <article className="tab-product-list__content md:table md:table-auto w-full max-h-full my-1 md:bg-gray-100 dark:bg-black font-sans text-sm overflow-y-auto md:shadow-lg md:rounded-lg md:overflow-x-hidden animate__animated animate__fadeIn animate__faster">
                      <tr className="hidden md:table-row md:sticky top-0 text-center text-lg text-black leading-loose dark:text-white bg-gray-200 dark:bg-gray-800 z-10">
                        <th className="border-x border-black dark:border-white">No</th>
                        <th className="border-x border-black dark:border-white">
                          <span className="inline-flex items-center flex-nowrap">
                            <p className="grow">{props.t('product_name')}</p>
                            <img className="max-h-7 object-contain dark:invert" src="images/arrow-inactive-icon.svg" alt="Arrow Up" />
                            <img className="max-h-7 object-contain dark:invert scale-y-[-1]" src="images/arrow-active-icon.svg" alt="Arrow Down" />
                          </span>
                        </th>
                        <th className="border-x border-black dark:border-white">
                          <span className="inline-flex items-center flex-nowrap">
                            <p className="grow">{props.t('vendor')}</p>
                            <img className="max-h-7 object-contain dark:invert" src="images/arrow-inactive-icon.svg" alt="Arrow Up" />
                            <img className="max-h-7 object-contain dark:invert scale-y-[-1]" src="images/arrow-active-icon.svg" alt="Arrow Down" />
                          </span>
                        </th>
                        <th className="border-x border-black dark:border-white">
                          <span className="inline-flex items-center flex-nowrap">
                            <p className="grow">{props.t('name_tag')}</p>
                            <img className="max-h-7 object-contain dark:invert" src="images/arrow-inactive-icon.svg" alt="Arrow Up" />
                            <img className="max-h-7 object-contain dark:invert scale-y-[-1]" src="images/arrow-active-icon.svg" alt="Arrow Down" />
                          </span>
                        </th>
                        <th className="border-x border-black dark:border-white">
                          <span className="inline-flex items-center flex-nowrap">
                            <p className="grow">{props.t('action_table_data')}</p>
                            <img className="max-h-7 object-contain dark:invert" src="images/arrow-inactive-icon.svg" alt="Arrow Up" />
                            <img className="max-h-7 object-contain dark:invert scale-y-[-1]" src="images/arrow-active-icon.svg" alt="Arrow Down" />
                          </span>
                        </th>
                      </tr>
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
    {/* <ProductListMenu onClickEditBtn={onClickEditBtn}/> */}
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
    {/* <EditProductItem
      isEditModalOpened={state.isEditModalOpened}
      findProductByIdx={findProductByIdx}
      editProductItem={editProductItem}
      onCloseEditModal={onCloseModal}
    /> */}
  </React.Fragment>
)

export default ProductListContainer