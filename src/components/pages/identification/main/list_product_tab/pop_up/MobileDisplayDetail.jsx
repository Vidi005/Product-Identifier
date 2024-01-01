import React from "react"
import { withTranslation } from "react-i18next"

const MobileDisplayDetail = ({ t, selectedProduct }) => {
  const unusedVars = ['index', 'color_tag']
  let titleOffsetArray = 0
  const detailProductVars = Object.entries(selectedProduct).reduce((acc, [key, value]) => {
    if (!unusedVars.includes(key)) {
      if ((key === 'added_by' && value === 'Admin') || (key === 'modified_by' && (value === 'Admin' || value === ''))) {
        titleOffsetArray++
        return acc
      } else acc[key] = value
    }
    return acc
  }, {})
  const renderClickableText = (text) => {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
    return text.split(urlRegex).map((part, i) => {
      if (i % 2 === 1) {
        return <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a>
      } else {
        return <React.Fragment key={i}>{part}</React.Fragment>
      }
    })
  }
  return (
    <span className="product-detail md:hidden grow overflow-y-auto">
      {Object.entries(detailProductVars).map(([key, val], i) => (
        <React.Fragment key={key}>
          {
            key === 'modified_by' && selectedProduct.added_by === 'Admin'
              ? <h4 className="product-title border-b border-b-green-900 dark:border-b-white mt-3 text-justify text-green-900 dark:text-white">{t(`product_vars.${i + titleOffsetArray}`)}</h4>
              : <h4 className="product-title border-b border-b-green-900 dark:border-b-white mt-3 text-justify text-green-900 dark:text-white">{t(`product_vars.${i}`)}</h4>
          }
          {
            key === 'name_tag' && selectedProduct.color_tag !== ''
              ? <p className="product-content px-0.5 text-justify text-white" style={{ backgroundColor: selectedProduct.color_tag }}>{val === '' ? '-' : val}</p>
              : <p className="product-content text-justify text-green-900 dark:text-white">{val === '' ? '-' : val}</p>
          }
          {/* {
            key === 'description' && selectedProduct.description !== ''
              ? <p className="product-content px-0.5 text-justify text-white" style={{ backgroundColor: selectedProduct.color_tag }}>{renderClickableText(val)}</p>
              : <p className="product-content text-justify text-green-900 dark:text-white">{val === '' ? '-' : val}</p>
          }
          {
            key === 'sources' && selectedProduct.sources !== ''
              ? <p className="product-content px-0.5 text-justify text-white" style={{ backgroundColor: selectedProduct.color_tag }}>{renderClickableText(val)}</p>
              : <p className="product-content text-justify text-green-900 dark:text-white">{val === '' ? '-' : val}</p>
          } */}
        </React.Fragment>
      ))}
    </span>
  )
}

export default withTranslation()(MobileDisplayDetail)