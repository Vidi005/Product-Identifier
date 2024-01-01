import React from "react"
import { withTranslation } from "react-i18next"

const LargeDeviceDisplayList = ({ index, productName, vendor, dateCreated, nameTag, colorTag, pagePosition, itemsPerPage, i, onClickDetailBtn }) => i % 2 === 0
  ? (
    <tr className="content__product-item hidden md:table-row divide-x divide-black dark:divide-white duration-200 lg:text-lg md:text-base text-justify align-middle text-gray-800 dark:text-gray-100 animate__animated animate__fadeInUp bg-gray-300 dark:bg-gray-700">
      <td className="text-center px-1 py-4">{i + 1 + itemsPerPage * (pagePosition - 1)}</td>
      <td className="p-1">{productName}</td>
      <td className="p-1">{vendor}</td>
      <td className="border border-x-black dark:border-x-white p-1 text-white" style={{ backgroundColor: `${colorTag}`}}>{nameTag}</td>
      <td className="p-1 text-center">{dateCreated}</td>
      <td className="p-1">
        <span className="grid grid-flow-col items-center justify-center">
          <button className="detail-btn border border-green-700 mx-3 p-1 bg-green-700 duration-200 hover:bg-green-500 rounded-lg shadow dark:shadow-white" onClick={() => onClickDetailBtn(index)}>
            <img className="max-h-6 aspect-square" src="images/detail-icon.svg" alt="Detail Button" />
          </button>
        </span>
      </td>
    </tr>
    )
  : (
    <tr className="content__product-item hidden md:table-row divide-x divide-black dark:divide-white lg:text-lg md:text-base text-justify align-middle duration-20 text-gray-800 dark:text-gray-100 animate__animated animate__fadeInUp bg-white dark:bg-black">
      <td className="text-center px-1 py-4">{i + 1 + itemsPerPage * (pagePosition - 1)}</td>
      <td className="p-1">{productName}</td>
      <td className="p-1">{vendor}</td>
      <td className="border border-x-black dark:border-x-white p-1 text-white" style={{ backgroundColor: `${colorTag}`}}>{nameTag}</td>
      <td className="p-1 text-center">{dateCreated}</td>
      <td className="p-1">
        <span className="grid grid-flow-row items-center justify-center">
          <button className="detail-btn border border-green-700 mx-3 p-1 bg-green-700 duration-200 hover:bg-green-500 rounded-lg shadow dark:shadow-white" onClick={() => onClickDetailBtn(index)}>
            <img className="max-h-6 aspect-square" src="images/detail-icon.svg" alt="Detail Button" />
          </button>
        </span>
      </td>
    </tr>
    )

export default withTranslation()(LargeDeviceDisplayList)