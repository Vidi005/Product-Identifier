import { Tab } from "@headlessui/react"
import React, { Fragment } from "react"
import { withTranslation } from "react-i18next"
import en from "../../../../locales/en.json"
import ProductIdentifierContainer from "./identifier_product_tab/ProductIdentifierContainer"
import ProductListContainer from "./list_product_tab/ProductListContainer"

const MainContainer = ({ props, state, changeItemsPerPage, searchItem, changeUpdateSetting, onClickSyncBtn, syncProductData, sortItems, onSelectNavHandler, onClickDetailBtn, findProductByIdx, onCloseModal }) => (
  <main className="identifier-app__main grow lg:px-20">
    <Tab.Group as={"section"} className="tab-group h-full md:p-1 bg-green-50 dark:bg-black rounded-lg shadow-lg">
      <Tab.List className="grid grid-cols-2 gap-2 sticky top-0 m-1 md:p-0 p-1 font-medium text-base bg-green-900/20 dark:bg-white/20 rounded-xl shadow-inner">
        {en.tab_list.map((tab, index) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              selected
              ? "w-full p-1 lg:p-2 ring-green-900/50 dark:ring-white/50 ring-offset-2 focus:ring-2 outline-none rounded-lg bg-green-900 dark:bg-white text-white dark:text-black duration-200"
              : "w-full p-1 lg:p-2 ring-green-900/25 dark:ring-white/25 ring-offset-2 focus:ring-2 outline-none rounded-lg text-green-700 dark:text-gray-200 hover:bg-green-900/30 dark:hover:bg-white/30 hover:text-green-900 dark:hover:text-white duration-200"
            }
          >
            {props.t(`tab_list.${index}`)}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="h-full">
        <Tab.Panel className="max-h-screen animate__animated animate__fadeIn overflow-x-hidden">
          <ProductListContainer
            props={props}
            state={state}
            changeItemsPerPage={changeItemsPerPage}
            searchItem={searchItem}
            changeUpdateSetting={changeUpdateSetting}
            onClickSyncBtn={onClickSyncBtn}
            syncProductData={syncProductData}
            sortItems={sortItems}
            onSelectNavHandler={onSelectNavHandler}
            onClickDetailBtn={onClickDetailBtn}
            findProductByIdx={findProductByIdx}
            onCloseModal={onCloseModal}
          />
        </Tab.Panel>
        <Tab.Panel as={Fragment}>
          <ProductIdentifierContainer props={props} state={state} selectedProduct={state.getSelectedProduct} onCloseModal={onCloseModal}/>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </main>
)

export default withTranslation()(MainContainer)