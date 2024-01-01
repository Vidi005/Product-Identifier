import React from "react"

const ProductListAdd = ({ t, onClickEditBtn }) => (
  <button className="toolbar-add hidden md:flex ml-2 items-center p-2 bg-green-700 dark:bg-green-800 hover:bg-green-500 dark:hover:bg-green-600 duration-200 rounded-lg shadow dark:shadow-white" onClick={() => onClickEditBtn()}>
    <img className="max-h-7 aspect-square mr-1" src="images/add-icon.svg" alt="Add Product" />
    <p className="text-white text-sm">{t('add_data')}</p>
  </button>
)

export default ProductListAdd