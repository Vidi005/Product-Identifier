import React from "react"
import { withTranslation } from "react-i18next"

const MobileDisplayDetail = ({ t, selectedProduct }) => {
  const unusedVars = ['index', 'color_tag']
  const detailProductVars = Object.keys(selectedProduct).reduce((acc, key) => {
    if (!unusedVars.includes(key)) {
      acc[key] = selectedProduct[key]
    }
    return acc
  }, {})
  return (
    <span className="product-detail md:hidden grow overflow-y-auto">
      {Object.entries(detailProductVars).map(([key, val], i) => (
        <React.Fragment key={key}>
          <h4 className="product-title border-b border-b-green-900 dark:border-b-white mt-3 text-justify text-green-900 dark:text-white">{t(`product_vars.${i}`)}</h4>
          {
            key === 'name_tag'
              ? <p className="product-content px-0.5 text-justify text-white" style={{ backgroundColor: selectedProduct.color_tag }}>{val === '' ? '-' : val}</p>
              : <p className="product-content text-justify text-green-900 dark:text-white">{val === '' ? '-' : val}</p>
          }
        </React.Fragment>
      ))}
    </span>
  )
}

export default withTranslation()(MobileDisplayDetail)