import { Dialog } from "@headlessui/react"
import React from "react"
import { withTranslation } from "react-i18next"

const MobileDisplayDetail = ({ t, selectedProduct, onCloseDetailModal }) => {
  const unusedVars = ['index', 'color_tag']
  const detailProductVars = Object.keys(selectedProduct).reduce((acc, key) => {
    if (!unusedVars.includes(key)) {
      acc[key] = selectedProduct[key]
    }
    return acc
  }, {})
  return (
    <Dialog.Panel className={"md:hidden flex flex-col bg-green-100 dark:bg-gray-700 m-auto w-full max-h-full max-w-5xl font-sans p-4 rounded-lg shadow-lg dark:shadow-white/50 overflow-hidden"}>
      <span className="inline-flex w-full items-center justify-end">
        <button className="flex items-center justify-center px-2 aspect-square font-mono text-center text-green-900 dark:text-white bg-green-900/20 hover:bg-green-700/50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" onClick={() => onCloseDetailModal()}>
          <h4>x</h4>
        </button>
      </span>
      <Dialog.Title as="h3" className="text-center text-green-900 dark:text-white">Detail Product</Dialog.Title>
      <span className="product-detail grow overflow-y-auto">
        {Object.entries(detailProductVars).map(([key, val], i) => {
          return (
            <React.Fragment key={key}>
              <h4 className="product-title border-b border-b-green-900 dark:border-b-white mt-3 text-justify text-green-900 dark:text-white">{t(`product_vars.${i}`)}</h4>
              <p className="product-content text-justify text-green-900 dark:text-white">{val === '' ? '-': val}</p>
            </React.Fragment>
          )
        })}
      </span>
    </Dialog.Panel>
  )
}

export default withTranslation()(MobileDisplayDetail)