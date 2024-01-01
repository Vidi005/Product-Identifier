import React from "react"
import ProductListToolbar from "../../identification/main/list_product_tab/ProductListToolbar"
import TableRowGroup from "../../identification/main/list_product_tab/TableRowGroup"
import PaginationSection from "../../identification/main/navigation/PaginationSection"
import ProductListMenu from "./navigation/ProductListMenu"
import EditProductItem from "./pop_up/EditProductItem"
import ProductItemContent from "./ProductItemContent"

const ProductDataContainer = ({ props, state, changeItemsPerPage, searchItem, sortItems, onSelectNavHandler, onClickDeleteAllBtn, onClickEditBtn, onClickImportBtn, onClickExportBtn, onClickDeleteBtn, findProductByIdx, editProductItem, onCloseModal }) => (
  <main className="product-data-app__main grow lg:px-20 overflow-x-hidden animate__animated animate__fadeIn">
    <ProductListToolbar
      props={props}
      isUserLoggedIn={state?.isUserLoggedIn}
      isUserActivated={state?.isUserActivated}
      changeItemsPerPage={changeItemsPerPage}
      searchItem={searchItem}
      sortItems={sortItems}
      onClickEditBtn={onClickEditBtn}
      onClickImportBtn={onClickImportBtn}
      onClickExportBtn={onClickExportBtn}
      onClickDeleteAllBtn={onClickDeleteAllBtn}
    />
    {
      state.isProductListLoading
        ? (
          <article className="product-data__container border border-green-900 dark:border-white rounded-lg m-1 p-4 bg-green-100 dark:bg-gray-700">
            <p className="w-8 h-8 aspect-square m-auto border-t-2 border-r-2 border-green-900 dark:border-white rounded-full bg-transparent animate-spin"></p>
          </article>
          )
        : (
          <React.Fragment>
            {
              state.getFilteredProducts.length > 0
                ? (
                  <React.Fragment>
                    <article className="product-data__content md:table md:table-auto border-2 border-black dark:border-white w-full max-h-full my-1 md:bg-gray-100 dark:bg-black font-sans text-sm overflow-y-auto md:shadow-lg md:overflow-x-hidden animate__animated animate__fadeIn animate__faster">
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
                  <article className="product-data__content min-h-full font-sans font-bold text-center text-green-900 dark:text-white dark:bg-black">
                    <p className="border border-green-700 dark:border-gray-200 m-1 p-4 bg-green-100 dark:bg-gray-900 rounded-lg">{props.t('empty_list')}</p>
                  </article>
                  )
            }
          </React.Fragment>
          )
    }
    <ProductListMenu onClickEditBtn={onClickEditBtn}/>
    <EditProductItem
      isEditModalOpened={state.isEditModalOpened}
      findProductByIdx={findProductByIdx}
      editProductItem={editProductItem}
      onCloseEditModal={onCloseModal}/>
  </main>
)

export default ProductDataContainer