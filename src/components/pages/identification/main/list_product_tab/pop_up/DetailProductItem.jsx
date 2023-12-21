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
        <MobileDisplayDetail
          t={props.t}
          selectedProduct={selectedProduct}
          onCloseDetailModal={onCloseDetailModal}
        />
        <LargeDisplayDetail
          t={props.t}
          selectedProduct={selectedProduct}
          onCloseDetailModal={onCloseDetailModal}
        />
      </Transition.Child>
    </Dialog>
  </Transition>
)

export default DetailProductItem