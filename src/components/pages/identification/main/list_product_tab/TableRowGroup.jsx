import React from "react"

const TableRowGroup = ({ t, sortBy, sortItemsHandler }) => (
  <tr className="hidden md:table-row md:sticky top-0 ring-2 ring-black dark:ring-white text-center text-lg text-black leading-loose dark:text-white bg-gray-200 dark:bg-gray-800 z-10">
    <th className="border-x border-black dark:border-white p-1">No</th>
    <th className="border-x border-black dark:border-white cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 duration-200 p-1 shadow-inner dark:shadow-white/50" onClick={() => {
      if (sortBy !== t('sort_products.0')) sortItemsHandler(t('sort_products.0'))
      else sortItemsHandler(t('sort_products.1'))
    }}>
      <span className="flex items-center flex-nowrap">
        <p className="grow">{t('product_name')}</p>
        {sortBy !== t('sort_products.1')
        ? <React.Fragment>
            <img className="max-h-5 object-contain dark:invert" src="images/arrow-inactive-icon.svg" alt="Arrow Up" />  
            <img className="max-h-5 object-contain dark:invert scale-y-[-1]" src="images/arrow-active-icon.svg" alt="Arrow Down" />
          </React.Fragment>
        : <React.Fragment>
            <img className="max-h-5 object-contain dark:invert" src="images/arrow-active-icon.svg" alt="Arrow Up" />
            <img className="max-h-5 object-contain dark:invert scale-y-[-1]" src="images/arrow-inactive-icon.svg" alt="Arrow Down" />
          </React.Fragment>}
      </span>
    </th>
    <th className="border-x border-black dark:border-white cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 duration-200 p-1 shadow-inner dark:shadow-white/50" onClick={() => {
      if (sortBy !== t('sort_products.6')) sortItemsHandler(t('sort_products.6'))
      else sortItemsHandler(t('sort_products.7'))
    }}>
      <span className="flex items-center flex-nowrap">
        <p className="grow">{t('vendor')}</p>
        {sortBy !== t('sort_products.7')
        ? <React.Fragment>
            <img className="max-h-5 object-contain dark:invert" src="images/arrow-inactive-icon.svg" alt="Arrow Up" />
            <img className="max-h-5 object-contain dark:invert scale-y-[-1]" src="images/arrow-active-icon.svg" alt="Arrow Down" />
          </React.Fragment>
        : <React.Fragment>
            <img className="max-h-5 object-contain dark:invert" src="images/arrow-active-icon.svg" alt="Arrow Up" />
            <img className="max-h-5 object-contain dark:invert scale-y-[-1]" src="images/arrow-inactive-icon.svg" alt="Arrow Down" />
          </React.Fragment>}
      </span>
    </th>
    <th className="border-x border-black dark:border-white cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 duration-200 p-1 shadow-inner dark:shadow-white/50" onClick={() => {
      if (sortBy !== t('sort_products.4')) sortItemsHandler(t('sort_products.4'))
      else sortItemsHandler(t('sort_products.5'))
    }}>
      <span className="flex items-center flex-nowrap">
        <p className="grow">{t('name_tag')}</p>
        {sortBy !== t('sort_products.5')
        ? <React.Fragment>
            <img className="max-h-5 object-contain dark:invert" src="images/arrow-inactive-icon.svg" alt="Arrow Up" />
            <img className="max-h-5 object-contain dark:invert scale-y-[-1]" src="images/arrow-active-icon.svg" alt="Arrow Down" />
          </React.Fragment>
        : <React.Fragment>
            <img className="max-h-5 object-contain dark:invert" src="images/arrow-active-icon.svg" alt="Arrow Up" />
            <img className="max-h-5 object-contain dark:invert scale-y-[-1]" src="images/arrow-inactive-icon.svg" alt="Arrow Down" />
          </React.Fragment>}
      </span>
    </th>
    <th className="border-x border-black dark:border-white cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 duration-200 p-1 shadow-inner dark:shadow-white/50" onClick={() => {
      if (sortBy !== t('sort_products.2')) sortItemsHandler(t('sort_products.2'))
      else sortItemsHandler(t('sort_products.3'))
    }}>
      <span className="flex items-center flex-nowrap">
        <p className="grow">{t('date_created')}</p>
        {sortBy !== t('sort_products.3')
        ? <React.Fragment>
            <img className="max-h-5 object-contain dark:invert" src="images/arrow-inactive-icon.svg" alt="Arrow Up" />
            <img className="max-h-5 object-contain dark:invert scale-y-[-1]" src="images/arrow-active-icon.svg" alt="Arrow Down" />
          </React.Fragment>
        : <React.Fragment>
            <img className="max-h-5 object-contain dark:invert" src="images/arrow-active-icon.svg" alt="Arrow Up" />
            <img className="max-h-5 object-contain dark:invert scale-y-[-1]" src="images/arrow-inactive-icon.svg" alt="Arrow Down" />
          </React.Fragment>}
      </span>
    </th>
    <th className="border-x border-black dark:border-white p-1">
      {t('action_table_data')}
    </th>
  </tr>
)

export default TableRowGroup