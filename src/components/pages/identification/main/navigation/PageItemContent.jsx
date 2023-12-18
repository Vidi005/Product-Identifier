import React from "react"

const PageItemContent = ({ i, positionIcon, pagePos, lastPage, onSelectNavHandler }) => {
  if (i === 2) {
    return <h3 className="bg-green-50 dark:bg-gray-900 border-2 border-green-700 dark:border-gray-200 py-1 px-3 rounded-lg">{pagePos}/{lastPage}</h3>
  } else if (i === 3) {
    return (
      <button className="bg-green-100 dark:bg-gray-400 border border-green-700 dark:border-gray-200 active:bg-green-700 dark:active:bg-white p-1 duration-200" onClick={() => onSelectNavHandler(i)}>
        <img className="max-h-6 aspect-square scale-x-[-1]" src={positionIcon} alt="Page Navigation" />
      </button>
    )
  } else if (i === 4) {
    return (
      <button className="bg-green-100 dark:bg-gray-400 border border-green-700 dark:border-gray-200 active:bg-green-700 dark:active:bg-white p-1 duration-200 rounded-r-lg" onClick={() => onSelectNavHandler(i)}>
        <img className="max-h-6 aspect-square scale-x-[-1]" src={positionIcon} alt="Page Navigation" />
      </button>
    )
  } else {
    return (
      <button className="bg-green-100 dark:bg-gray-400 border border-green-700 dark:border-gray-200 active:bg-green-700 dark:active:bg-white p-1 duration-200 rounded-l-lg" onClick={() => onSelectNavHandler(i)}>
        <img className="max-h-6 aspect-square" src={positionIcon} alt="Page Navigation" />
      </button>
    )
  }
}

export default PageItemContent