import React from "react"
import { withTranslation } from "react-i18next"

const LargeDisplayDetail = ({ t, selectedProduct }) => {
  const unusedVars = ['index', 'color_tag']
  const detailProductVars = Object.entries(selectedProduct).reduce((acc, [key, value]) => {
    if (!unusedVars.includes(key)) {
      if ((key === 'added_by' && value === 'Admin') || (key === 'modified_by' && (value === 'Admin' || value === ''))) {
        return acc
      } else acc[key] = value
    }
    return acc
  }, {})
  return (
    <table className="product-detail hidden md:table table-auto m-4 grow overflow-y-auto">
      <tbody>
        {Object.entries(detailProductVars).map(([key, val], i) => (
          <tr className="product-item border-b border-b-green-900 dark:border-b-white leading-loose text-justify text-lg text-green-900 dark:text-white" key={key}>
            {
              key === 'modified_by' && selectedProduct.added_by === 'Admin'
                ? <td className="product-title font-bold">{t(`product_vars.${i + 1}`)}</td>
                : <td className="product-title font-bold">{t(`product_vars.${i}`)}</td>
            }
            {
              key === 'name_tag' && selectedProduct.color_tag !== ''
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