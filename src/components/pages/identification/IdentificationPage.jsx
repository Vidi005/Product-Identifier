import React from "react"
import { Helmet } from "react-helmet"
import HeaderContainer from "./header/HeaderContainer"
import { withTranslation } from "react-i18next"
import { isStorageExist } from "../../../utils/data"
import MainContainer from "./main/MainContainer"

class IdentificationPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      LANGUAGE_STORAGE_KEY: 'LANGUAGE_STORAGE_KEY',
      DISPLAY_MODE_STORAGE_KEY: 'DISPLAY_MODE_STORAGE_KEY',
      getProductList: [],
      getProductsPerPage: [],
      getSortedProducts: [],
      getSelectedProducts: '',
      searchQuery: '',
      page: 1,
      itemsPerPage: 20,
      selectedLanguage: "en",
      isDarkModeEnabled: false,
      isProductListLoading: false,
      isProductItemModalOpened: false
    }
  }

  componentDidMount() {
    this.checkLocalStorage()
  }

  checkLocalStorage () {
    isStorageExist(this.props.t('storage_availability'))
    if (isStorageExist('')) {
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
    } else {
      return
    }
  }

  setDisplayMode () {
    this.setState({
      isDarkModeEnabled: !this.state.isDarkModeEnabled
    })
  }

  changeLanguage = lang => {
    const { i18n } = this.props
    this.setState({ selectedLanguage: lang }, () => {
      i18n.changeLanguage(this.state.selectedLanguage)
      this.saveData(lang)
    })
  }

  saveData = selectedLanguage => {
    if (isStorageExist(this.props.t('storage_availability'))) {
      localStorage.setItem(this.state.LANGUAGE_STORAGE_KEY, JSON.stringify(selectedLanguage))
    }
  }

  render() {
    return (
      <div className="identification-page h-full">
        <Helmet>
          <title>Identify Products</title>
          <meta name="description" content="Identify Products by QR Code, Barcode, Image, or Text Input."/>
          <link rel="canonical" href="https://product-identifier.vercel.app/identify"/>
        </Helmet>
        <HeaderContainer
          props={this.props}
          changeLanguage={this.changeLanguage.bind(this)}
          setDisplayMode={this.setDisplayMode.bind(this)}
          isDarkModeEnabled={this.state.isDarkModeEnabled}
        />
        <MainContainer
          props={this.props}
          state={this.state}
        />
      </div>
    )
  }
}

export default withTranslation()(IdentificationPage)