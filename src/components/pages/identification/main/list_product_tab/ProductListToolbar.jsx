import { Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { withTranslation } from "react-i18next"
import ProductListAdd from "../../../account/main/ProductListAdd"
import ProductListDelete from "../../../account/main/ProductListDelete"
import ProductListExport from "../../../account/main/ProductListExport"
import ProductListImport from "../../../account/main/ProductListImport"
import ProductListEntries from "./ProductListEntries"
import ProductListSearch from "./ProductListSearch"
import ProductListSort from "./ProductListSort"
import ProductListSync from "./ProductListSync"

const ProductListToolbar = ({ props, isUserLoggedIn, isUserActivated, changeItemsPerPage, searchItem, sortItems, onClickSyncBtn, onClickEditBtn, onClickImportBtn, onClickExportBtn, onClickDeleteAllBtn, isSyncBtnClicked, isCheckingForUpdate }) => (
  <div className="product-toolbar sticky top-0 z-10">
    <section className="content__product-toolbar flex m-1 px-2 md:px-0 py-1 bg-green-100/75 dark:bg-gray-800/50 border border-b md:border-none border-green-900 dark:border-white backdrop-blur-sm rounded-lg shadow-md md:shadow-none dark:shadow-white/50">
      <ProductListEntries t={props.t} changeItemsPerPage={changeItemsPerPage}/>
      <ProductListSearch t={props.t} searchItem={searchItem}/>
      {(!isUserLoggedIn || !isUserActivated) && <ProductListSync t={props.t} onClickSyncBtn={onClickSyncBtn} isSyncBtnClicked={isSyncBtnClicked}/>}
      {isUserLoggedIn && isUserActivated && <ProductListAdd t={props.t} onClickEditBtn={onClickEditBtn}/>}
      {isUserLoggedIn && isUserActivated && <ProductListImport t={props.t} onClickImportBtn={onClickImportBtn}/>}
      {isUserLoggedIn && isUserActivated && <ProductListExport t={props.t} onClickExportBtn={onClickExportBtn}/>}
      {isUserLoggedIn && isUserActivated && <ProductListDelete t={props.t} onClickDeleteAllBtn={onClickDeleteAllBtn}/>}
      <ProductListSort t={props.t} sortProductsBy={sortItems}/>
    </section>
    <Transition
      show={isCheckingForUpdate || false}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 -translate-y-full"
      enterTo="opacity-100 translate-y-0"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-full"
    >
      <p className="w-full text-center text-sm font-sans bg-white/70 p-1">{props.t('checking_for_update')}</p>
    </Transition>
  </div>
)

export default withTranslation()(ProductListToolbar)