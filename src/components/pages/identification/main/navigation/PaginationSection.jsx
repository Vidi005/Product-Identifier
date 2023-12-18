import React from "react"
import { withTranslation } from "react-i18next"
import { getNavIcons } from "../../../../../utils/data"
import PageItemContent from "./PageItemContent"

const PaginationSection = ({ t, onSelectNavHandler, numProducts, itemsPerPage, pagePosition, lastPage }) => numProducts >= itemsPerPage
  ? (
    <section className="footer__pagination-section bg-green-200 dark:bg-gray-800 p-4 font-sans text-center text-green-900 dark:text-white">
      <div className="pagination__nav-list flex items-center justify-center m-1">
        {getNavIcons().map((pageItem, i) => (
          <PageItemContent
            key={i}
            i={i}
            positionIcon={pageItem}
            pagePos={pagePosition}
            lastPage={lastPage}
            onSelectNavHandler={onSelectNavHandler}
          />
        ))}
      </div>
      <h5>Total: {numProducts} {t('product')}</h5>
    </section>
    )
  : null

export default withTranslation()(PaginationSection)