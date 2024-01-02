import React from "react"
import { Helmet } from "react-helmet"
import { withTranslation } from "react-i18next"
import { isStorageExist } from "../../../utils/data"
import FooterComponent from "./footer/FooterComponent"
import HeaderComponent from "./header/HeaderComponent"
import MainContainer from "./main/MainContainer"

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      LANGUAGE_STORAGE_KEY: 'LANGUAGE_STORAGE_KEY',
      DARK_MODE_STORAGE_KEY: 'DARK_MODE_STORAGE_KEY',
      selectedLanguage: 'en',
      isTopBtnShown: false,
      isDarkModeEnabled: false
    }
  }
  
  componentDidMount() {
    this.checkLocalStorage()
    window.onscroll = () => {
      if (window.scrollY > 400) {
        this.setState({ isTopBtnShown: true })
      } else {
        this.setState({ isTopBtnShown: false })
      }
    }
  }

  componentDidUpdate() {
    document.body.classList.toggle('dark', this.state.isDarkModeEnabled)
  }

  checkLocalStorage() {
    isStorageExist(this.props.t('storage_availability'))
    if (isStorageExist('')) {
      this.checkDisplayMode()
      this.checkLanguageData()
    }
  }

  checkDisplayMode () {
    const getDisplayModeFromLocal = localStorage.getItem(this.state.DARK_MODE_STORAGE_KEY)
    try {
      const parsedDisplayMode = JSON.parse(getDisplayModeFromLocal)
      if (parsedDisplayMode !== undefined) {
        this.setState({ isDarkModeEnabled: parsedDisplayMode })
      }
    } catch (error) {
      localStorage.removeItem(this.state.DARK_MODE_STORAGE_KEY)
      alert(`Error: ${error.message}\n${this.props.t('reload')}`)
    }
  }

  checkLanguageData () {
    const getLangDataFromLocal = localStorage.getItem(this.state.LANGUAGE_STORAGE_KEY)
    try {
      const parsedLangData = JSON.parse(getLangDataFromLocal)
      if (parsedLangData !== undefined) {
        this.setState({ selectedLanguage: parsedLangData },
          () => this.changeLanguage(parsedLangData))
      } else this.changeLanguage(this.state.selectedLanguage)
    } catch (error) {
      localStorage.removeItem(this.state.LANGUAGE_STORAGE_KEY)
      alert(`Error: ${error.message}\n${this.props.t('reload')}`)
    }
  }

  setDisplayMode () {
    this.setState(prevState => ({
      isDarkModeEnabled: !prevState.isDarkModeEnabled
    }), () => this.saveDisplayMode(this.state.isDarkModeEnabled))
  }

  changeLanguage (lang) {
    const { i18n } = this.props
    this.setState({ selectedLanguage: lang }, () => {
      i18n.changeLanguage(lang)
      this.saveLangData(lang)
    })
  }

  saveDisplayMode (selectedDisplayMode) {
    if (isStorageExist(this.props.t('storage_availability'))) {
      localStorage.setItem(this.state.DARK_MODE_STORAGE_KEY, JSON.stringify(selectedDisplayMode))
    }
  }

  saveLangData (selectedLanguage) {
    if (isStorageExist(this.props.t('storage_availability'))) {
      localStorage.setItem(this.state.LANGUAGE_STORAGE_KEY, JSON.stringify(selectedLanguage))
    }
  }

  render() {
    return (
      <div className="home-page h-screen w-full flex flex-col items-center justify-between bg-green-50 dark:bg-black overflow-y-auto animate__animated animate__fadeIn">
       <Helmet>
         <title>{this.props.t('app_name')}</title>
         <meta name="description" content="Product Identifier" />
         <meta name="keywords" content="Product Identifier" />
         <link rel="canonical" href="https://product-identifier.pages.dev" />
       </Helmet>
       <HeaderComponent
         props={this.props}
         changeLanguage={this.changeLanguage.bind(this)}
         setDisplayMode={this.setDisplayMode.bind(this)}
         isDarkModeEnabled={this.state.isDarkModeEnabled}
       />
       <MainContainer/>
       <FooterComponent/>
      </div>
    )
  }
}

export default withTranslation()(LandingPage)