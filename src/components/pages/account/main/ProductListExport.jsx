import React from "react"

const ProductListExport = ({ t, onClickExportBtn }) => (
  <button className="toolbar-export hidden md:flex ml-2 items-center p-2 bg-orange-700 dark:bg-orange-800 hover:bg-orange-500 dark:hover:bg-orange-600 duration-200 rounded-lg shadow dark:shadow-white" onClick={() => onClickExportBtn()}>
    <img className="max-h-7 aspect-square mr-1" src="images/export-icon.svg" alt="Export Product" />
    <p className="text-white text-sm">{t('export_data')}</p>
  </button>
)

export default ProductListExport