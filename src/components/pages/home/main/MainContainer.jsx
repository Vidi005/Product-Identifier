import React from "react"
import { withTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const MainContainer = ({ t }) => (
  <main className="home-page__main h-full max-w-5xl grid grid-flow-row items-center justify-evenly p-4 font-sans dark:text-white">
    <img className="home-page__main__logo h-24 md:h-48 object-center m-auto dark:brightness-200" src="images/identification-icon.svg" alt="Logo" />
    <h3 className="home-page__main__title text-center text-green-900 dark:text-white">Lorem ipsum dolor sit amet</h3>
    <p className="home-page__main__text text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem magnam consequatur ducimus voluptatibus modi unde at. Labore at dolorum, ipsum quam dicta quasi quisquam iure modi nam maiores vero aliquid.</p>
    <Link to="/identify" className="btn-link__identify flex items-center justify-center w-fit m-auto border border-green-900 dark:border-gray-50 bg-green-700 dark:bg-green-500 hover:bg-green-900 dark:hover:bg-green-400 hover:-translate-y-1 text-white p-2 duration-300 rounded-lg shadow-lg dark:shadow-white/50" onClick={() => scrollTo(0, 0)}>
      <img className="max-h-7 object-contain object-center mr-2 rotate-90 invert" src="images/arrow-active-icon.svg" alt="Enter" />
      <h4>{t('identify_products')}</h4>
    </Link>
    <br />
    <section className="home-page-bottom__main flex flex-col items-center border-t border-green-900 dark:border-white text-base">
      <br />
      <p className="text-center">{t('homepage_bottom_text')}</p>
      <a href="mailto:productidentifier.dev@gmail.com" className="flex items-center justify-center mt-2">
        <img className="max-h-7 mr-1 dark:invert" src="images/mail-icon.svg" alt="E-Mail" />
        <p><u>productidentifier.dev@gmail.com</u></p>
      </a>
    </section>
  </main>
)

export default withTranslation()(MainContainer)