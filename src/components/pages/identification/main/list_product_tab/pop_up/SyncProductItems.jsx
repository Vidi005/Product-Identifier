import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { withTranslation } from "react-i18next"

const SyncProductItems = ({ t, isAutoCheckUpdate, isSyncModalOpened, syncProductData, changeUpdateSetting, onCloseSyncModal }) => (
  <Transition appear show={isSyncModalOpened} as={Fragment}>
    <Dialog as="section" className="edit-product-modal relative z-10" onClose={() => onCloseSyncModal()}>
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
        className="fixed inset-4 flex items-center justify-center"
        enter="ease-out duration-500"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in duration-500"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
      >
        <Dialog.Panel className="bg-green-100 dark:bg-gray-700 m-auto w-full max-h-full max-w-lg font-sans p-4 md:p-8 rounded-lg shadow-lg dark:shadow-white/50 overflow-hidden">
          <span className="inline-flex w-full items-center justify-end">
            <button className="flex items-center justify-center px-2 aspect-square font-mono text-center text-green-900 dark:text-white bg-green-900/20 hover:bg-green-700/50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" onClick={() => onCloseSyncModal()}><h4>x</h4></button>
          </span>
          <Dialog.Title as="h3" className="text-center text-green-900 dark:text-white">Products Synchronization</Dialog.Title>
          <button className="min-w-full my-3 text-lg text-center text-white bg-green-700 hover:bg-green-900 duration-200 rounded-lg shadow dark:shadow-white/50 p-2" onClick={() => syncProductData('Replace All')}>Replace All</button>
          <button className="min-w-full my-3 text-lg text-center text-white bg-green-700 hover:bg-green-900 duration-200 rounded-lg shadow dark:shadow-white/50 p-2" onClick={() => syncProductData('Keep Old and Add New')}>Keep Old and Add New</button>
          <button className="min-w-full my-3 text-lg text-center text-white bg-green-700 hover:bg-green-900 duration-200 rounded-lg shadow dark:shadow-white/50 p-2" onClick={() => syncProductData('Update Old and Add New')}>Update Old and Add New</button>
          <span className="flex mx-auto my-2 items-center justify-center">
            <input className="accent-green-700 dark:accent-gray-200" type="checkbox" name="id-checking-update" onChange={() => changeUpdateSetting()} checked={isAutoCheckUpdate}/>
            <p className="ml-1 text-green-900 dark:text-white text-base text-justify">Checking Update Automatically</p>
          </span>
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  </Transition>
)

export default withTranslation()(SyncProductItems)