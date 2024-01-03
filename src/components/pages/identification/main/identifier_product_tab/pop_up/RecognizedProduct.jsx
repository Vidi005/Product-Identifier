import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { withTranslation } from "react-i18next"
import Swal from "sweetalert2"
import LargeDisplayDetail from "../../list_product_tab/pop_up/LargeDisplayDetail"
import MobileDisplayDetail from "../../list_product_tab/pop_up/MobileDisplayDetail"

const RecognizedProduct = ({ props, isRecognitionModalOpened, recognizedProduct, recognizedVendor, recognizedText, onCloseRecognitionModal }) => {
  if (Object.keys(recognizedProduct).length > 0) {
    return (
      <Transition appear show={isRecognitionModalOpened} as={Fragment}>
        <Dialog as={"section"} className="recognized-product-modal relative z-10" onClose={() => onCloseRecognitionModal()}>
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
                <button className="px-2 font-mono align-middle text-center text-green-900 dark:text-white bg-green-900/20 hover:bg-green-700/50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" onClick={() => onCloseRecognitionModal()}>
                  <h4>X</h4>
                </button>
              </span>
              <Dialog.Title as="h3" className="text-center text-green-900 dark:text-white">{props.t('identified_product')}</Dialog.Title>
              <MobileDisplayDetail t={props.t} selectedProduct={recognizedProduct} />
              <LargeDisplayDetail t={props.t} selectedProduct={recognizedProduct} />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    )
  } else if (recognizedVendor?.vendor?.length > 0) {
    return (
      <Transition appear show={isRecognitionModalOpened} as={Fragment}>
        <Dialog as={"section"} className="recognized-vendor-modal relative z-10" onClose={() => onCloseRecognitionModal()}>
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
            <Dialog.Panel className={"flex flex-col bg-green-100 dark:bg-gray-700 w-full h-full max-w-5xl font-sans p-4 rounded-t-lg shadow-lg dark:shadow-white/50 overflow-y-auto overflow-x-hidden"}>
              <span className="inline-flex w-full items-center justify-end">
                <button className="px-2 font-mono align-middle text-center text-green-900 dark:text-white bg-green-900/20 hover:bg-green-700/50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" onClick={() => onCloseRecognitionModal()}>
                  <h4>X</h4>
                </button>
              </span>
              <Dialog.Title as="h3" className="text-center text-green-900 dark:text-white"
              >{props.t('recognized_vendor')}
              </Dialog.Title>
              <span className="inline-flex flex-col my-2 items-center justify-center text-justify text-green-900 dark:text-white">
                <br />
                <h4 className="vendor-title w-full border-b border-b-green-900 dark:border-b-white text-justify">{props.t(`product_vars.3`)}</h4>
                <p className="w-full px-1 py-0.5" >{recognizedVendor.vendor}</p>
                <h4 className="tag-title w-full border-b border-b-green-900 dark:border-b-white mt-3 text-justify">{props.t(`product_vars.6`)}</h4>
                <p className="w-full px-1 py-0.5" style={{ backgroundColor: `${recognizedVendor.color_tag}` }}>{recognizedVendor.name_tag}</p>
              </span>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    )
  } else if (recognizedText.length > 0) {
    return (
      <Transition appear show={isRecognitionModalOpened} as={Fragment}>
        <Dialog as={"section"} className="unlisted-product-modal relative z-10" onClose={() => onCloseRecognitionModal()}>
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
            className={"fixed bottom-0 left-0 right-0 h-3/4 md:h-1/3 flex items-center justify-center"}
            enter="ease-out duration-500"
            enterFrom="opacity-0 translate-y-full"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-500"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-full"
          >
            <Dialog.Panel className={"flex flex-col bg-green-100 dark:bg-gray-700 w-full h-full max-w-5xl font-sans p-4 rounded-t-lg shadow-lg dark:shadow-white/50 overflow-y-auto overflow-x-hidden"}>
              <span className="inline-flex w-full items-center justify-end">
                <button className="px-2 font-mono align-middle text-center text-green-900 dark:text-white bg-green-900/20 hover:bg-green-700/50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" onClick={() => onCloseRecognitionModal()}>
                  <h4>X</h4>
                </button>
              </span>
              <Dialog.Title as="h3" className="text-center text-green-900 dark:text-white"
              >{props.t('unlisted_product')}
              </Dialog.Title>
              <span className="inline-flex flex-col my-2 items-center justify-center text-justify text-green-900 dark:text-white break-all">
                <br />
                <h4>{recognizedText}</h4>
              </span>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    )
  } else {
    if (isRecognitionModalOpened) {
      return Swal.fire(props.t('no_text_recognized'), '', 'warning')
    } else {
      return null
    }
  }
}

export default withTranslation()(RecognizedProduct)