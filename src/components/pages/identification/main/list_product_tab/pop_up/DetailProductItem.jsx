import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import LargeDisplayDetail from "./LargeDisplayDetail"
import MobileDisplayDetail from "./MobileDisplayDetail"

const DetailProductItem = ({ props, isDetailModalOpened, selectedProduct, onCloseDetailModal }) => (
  <Transition appear show={isDetailModalOpened} as={Fragment}>
    <Dialog as={"section"} className="detail-product-modal relative z-10" onClose={() => onCloseDetailModal()}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
      </Transition.Child>
      <Transition.Child
        className={"fixed inset-4 flex items-center justify-center"}
        enter="ease-out duration-500"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in duration-500"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
      >
        <Dialog.Panel className={"flex flex-col bg-green-100 dark:bg-gray-700 m-auto w-full max-h-full max-w-5xl font-sans p-4 rounded-lg shadow-lg dark:shadow-white/50 overflow-hidden"}>
          <span className="inline-flex w-full items-center justify-end">
            <button className="flex items-center justify-center px-3 aspect-square font-mono text-center text-green-900 dark:text-white bg-green-900/20 hover:bg-green-700/50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" onClick={() => onCloseDetailModal()}>
              <h4>X</h4>
            </button>
          </span>
          <Dialog.Title as="h3" className="text-center text-green-900 dark:text-white">Detail Product</Dialog.Title>
          <MobileDisplayDetail t={props.t} selectedProduct={selectedProduct} />
          <LargeDisplayDetail t={props.t} selectedProduct={selectedProduct} />
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  </Transition>
)

export default DetailProductItem