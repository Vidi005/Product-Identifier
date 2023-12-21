import { Dialog } from "@headlessui/react"
import React from "react"
import { withTranslation } from "react-i18next"

const LargeDisplayDetail = ({ t, selectedProduct, onCloseDetailModal }) => {
  const unusedVars = ['index', 'color_tag']
  const detailProductVars = Object.keys(selectedProduct).reduce((acc, key) => {
    if (!unusedVars.includes(key)) {
      acc[key] = selectedProduct[key]
    }
    return acc
  }, {})
  return (
    <Dialog.Panel className={"hidden md:inline-flex flex-col bg-green-100 dark:bg-gray-700 m-auto w-full max-h-full max-w-5xl font-sans p-8 rounded-lg shadow-lg dark:shadow-white/50 overflow-hidden"}>
      <span className="inline-flex w-full items-center justify-end">
        <button className="flex items-center justify-center px-2 aspect-square font-mono text-center text-green-900 dark:text-white bg-green-900/20 hover:bg-green-700/50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" onClick={() => onCloseDetailModal()}>
          <h4>x</h4>
        </button>
      </span>
      <Dialog.Title as="h3" className="text-center text-green-900 dark:text-white">Detail Product</Dialog.Title>
      <table className="product-detail mt-4 grow overflow-auto">
        <tbody>
          {Object.entries(detailProductVars).map(([key, val], i) => {
            return (
              <tr className="product-item w-full border-b border-b-green-900 dark:border-b-white leading-loose text-justify text-lg text-green-900 dark:text-white" key={key}>
                <td className="product-title font-bold">{t(`product_vars.${i}`)}</td>
                <td>:</td>
                <td className="product-content pl-1">{val === '' ? '-': val}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Dialog.Panel>
  )
}

export default withTranslation()(LargeDisplayDetail)