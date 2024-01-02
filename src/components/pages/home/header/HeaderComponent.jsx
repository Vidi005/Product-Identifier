import React from "react"
import HeaderContainer from "../../identification/header/HeaderContainer"

const HeaderComponent = ({ props, changeLanguage, setDisplayMode, isDarkModeEnabled }) => <HeaderContainer
  props={props}
  changeLanguage={changeLanguage}
  setDisplayMode={setDisplayMode}
  isDarkModeEnabled={isDarkModeEnabled}
/>

export default HeaderComponent