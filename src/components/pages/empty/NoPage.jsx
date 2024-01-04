import React from "react"
import FooterContainer from "../identification/footer/FooterContainer"

const NoPage = ({ t }) => (
  <React.Fragment>
    <main className="no-page-main h-screen flex flex-col items-center justify-center text-center bg-green-200 p-8">
      <article className="animate__animated animate__fadeInUpBig font-serif text-green-900">
        <h1 className="text-7xl leading-snug"><strong>404</strong></h1>
        <h3>{t('not_found')}</h3>
        <br />
        <p>{t('page_not_found')}</p>
      </article>
    </main>
    <footer className="fixed bottom-0 w-full">
      <FooterContainer/>
    </footer>
  </React.Fragment>
)

export default NoPage