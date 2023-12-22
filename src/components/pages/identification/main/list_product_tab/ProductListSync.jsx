import React from "react"

const ProductListSync = ({ onClickSyncBtn, isSyncBtnClicked }) => isSyncBtnClicked
  ? (
    <button className="toolbar-sync md:flex items-center bg-orange-700 md:ml-1 p-1 md:p-2 rounded-lg" disabled>
      <img className="md:hidden max-h-7 aspect-square animate-spin" src="images/sync-icon.svg" alt="Sync" />
      <img className="hidden md:block max-h-7 aspect-square animate-spin" src="images/sync-icon.svg" alt="Sync" />
      <p className="hidden md:block text-white text-sm">Synchronizing</p>
    </button>
    )
  : (
    <button className="toolbar-sync md:flex items-center bg-green-50 md:bg-green-700 dark:bg-gray-300 dark:md:bg-green-800 md:hover:bg-green-500 dark:md:hover:bg-green-600 active:bg-green-400 md:active:bg-green-500 dark:active:bg-white md:dark:active:bg-green-600 md:ml-1 p-1 md:p-2 duration-200 rounded-lg shadow dark:shadow-white" onClick={() => onClickSyncBtn()}>
      <img className="md:hidden max-h-7 aspect-square md:mr-1" src="images/cloud-sync-icon.svg" alt="Sync"/>
      <img className="hidden md:block max-h-7 aspect-square md:mr-1" src="images/dark-cloud-sync-icon.svg" alt="Sync"/>
      <p className="hidden md:block text-white text-sm">Synchronize</p>
    </button>
    )

export default ProductListSync