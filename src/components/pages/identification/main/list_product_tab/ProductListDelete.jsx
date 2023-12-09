import React from "react"

const ProductListDelete = ({ deleteAllItems }) => (
  <button className="toolbar-delete-all mx-2 md:mx-3 p-1 bg-red-50 hover:bg-red-400 duration-200 rounded-lg shadow-md" onClick={() => deleteAllItems()}>
    <img className="max-h-7 aspect-square" src="images/delete-sweep-icon.svg" alt="Delete All" />
  </button>
)

export default ProductListDelete