import { Tab } from "@headlessui/react"
import React from "react"
import IdentifierBottomBar from "./IdentifierBottomBar"
import OCRMode from "./OCRMode"
import ScanBarcodeMode from "./ScanBarcodeMode"

const ProductIdentifierContainer = ({ props, selectedProduct }) => {
  const identifier = {
    imgSrc: [
    'images/ocr-mode-icon.svg',
    'images/barcode-scanner-icon.svg'
    ],
    imgAlt: ['OCR Identifier', 'Barcode Identifier']
  }
  return (
    <Tab.Group as={"article"} className={"tab-product-identifier__container flex flex-col justify-between h-full bg-black/95 font-sans text-white text-center animate__animated animate__fadeIn"}>
      <Tab.Panels className="grow">
        <Tab.Panel className="product-identifier__ocr relative h-full animated__animated animated__fadeIn">
          <OCRMode props={props} selectedProduct={selectedProduct} />
        </Tab.Panel>
        <Tab.Panel className="product-identifier__barcode h-full animate__animated animate__fadeIn">
          <ScanBarcodeMode props={props} selectedProduct={selectedProduct}/>
        </Tab.Panel>
      </Tab.Panels>
      <Tab.List className="identifier__bottom-navigation flex items-center justify-center w-full bg-black/95 p-2">
        {identifier.imgSrc.map((src, index) => (
          <Tab
            key={src}
            as={"img"}
            src={src}
            alt={identifier.imgAlt[index]}
            className={({ selected }) => {
              if (index % 2 != 0) {
                return selected
                  ? "max-h-7 py-1 px-6 border border-white cursor-pointer bg-white/50 duration-200 rounded-r-md"
                  : "max-h-7 py-1 px-6 border border-white cursor-pointer hover:bg-white/50 duration-200 rounded-r-md"
              } else {
                return selected
                  ? "max-h-7 py-1 px-6 border border-white cursor-pointer bg-white/50 duration-200 rounded-l-md"
                  : "max-h-7 py-1 px-6 border border-white cursor-pointer hover:bg-white/50 duration-200 rounded-l-md"
              }
            }}>
          </Tab>
        ))}
      </Tab.List>
      <IdentifierBottomBar/>
    </Tab.Group>
  )
}

export default ProductIdentifierContainer