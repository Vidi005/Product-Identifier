import React from "react"

const ProductListDelete = ({ onClickDeleteAllBtn }) => (
  <button className="toolbar-delete-all mx-2 md:mx-3 p-1 bg-red-50 dark:bg-gray-300 hover:bg-red-400 dark:hover:bg-white duration-200 rounded-lg shadow dark:shadow-white" onClick={() => onClickDeleteAllBtn()}>
    <img className="max-h-7 aspect-square" src="images/delete-sweep-icon.svg" alt="Delete All" />
  </button>
)

export default ProductListDelete