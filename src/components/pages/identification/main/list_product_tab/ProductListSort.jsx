import { Menu, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { withTranslation } from "react-i18next"
import en from "../../../../../locales/en.json"

const ProductListSort = ({ t, sortProductsBy }) => (
  <Menu as={"menu"} className="relative inline-block">
    <Menu.Button className="bg-gray-50 dark:bg-gray-300 md:ml-1 p-1 hover:bg-gray-400 dark:hover:bg-white duration-200 rounded-lg shadow dark:shadow-white">
      <img className="max-h-7 aspect-square" src="images/sort-icon.svg" alt="Sort" />
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-300"
      enterFrom="transform opacity-0 scale-95 -translate-y-1/3"
      enterTo="transform opacity-100 scale-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="transform opacity-100 scale-100 translate-y-0"
      leaveTo="transform opacity-0 scale-95 -translate-y-1/3"
    >
      <Menu.Items className={"absolute -right-2 mt-2 w-max px-2 py-1 origin-top-right grid grid-flow-row gap-1 items-center rounded-lg bg-green-50 dark:bg-gray-900 shadow dark:shadow-white font-sans text-sm text-center"}>
        {en.sort_products.map((sortBy, i) => (
          <Menu.Item key={sortBy} as={"span"} className={"text-green-900 dark:text-white bg-green-50 dark:bg-gray-900 hover:text-white dark:hover:text-black hover:bg-green-900 dark:hover:bg-white hover:underline cursor-pointer rounded-md p-2 duration-200 animate__animated animate__fadeInRight animate__faster"} onClick={() => sortProductsBy(t(`sort_products.${i}`))}>
            {t(`sort_products.${i}`)}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
)

export default withTranslation()(ProductListSort)