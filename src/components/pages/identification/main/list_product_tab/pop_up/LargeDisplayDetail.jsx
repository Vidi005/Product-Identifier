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
    <span className="overflow-y-auto hidden md:block grow m-4">
      <table className="product-detail table-auto w-full">
        <tbody>
          {Object.entries(detailProductVars).map(([key, val], i) => {
            val = renderClickableText(val === '' ? '-' : val)
            return (
              <tr className="product-item border-b border-b-green-900 dark:border-b-white leading-loose text-justify text-lg text-green-900 dark:text-white" key={key}>
                {key === 'modified_by' && selectedProduct.added_by === 'Admin'
                  ? <td className="product-title font-bold">{t(`product_vars.${i + 1}`)}</td>
                  : <td className="product-title font-bold">{t(`product_vars.${i}`)}</td>}
                <td>:</td>
                {key === 'name_tag' && selectedProduct.color_tag !== ''
                  ? <td className="product-content pl-1 text-white" style={{ backgroundColor: selectedProduct.color_tag }}>{val}</td>
                  : <td className="product-content pl-1">{val}</td>}
              </tr>
            )
          })}
        </tbody>
      </table>
    </span>
  )
}

export default withTranslation()(LargeDisplayDetail)