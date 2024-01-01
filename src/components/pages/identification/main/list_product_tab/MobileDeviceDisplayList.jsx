import React from "react"
import { withTranslation } from "react-i18next"

const MobileDeviceDisplayList = ({ t, index, productName, vendor, nameTag, colorTag, i, onClickDetailBtn }) => i % 2 === 0
  ? (
    <li className="content__product-item md:hidden flex items-center duration-200 animate__animated animate__fadeInUp leading-normal m-1 pr-3 border border-gray-700 bg-gray-300 dark:border-gray-200 dark:bg-gray-700 rounded-lg shadow dark:shadow-white overflow-hidden">
      <span className="item-content grow text-black dark:text-white">
        <h4 className="px-1 py-1 leading-tight">{productName}</h4>
        <p className="px-1 py-1 leading-tight">Vendor: {vendor}</p>
        <p className="px-1 py-1 leading-tight text-white rounded-tr-3xl" style={{ backgroundColor: `${colorTag}`}}>{t('name_tag')}: {nameTag}</p>
      </span>
      <button className="detail-btn border border-green-700 mx-3 p-1 bg-green-700 duration-200 active:bg-green-500 rounded-lg shadow dark:shadow-white" onClick={() => onClickDetailBtn(index)}>
        <img className="max-h-6 aspect-square" src="images/detail-icon.svg" alt="Detail Button" />
      </button>
    </li>
    )
  : (
    <li className="content__product-item md:hidden flex items-center duration-200 animate__animated animate__fadeInUp leading-normal m-1 pr-3 border border-gray-700 bg-white dark:border-gray-200 dark:bg-black rounded-lg shadow dar overflow-hidden">
      <span className="item-content grow text-black dark:text-white">
        <h4 className="px-1 py-1 leading-tight">{productName}</h4>
        <p className="px-1 py-1 leading-tight">Vendor: {vendor}</p>
        <p className="px-1 py-1 leading-tight text-white rounded-tr-3xl" style={{ backgroundColor: `${colorTag}`}}>{t('name_tag')}: {nameTag}</p>
      </span>
      <button className="detail-btn border border-green-700 mx-3 p-1 bg-green-700 duration-200 active:bg-green-500 rounded-lg shadow dark:shadow-white" onClick={() => onClickDetailBtn(index)}>
        <img className="max-h-6 aspect-square" src="images/detail-icon.svg" alt="Detail Button" />
      </button>
    </li>
    )

export default withTranslation()(MobileDeviceDisplayList)