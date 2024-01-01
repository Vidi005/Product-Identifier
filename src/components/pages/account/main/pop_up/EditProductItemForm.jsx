import { Dialog } from "@headlessui/react"
import React from "react"

class EditProductItemForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Dialog.Panel className={"flex flex-col bg-green-100 dark:bg-gray-700 m-auto w-full max-h-full max-w-5xl font-sans p-4 rounded-lg shadow-lg dark:shadow-white/50 overflow-hidden"}>
        <span className="inline-flex w-full items-center justify-end">
          <button className="px-2 aspect-square font-mono font-bold text-lg text-center text-green-900 dark:text-white bg-green-900/20 hover:bg-green-700/50 dark:bg-white/20 dark:hover:bg-black/50 duration-200 rounded-full shadow dark:shadow-white/50" onClick={() => this.props.onCloseEditModal()}>x</button>
        </span>
        <Dialog.Title as="h3" className="text-center text-green-900 dark:text-white">Add/Edit Product</Dialog.Title>
        <span className="product-editor grow overflow-y-auto"></span>
      </Dialog.Panel>
    )
  }
}

export default EditProductItemForm