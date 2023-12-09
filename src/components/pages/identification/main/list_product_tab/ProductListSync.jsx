import React from "react"

const ProductListSync = ({ onClickSyncBtn, isSyncBtnClicked }) => isSyncBtnClicked
  ? (
    <button className="toolbar-sync bg-orange-700 md:ml-1 p-1 rounded-lg" disabled>
      <img className="max-h-7 aspect-square animate-spin" src="images/sync-icon.svg" alt="Sync" />
    </button>
    )
  : (
    <button className="toolbar-sync bg-green-50 md:hover:bg-green-400 active:bg-green-400 md:ml-1 p-1 duration-200 rounded-lg shadow-md" onClick={() => onClickSyncBtn()}>
      <img className="max-h-7 aspect-square" src="images/cloud-sync-icon.svg" alt="Sync"/>
    </button>
    )

export default ProductListSync