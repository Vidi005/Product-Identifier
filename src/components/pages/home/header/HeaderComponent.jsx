import React from "react"
import HeaderContainer from "../../identification/header/HeaderContainer"

const HeaderComponent = ({ headerTitle, changeLanguage, setDisplayMode, isDarkModeEnabled }) => <HeaderContainer
  headerTitle={headerTitle}
  changeLanguage={changeLanguage}
  setDisplayMode={setDisplayMode}
  isDarkModeEnabled={isDarkModeEnabled}
/>

export default HeaderComponent