import React from "react"
import { Helmet } from "react-helmet"
import { withTranslation } from "react-i18next"
import Swal from "sweetalert2"
import { timeOut } from "../../../utils/aborter"
import { isStorageExist } from "../../../utils/data"
import FooterComponent from "./footer/FooterComponent"
import HeaderContainer from "./header/HeaderContainer"
import LoginContainer from "./main/LoginContainer"
import ProductDataContainer from "./main/ProductDataContainer"

class AccountPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      LANGUAGE_STORAGE_KEY: 'LANGUAGE_STORAGE_KEY',
      DARK_MODE_STORAGE_KEY: 'DARK_MODE_STORAGE_KEY',
      USERNAME_STORAGE_KEY: 'USERNAME_STORAGE_KEY',
      PASSWORD_STORAGE_KEY: 'PASSWORD_STORAGE_KEY',
      KEEP_SIGNED_IN_STORAGE_KEY: 'KEEP_SIGNED_IN_STORAGE_KEY',
      username: '',
      password: '',
      inputType: 'password',
      getProductList: [],
      getProductsPerPage: [],
      getFilteredProducts: [],
      getSelectedProduct: '',
      searchQuery: '',
      sortBy: this.props.t('sort_products.0'),
      currentPage: 1,
      lastPage: 1,
      itemsPerPage: 20,
      selectedLanguage: 'en',
      tagColor: '',
      isDarkModeEnabled: false,
      isKeepSignedIn: false,
      isFocused: false,
      isSubmitted: false,
      isUserLoggedIn: false,
      isUserActivated: false,
      isProductListLoading: false,
      isEditModalOpened: false,
      isEditBtnClicked: false,
      isBtnCloseClicked: false
    }
    this.formRef = React.createRef()
  }

  componentDidMount() {
    this.checkWindowSize()
    this.checkLocalStorage()
    if (this.state.isUserLoggedIn && this.state.isUserActivated) {
      this.fetchProductList()
    }
  }

  componentDidUpdate() {
    document.body.classList.toggle('dark', this.state.isDarkModeEnabled)
    if (this.state.isEditModalOpened) {
      document.body.style.overflow = 'hidden'
      addEventListener('beforeunload', this.onUnloadPage)
    } else document.body.style.overflow = 'unset'
  }

  componentWillUnmount() {
    removeEventListener('beforeunload', this.onUnloadPage)
  }

  checkWindowSize() {
    if (innerWidth > 768) this.setState({ itemsPerPage: 10 })
    else this.setState({ itemsPerPage: 20 })
  }

  checkLocalStorage() {
    isStorageExist(this.props.t('storage_availability'))
    if (!isStorageExist('')) return
    else {
      this.checkUserAccount()
      this.checkKeepSignedIn()
      this.checkDisplayMode()
      this.checkLanguageData()
    }
  }

  checkUserAccount () {
    const getUserDataFromLocal = localStorage.getItem(this.state.USERNAME_STORAGE_KEY)
    const getPasswordDataFromLocal = localStorage.getItem(this.state.PASSWORD_STORAGE_KEY)
    try {
      const parsedUserData = JSON.parse(getUserDataFromLocal)
      const parsedPasswordData = JSON.parse(getPasswordDataFromLocal)
      if (parsedUserData !== undefined && parsedPasswordData !== undefined) {
        if (parsedUserData !== null && parsedPasswordData !== null) {
          this.setState({ username: parsedUserData, password: parsedPasswordData, isUserLoggedIn: true })
        }
      }
    } catch (error) {
      localStorage.removeItem(this.state.USERNAME_STORAGE_KEY)
      alert(`Error: ${error.message}\n${this.props.t('reload')}`)
    }
  }

  checkKeepSignedIn () {
    const getKeepSignedInFromLocal = localStorage.getItem(this.state.KEEP_SIGNED_IN_STORAGE_KEY)
    try {
      const parsedKeepSignedIn = JSON.parse(getKeepSignedInFromLocal)
      if (parsedKeepSignedIn !== undefined) {
        this.setState({ isKeepSignedIn: parsedKeepSignedIn })
      }
    } catch (error) {
      localStorage.removeItem(this.state.KEEP_SIGNED_IN_STORAGE_KEY)
      alert(`Error: ${error.message}\n${this.props.t('reload')}`)
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

  onUserChangeEventHandler (event) {
    if (event.target.value.length <= 50 || event.target.value.length > 0) {
      this.setState(prevState => ({
        ...prevState,
        username: event.target.value
      }))
    }
  }

  onPasswordChangeEventHandler (event) {
    this.setState(prevState => ({
      ...prevState,
      password: event.target.value
    }))
  }

  changeVisibilityPassword () {
    if (this.state.inputType === 'password') {
      this.setState({ inputType: 'text' })
    } else this.setState({ inputType: 'password' })
  }

  enableKeepSignedIn () {
    this.setState(prevState => ({ isKeepSignedIn: !prevState.isKeepSignedIn }), () => {
      localStorage.setItem(this.state.KEEP_SIGNED_IN_STORAGE_KEY, JSON.stringify(this.state.isKeepSignedIn))
    })
  }

  saveSignInData () {
    if (isStorageExist(this.props.t('storage_availability'))) {
      if (this.state.username !== '' && this.state.password !== '') {
        if (this.state.isKeepSignedIn) {
          localStorage.setItem(this.state.USERNAME_STORAGE_KEY, JSON.stringify(this.state.username))
          localStorage.setItem(this.state.PASSWORD_STORAGE_KEY, JSON.stringify(this.state.password))
        } else {
          sessionStorage.setItem(this.state.USERNAME_STORAGE_KEY, JSON.stringify(this.state.username))
          sessionStorage.setItem(this.state.PASSWORD_STORAGE_KEY, JSON.stringify(this.state.password))
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to save data',
          text: 'Username and password can\'t be empty',
        })
      }
    }
  }

  onBlurHandler () {
    this.setState({ isFocused: false })
  }

  onFocusHandler () {
    this.setState({ isFocused: true })
  }

  onSubmitHandler () {
    this.saveSignInData()
    this.setState({ isSubmitted: true })
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

  loadProductsPerPage () {
    const lastPage = parseInt((this.state.getFilteredProducts.length - 1) / this.state.itemsPerPage)
    this.setState({
      getProductsPerPage: this.state.getFilteredProducts.slice((this.state.currentPage - 1) * this.state.itemsPerPage, this.state.currentPage * this.state.itemsPerPage),
      lastPage: lastPage + 1
    })
  }

  fetchProductList () {
    const productsUrl = import.meta.env.VITE_PRODUCT_LIST_URL
    this.setState({ isProductListLoading: true })
    fetch(productsUrl, {
      mode: 'cors',
      method: 'GET',
      signal: timeOut(30).signal
    }).then(response => response.json()).then(response => {
      if (Object.entries(response?.data?.product_list).length > 0) {
        this.setState({
          getDateUpdated: response?.date_updated,
          getProductList: response.data.product_list,
          isProductListLoading: false
        })
      } else {
        this.setState({ isProductListLoading: false })
        Swal.fire(this.props.t('empty_data_alert'), '', 'warning')
      }
    }).then(() => this.searchHandler(''))
    .catch(error => {
      let errorMsg = ''
      if (error.message.includes('The user aborted a request.')) errorMsg = 'Request Timeout!'
      else errorMsg = error.message
      Swal.fire(this.props.t('fetch_error'), errorMsg, 'error')
      this.setState({ isProductListLoading: false })
    })
  }

  updateProductData() {
    if (isStorageExist(this.props.t('storage_availability'))) {
      const productData = this.state.getProductList
      localStorage.removeItem(this.state.PRODUCT_STORAGE_KEY)
      localStorage.setItem(this.state.PRODUCT_STORAGE_KEY, productData)
      this.sortProductList(this.props.t('sort_products.3'))
    } else Swal.fire(this.props.t('storage_title_alert'), this.props.t('storage_text_alert'), 'error')
  }

  changeItemsPerPageHandler (event) {
    event.preventDefault()
    this.setState({ itemsPerPage: parseInt(event.target.value) }, () => {
      this.onSelectNavHandler(0)
      this.loadProductsPerPage()
    })
  }

  searchHandler (query) {
    const dataCopy = this.state.getProductList.map(productItem => ({ ...productItem }))
    this.setState({ searchQuery: query.toLowerCase() }, () => {
      if (this.state.searchQuery === '') {
        this.sortProductList(this.state.sortBy)
      } else {
        const filteredData = dataCopy.filter(productItem => 
          productItem.product_name.toLowerCase().includes(this.state.searchQuery) ||
          productItem.vendor.toLowerCase().includes(this.state.searchQuery) ||
          productItem.origin.toLowerCase().includes(this.state.searchQuery) ||
          productItem.name_tag.toLowerCase().includes(this.state.searchQuery)
        )
        this.setState({ getFilteredProducts: filteredData }, () => this.loadProductsPerPage())
        this.onSelectNavHandler(0)
      }
    })
  }

  onClickDeleteAllBtn () {
    if (isStorageExist(this.props.t('storage_availability'))) {
      localStorage.removeItem(this.state.DATE_UPDATED_STORAGE_KEY)
      localStorage.removeItem(this.state.PRODUCT_STORAGE_KEY)
      this.setState({
        getDateUpdated: '',
        getProductList: [],
        getFilteredProducts: []
      })
    }
  }

  sortProductList(sort) {
    const dataCopy = [...this.state.getProductList]
    if (sort === this.props.t('sort_products.0')) {
      const sortProductsByName = dataCopy.sort((a, b) => (a.product_name > b.product_name) ? 1 : -1)
      this.setState({ getFilteredProducts: sortProductsByName }, () => this.loadProductsPerPage())
    } else if (sort === this.props.t('sort_products.1')) {
      const sortProductsByNameDesc = dataCopy.sort((a, b) => b.product_name.toLowerCase().localeCompare(a.product_name.toLowerCase()))
      this.setState({ getFilteredProducts: sortProductsByNameDesc }, () => this.loadProductsPerPage())
    } else if (sort === this.props.t('sort_products.2')) {
      const sortProductsByDate = dataCopy.sort((a, b) => {
        const dateA = a.date_created ? new Date(a.date_created) : new Date(0)
        const dateB = b.date_created ? new Date(b.date_created) : new Date(0)
        return dateA - dateB
      })
      this.setState({ getFilteredProducts: sortProductsByDate }, () => this.loadProductsPerPage())
    } else if (sort === this.props.t('sort_products.3')) {
      const sortProductsByDateDesc = dataCopy.sort((a, b) => {
        b.date_created ? new Date(b.date_created) : new Date(0) - a.date_created ? new Date(a.date_created) : new Date(0)
      })
      this.setState({ getFilteredProducts: sortProductsByDateDesc }, () => this.loadProductsPerPage())
    } else if (sort === this.props.t('sort_products.4')) {
      const sortProductsByTag = dataCopy.sort((a, b) => a.name_tag.toLowerCase().localeCompare(b.name_tag.toLowerCase()))
      this.setState({ getFilteredProducts: sortProductsByTag }, () => this.loadProductsPerPage())
    } else if (sort === this.props.t('sort_products.5')) {
      const sortProductsByTagDesc = dataCopy.sort((a, b) => (b.name_tag > a.name_tag) ? 1 : -1)
      this.setState({ getFilteredProducts: sortProductsByTagDesc }, () => this.loadProductsPerPage())
    } else if (sort === this.props.t('sort_products.6')) {
      const sortProductsByVendor = dataCopy.sort((a, b) => a.vendor.toLowerCase().localeCompare(b.vendor.toLowerCase()))
      this.setState({ getFilteredProducts: sortProductsByVendor }, () => this.loadProductsPerPage())
    } else {
      const sortProductsByVendorDesc = dataCopy.sort((a, b) => (b.vendor > a.vendor) ? 1 : -1)
      this.setState({ getFilteredProducts: sortProductsByVendorDesc }, () => this.loadProductsPerPage())
    }
    this.onSelectNavHandler(0)
    this.setState({ sortBy: sort })
  }

  onSelectNavHandler (navIndex) {
    if (navIndex === 0 && this.state.currentPage > 1) this.setState({ currentPage: 1 }, () => this.loadProductsPerPage())
    else if (navIndex === 1 && this.state.currentPage > 1) {
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }), () => this.loadProductsPerPage())
    } else if (navIndex === 3 && this.state.currentPage <= this.state.lastPage - 1) {
      this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }), () => this.loadProductsPerPage())
    } else if (navIndex === 4 && this.state.currentPage <= this.state.lastPage - 1) {
      this.setState({ currentPage: this.state.lastPage }, () => this.loadProductsPerPage())
    }
  }

  findProductByIdx(idx) {
    const findSelectedProduct = this.state.getProductList.find(productData => productData.index === parseInt(idx))
    return findSelectedProduct
  }

  editProductHandler (idx, productName, productIds, category, vendor, origin, dateCreated, nameTag, colorTag, description, alternatives, sources, addedBy, modifiedBy ) {
    const findSelectedProduct = this.findProductByIdx(idx)
    if (findSelectedProduct === undefined) {
      const addedProductData = this.state.getProductList
      addedProductData.unshift({
        idx,
        productName,
        productIds,
        category,
        vendor,
        origin,
        dateCreated,
        nameTag,
        colorTag,
        description,
        alternatives,
        sources,
        addedBy,
        modifiedBy
      })
      this.setState({ getProductList: addedProductData }, () => this.updateProductData())
    } else {
      const editedProductData = this.state.getProductList.map(productItem => {
        if (productItem.index === idx) {
          return {
            ...productItem,
            productName,
            productIds,
            category,
            vendor,
            origin,
            nameTag,
            colorTag,
            description,
            alternatives,
            sources,
            addedBy,
            modifiedBy
          }
        }
        return productItem
      })
      this.setState({ getProductList: editedProductData, getFilteredProducts: editedProductData }, () => {
        this.updateProductData()
      })
    }
  }

  onClickEditBtn (idx) {
    const findOpenedProduct = this.findProductByIdx(idx)
    if (findOpenedProduct !== undefined) {
      this.setState({
        isBtnCloseClicked: false,
        getSelectedProduct: findOpenedProduct,
        isEditModalOpened: true
      })
    } else {
      this.setState({
        isBtnCloseClicked: false,
        isEditModalOpened: true,
        getSelectedProduct: {
          index: +new Date(),
          product_name: '',
          product_ids: '',
          category: '',
          vendor: '',
          origin: '',
          date_created: '',
          name_tag: '',
          color_tag: '',
          description: '',
          alternatives: '',
          sources: '',
          added_by: 'User',
          modified_by: 'User'
        }
      })
    }
  }

  onClickDeleteBtn (idx) {
    if (this.findProductByIdx(idx) !== undefined) {
      const remainingProducts = this.state.getProductList.filter(productData => productData.index !== parseInt(idx))
      this.setState({
        getProductList: remainingProducts,
        getFilteredProducts: remainingProducts
      }, () => {
        this.sortProductList(this.state.sortBy)
        this.saveProductData()
      })
    } else {
      Swal.fire(this.props.t('delete_title_alert.1'), this.props.t('delete_text_alert.1'), 'error')
    }
  }

  onUnloadPage (event) {
    event.preventDefault()
    event.returnValue = this.props.t('reload_page_prompt')
  }

  onCloseModalHandler () {
    this.setState({
      isBtnCloseClicked: true,
      isEditModalOpened: false
    })
  }

  render() {
    return (
      <div className="account-page h-screen flex flex-col dark:bg-black overflow-y-auto">
        {
          this.state.isUserLoggedIn && this.state.isUserActivated
            ? <Helmet>
                <title>{this.props.t('product_data')}</title>
                <meta name="description" content="List of Product Data" />
                <link rel="canonical" href="https://product-identifier.pages.dev/account" />
              </Helmet>
            : <Helmet>
                <title>{this.props.t('sign_in')}</title>
                <meta name="description" content="Login to Manage Product Data" />
                <link rel="canonical" href="https://product-identifier.pages.dev/account" />
              </Helmet> 
        }
        <HeaderContainer
          props={this.props}
          changeLanguage={this.changeLanguage.bind(this)}
          setDisplayMode={this.setDisplayMode.bind(this)}
          isDarkModeEnabled={this.state.isDarkModeEnabled}
        />
        {
          this.state.isUserLoggedIn && this.state.isUserActivated
            ? <ProductDataContainer
                props={this.props}
                state={this.state}
                changeItemsPerPageHandler={this.changeItemsPerPageHandler.bind(this)}
                searchItem={this.searchHandler.bind(this)}
                sortItems={this.sortProductList.bind(this)}
                onSelectNavHandler={this.onSelectNavHandler.bind(this)}
                onClickDeleteAllBtn={this.onClickDeleteAllBtn.bind(this)}
                // onClickImportBtn={this.onClickImportBtn.bind(this)}
                // onClickExportBtn={this.onClickExportBtn.bind(this)}
                onClickEditBtn={this.onClickEditBtn.bind(this)}
                onClickDeleteBtn={this.onClickDeleteBtn.bind(this)}
                findProductByIdx={this.findProductByIdx.bind(this)}
                editProductItem={this.editProductHandler.bind(this)}
                onCloseModal={this.onCloseModalHandler.bind(this)}
              />
            : <LoginContainer
                props={this.props}
                formRef={this.formRef}
                state={this.state}
                onUserChangeHandler={this.onUserChangeEventHandler.bind(this)}
                onPasswordChangeHandler={this.onPasswordChangeEventHandler.bind(this)}
                changeVisibilityPassword={this.changeVisibilityPassword.bind(this)}
                onBlurHandler={this.onBlurHandler.bind(this)}
                onFocusHandler={this.onFocusHandler.bind(this)}
                enableKeepSignedIn={this.enableKeepSignedIn.bind(this)}
                onSubmitHandler={this.onSubmitHandler.bind(this)}
              />
        }
        <FooterComponent />
      </div>
    )
  }
}

export default withTranslation()(AccountPage)