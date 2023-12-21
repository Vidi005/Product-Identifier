import React from "react"

const ProductListEntries = () => (
  <span className="toolbar-entries hidden md:grid grid-cols-2 gap-1 mr-2 items-center dark:text-white">
    <label htmlFor="options">Entries</label>
    <select className="border border-green-800 dark:border-gray-100 bg-green-50/25 dark:bg-gray-900/25 text-base p-2 rounded-lg shadow-inner dark:shadow-white/50" name="options" id="options">
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </span>
)

export default ProductListEntries