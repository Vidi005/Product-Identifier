import React from "react"
import { Helmet } from "react-helmet"
import { Route, Routes } from "react-router-dom"
import NoPage from "./pages/empty/NoPage"
import LandingPage from "./pages/home/LandingPage"
import IdentificationPage from "./pages/identification/IdentificationPage"
import i18n from "../utils/localization"

const App = () => (
  <React.Fragment>
    <Helmet>
      <title>Product Identifier</title>
      {/* <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; base-uri 'self'; worker-src 'self' 'unsafe-inline' blob:;"/> */}
    </Helmet>
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/identify" element={<IdentificationPage />}/>
      <Route path="*" element={<NoPage />}/>
    </Routes>
  </React.Fragment>
)

export default App