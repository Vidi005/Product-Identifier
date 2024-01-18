import React from "react"
import { withTranslation } from "react-i18next"

const MobileDisplayDetail = ({ t, selectedProduct }) => {
  const unusedVars = ['index', 'colorTag']
  const modifiedProductVars = {
    index: selectedProduct.index,
    productName: selectedProduct.product_name,
    nameTag: selectedProduct.name_tag,
    productIds: selectedProduct.product_ids,
    category: selectedProduct.category,
    vendor: selectedProduct.vendor,
    origin: selectedProduct.origin,
    dateCreated: selectedProduct.date_created,
    colorTag: selectedProduct.color_tag,
    description: selectedProduct.description,
    alternatives: selectedProduct.alternatives,
    sources: selectedProduct.sources,
    addedBy: selectedProduct.added_by,
    modifiedBy: selectedProduct.modified_by
  }
  let titleOffsetArray = 0
  const detailProductVars = Object.entries(modifiedProductVars).reduce((acc, [key, value]) => {
    if (!unusedVars.includes(key)) {
      if ((key === 'addedBy' && value === 'Admin') || (key === 'modifiedBy' && (value === 'Admin' || value === ''))) {
        titleOffsetArray++
        return acc
      } else acc[key] = value
    }
    return acc
  }, {})
  const renderClickableText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.toString().split(urlRegex).map((part, i) => {
      if (i % 2 === 1) {
        return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 dark:hover:text-blue-500 active:text-violet-700 active:dark:text-violet-500"><u>{part}</u></a>
      } else {
        return <React.Fragment key={i}>{part}</React.Fragment>
      }
    })
  }
  return (
    <span className="product-detail md:hidden grow overflow-y-auto">
      {Object.entries(detailProductVars).map(([key, val], i) => {
        val = renderClickableText(val === '' ? '-' : val)
        return (
          <React.Fragment key={key}>
            {key === 'modifiedBy' && modifiedProductVars.addedBy === 'Admin'
              ? <h4 className="product-title border-b border-b-green-900 dark:border-b-white mt-3 text-justify text-green-900 dark:text-white">{t(`product_vars_mod.${i + titleOffsetArray}`)}</h4>
              : <h4 className="product-title border-b border-b-green-900 dark:border-b-white mt-3 text-justify text-green-900 dark:text-white">{t(`product_vars_mod.${i}`)}</h4>}
            {key === 'nameTag' && modifiedProductVars.colorTag !== ''
              ? <p className="product-content px-0.5 text-justify text-white" style={{ backgroundColor: modifiedProductVars.colorTag }}>{val}</p>
              : <p className="product-content text-justify text-green-900 dark:text-white">{val}</p>}
          </React.Fragment>
        )
      })}
    </span>
  )
}

export default withTranslation()(MobileDisplayDetail)