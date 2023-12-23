import React from "react"
import { selectOptionValues } from "../../../../../utils/data"

const ProductListEntries = ({ t, changeItemsPerPage }) => (
  <span className="toolbar-entries hidden md:grid grid-cols-2 gap-1 mr-2 items-center dark:text-white">
    <label htmlFor="options">{t('product_list_entries')}</label>
    <select className="border border-green-800 dark:border-gray-100 bg-green-50/25 dark:bg-gray-900/25 text-base p-2 rounded-lg shadow-inner dark:shadow-white/50" name="options" id="options" onChange={changeItemsPerPage}>
      {selectOptionValues().map((value) => <option key={value} value={value}>{value}</option>)}
    </select>
  </span>
)

export default ProductListEntries