import React from "react"

const ProductListImport = ({ t, onClickImportBtn }) => (
  <button className="toolbar-import hidden md:flex ml-2 items-center p-2 bg-blue-700 dark:bg-blue-800 hover:bg-blue-500 dark:hover:bg-blue-600 duration-200 rounded-lg shadow dark:shadow-white" onClick={() => onClickImportBtn()}>
    <img className="max-h-7 aspect-square mr-1" src="images/import-icon.svg" alt="Import Product" />
    <p className="text-white text-sm">{t('import_data')}</p>
  </button>
)

export default ProductListImport