import { Tab } from "@headlessui/react"
import React, { Fragment } from "react"
import { withTranslation } from "react-i18next"
import en from "../../../../locales/en.json"
import ProductIdentifierContainer from "./identifier_product_tab/ProductIdentifierContainer"
import ProductListContainer from "./list_product_tab/ProductListContainer"

const MainContainer = ({ props, state }) => (
  <main className="identifier-app__main h-screen lg:py-2 lg:px-20">
    <Tab.Group as={"section"} className="tab-group h-full md:p-1 bg-green-50 rounded-lg shadow-lg">
      <Tab.List className="grid grid-cols-2 gap-2 sticky m-1 md:p-0 p-1 font-medium text-base bg-green-900/20 rounded-xl shadow-inner">
        {en.tab_list.map((tab, index) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              selected
              ? "w-full p-1 lg:p-2 ring-green-900/50 ring-offset-2 focus:ring-2 outline-none rounded-lg bg-green-900 text-white duration-200"
              : "w-full p-1 lg:p-2 ring-green-900/25 ring-offset-2 focus:ring-2 outline-none rounded-lg text-green-700 hover:bg-green-900/30 hover:text-green-900 duration-200"
            }
          >
            {props.t(`tab_list.${index}`)}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="h-full">
        <Tab.Panel className="h-full animate__animated animate__fadeIn">
          <ProductListContainer props={props} state={state}/>
        </Tab.Panel>
        <Tab.Panel as={Fragment}>
          <ProductIdentifierContainer props={props} selectedProduct={state.selected}/>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </main>
)

export default withTranslation()(MainContainer)