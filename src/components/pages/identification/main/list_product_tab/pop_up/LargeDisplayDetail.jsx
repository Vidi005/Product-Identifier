import React from "react"
import { withTranslation } from "react-i18next"

const LargeDisplayDetail = ({ t, selectedProduct }) => {
  const unusedVars = ['index', 'color_tag']
  const detailProductVars = Object.keys(selectedProduct).reduce((acc, key) => {
    if (!unusedVars.includes(key)) {
      acc[key] = selectedProduct[key]
    }
    return acc
  }, {})
  return (
    <table className="product-detail hidden md:table table-auto m-4 grow overflow-y-auto">
      <tbody>
        {Object.entries(detailProductVars).map(([key, val], i) => (
          <tr className="product-item border-b border-b-green-900 dark:border-b-white leading-loose text-justify text-lg text-green-900 dark:text-white" key={key}>
            <td className="product-title font-bold">{t(`product_vars.${i}`)}</td>
            <td>:</td>
            {
              key === 'name_tag'
                ? <td className="product-content pl-1 text-white" style={{ backgroundColor: selectedProduct.color_tag }}>{val === '' ? '-' : val}</td>
                : <td className="product-content pl-1">{val === '' ? '-' : val}</td>
            }
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default withTranslation()(LargeDisplayDetail)