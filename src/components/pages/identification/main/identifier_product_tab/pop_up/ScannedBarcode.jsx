import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { withTranslation } from "react-i18next"
import Swal from "sweetalert2"
import LargeDisplayDetail from "../../list_product_tab/pop_up/LargeDisplayDetail"
import MobileDisplayDetail from "../../list_product_tab/pop_up/MobileDisplayDetail"

const ScannedBarcode = ({ props, isScanResultModalOpened, scannedProduct, scannedResult, onCloseScanResultModal }) => {
  if (Object.keys(scannedProduct).length > 0) {
    return (
      <Transition appear show={isScanResultModalOpened} as={Fragment}>
        <Dialog as={"section"} className="scan-result-modal relative z-10" onClose={() => onCloseScanResultModal()}>
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
            className={"fixed bottom-0 left-0 right-0 h-4/5 md:h-3/4 flex items-center justify-center"}
            enter="ease-out duration-500"
            enterFrom="opacity-0 translate-y-full"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-500"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-full"
          >
            <Dialog.Panel className={"flex flex-col bg-green-100 dark:bg-gray-700 w-full h-full max-w-5xl font-sans p-4 rounded-t-lg shadow-lg dark:shadow-white/50 overflow-hidden"}>
              <span className="inline-flex items-center justify-end">
                <button className="px-2 font-mono align-middle text-center text-green-900 dark:text-white bg-green-900/20 hover:bg-green-700/50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" onClick={() => onCloseScanResultModal()}>
                  <h4>X</h4>
                </button>
              </span>
              <Dialog.Title as="h3" className="text-center text-green-900 dark:text-white">{props.t('identified_product')}</Dialog.Title>
              <MobileDisplayDetail t={props.t} selectedProduct={scannedProduct} />
              <LargeDisplayDetail t={props.t} selectedProduct={scannedProduct} />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    )
  } else if (scannedResult.length > 0) {
    return (
      <Transition appear show={isScanResultModalOpened} as={Fragment}
      >
        <Dialog as={"section"} className="unlisted-product-modal relative z-10" onClose={() => onCloseScanResultModal()}>
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
            className={"fixed bottom-0 left-0 right-0 h-1/2 md:h-1/4 flex items-center justify-center"}
            enter="ease-out duration-500"
            enterFrom="opacity-0 translate-y-full"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-500"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-full"
          >
            <Dialog.Panel className={"flex flex-col bg-green-100 dark:bg-gray-700 w-full h-full max-w-5xl font-sans p-4 rounded-t-lg shadow-lg dark:shadow-white/50 overflow-x-hidden overflow-y-auto"}>
              <span className="inline-flex items-center justify-end">
                <button className="px-2 font-mono align-middle text-center text-green-900 dark:text-white bg-green-900/20 hover:bg-green-700/50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" onClick={() => onCloseScanResultModal()}>
                  <h4>X</h4>
                </button>
              </span>
              <Dialog.Title as="h3" className="text-center text-green-900 dark:text-white">{props.t('unlisted_product')}</Dialog.Title>
              <span className="inline-flex flex-col my-2 pb-2 items-center justify-center text-justify text-green-900 dark:text-white break-all">
                <br />
                <h4>{props.t('barcode_read')}</h4>
                <p>{scannedResult}</p>
              </span>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    )
  } else {
    if (isScanResultModalOpened) {
      return Swal.fire(props.t('no_barcode_found'), '', 'error')
    } else {
      return null
    }
  }
}

export default withTranslation()(ScannedBarcode)