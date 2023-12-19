import React from "react"

const ProductListMenu = () => (
  <nav className="content__product-list-menu fixed md:hidden right-2 bottom-2">
    <menu className="menu-item grid grid-cols-2 gap-2 items-center">
      <span className="import-item col-start-2 mt-auto ml-auto w-fit p-2 bg-green-700 active:bg-green-900 rounded-full shadow-md dark:shadow-white/50 cursor-pointer animate__animated animate__slideInRight">
        <img className="object-center object-contain h-6 w-6 aspect-square" src="images/import-icon.svg" alt="Import Data" />
      </span>
      <span className="export-item ml-auto mt-auto w-fit p-2 bg-green-700 active:bg-green-900 rounded-full shadow-md dark:shadow-white/50 cursor-pointer animate__animated animate__slideInUp">
        <img className="object-center object-contain h-6 w-6 aspect-square" src="images/export-icon.svg" alt="Export Data" />
      </span>
      <span className="add-item w-fit p-2 bg-green-700 active:bg-green-900 rounded-full shadow-md dark:shadow-white/50 cursor-pointer animate__animated animate__fadeInBottomRight">
        <img className="object-center object-contain h-8 w-8 aspect-square" src="images/add-icon.svg" alt="Add Data" />
      </span>
    </menu>
  </nav>
)

export default ProductListMenu