import React from "react"
import { Helmet } from "react-helmet"
import HeaderContainer from "./header/HeaderContainer"
import { withTranslation } from "react-i18next"
import { isStorageExist } from "../../../utils/data"
import MainContainer from "./main/MainContainer"
import { timeOut } from "../../../utils/aborter"
import Swal from "sweetalert2"
import FooterContainer from "./footer/FooterContainer"

class IdentificationPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      LANGUAGE_STORAGE_KEY: 'LANGUAGE_STORAGE_KEY',
      DARK_MODE_STORAGE_KEY: 'DARK_MODE_STORAGE_KEY',
      DATE_UPDATED_STORAGE_KEY: 'DATE_UPDATED_STORAGE_KEY',
      PRODUCT_STORAGE_KEY: 'PRODUCT_STORAGE_KEY',
      UPDATE_SETTING_STORAGE_KEY: 'UPDATE_SETTING_STORAGE_KEY',
      getDateUpdated: '',
      getProductList: [],
      getProductsPerPage: [],
      getFilteredProducts: [],
      getSelectedProduct: '',
      searchQuery: '',
      sortBy: this.props.t('sort_products'),
      currentPage: 1,
      lastPage: 1,
      itemsPerPage: 20,
      selectedLanguage: 'en',
      tagColor: '',
      syncSelection: '',
      isDarkModeEnabled: false,
      isProductListLoading: false,
      isSyncBtnClicked: false,
      isSyncModalOpened: false,
      isAutoCheckUpdate: false,
      isDetailModalOpened: false,
      isEditModalOpened: false,
      isSavedToLocalStorage: false,
      isDetailBtnClicked: false,
      isBtnCloseClicked: false
    }
  }

  componentDidMount() {
    this.checkWindowSize()
    this.checkLocalStorage()
    this.searchHandler('')
  }
  
  componentDidUpdate() {
    document.body.classList.toggle('dark', this.state.isDarkModeEnabled)
    if (this.state.isEditModalOpened) {
      document.body.style.overflow = 'hidden'
      addEventListener('beforeunload', this.onUnloadPage)
    } else document.body.style.overflow = 'unset'
    if (this.state.isSyncBtnClicked && !this.state.isSyncModalOpened) {
      // checkUpdate()
    }
  }

  componentWillUnmount() {
    removeEventListener('beforeunload', this.onUnloadPage)
  }

  checkWindowSize () {
    if (window.innerWidth > 768) {
      this.setState({ itemsPerPage: 10 })
    } else {
      this.setState({ itemsPerPage: 20 })
    }
  }

  checkLocalStorage () {
    isStorageExist(this.props.t('storage_availability'))
    if (isStorageExist('')) {
      this.checkDisplayMode()
      this.checkLanguageData()
      this.checkProductData()
      this.checkUpdateSetting()
    } else {
      return
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

  checkProductData () {
    const getDateUpdatedDataFromLocal = localStorage.getItem(this.state.DATE_UPDATED_STORAGE_KEY)
    const getProductDataFromLocal = localStorage.getItem(this.state.PRODUCT_STORAGE_KEY)
    try {
      const parsedDateUpdated = JSON.parse(getDateUpdatedDataFromLocal)
      const parsedProductData = JSON.parse(getProductDataFromLocal)
      if (parsedDateUpdated !== undefined && parsedProductData !== undefined) {
        this.loadProductData()
      } else this.fetchProductList()
    } catch (error) {
      localStorage.removeItem(this.state.PRODUCT_STORAGE_KEY)
      alert(`Error: ${error.message}\n${this.props.t('reload')}`)
    }
  }

  checkUpdateSetting () {
    const getUpdateSettingFromLocal = localStorage.getItem(this.state.UPDATE_SETTING_STORAGE_KEY)
    try {
      const parsedUpdateSetting = JSON.parse(getUpdateSettingFromLocal)
      if (parsedUpdateSetting !== undefined) {
        this.setState({ isAutoCheckUpdate: parsedUpdateSetting })
      }
    } catch (error) {
      localStorage.removeItem(this.state.UPDATE_SETTING_STORAGE_KEY)
      alert(`Error: ${error.message}\n${this.props.t('reload')}`)
    }
  }

  setDisplayMode () {
    this.setState(prevState => ({
      isDarkModeEnabled: !prevState.isDarkModeEnabled
    }), () => this.saveDisplayMode(this.state.isDarkModeEnabled))
  }

  changeLanguage = lang => {
    const { i18n } = this.props
    this.setState({ selectedLanguage: lang }, () => {
      i18n.changeLanguage(this.state.selectedLanguage)
      this.saveLangData(lang)
    })
  }

  changeUpdateSetting = () => {
    this.setState(prevState => ({
      isAutoCheckUpdate: !prevState.isAutoCheckUpdate
    }), () => this.saveUpdateSetting(this.state.isAutoCheckUpdate))
  }

  saveDisplayMode = selectedDisplayMode => {
    if (isStorageExist(this.props.t('storage_availability'))) {
      localStorage.setItem(this.state.DARK_MODE_STORAGE_KEY, JSON.stringify(selectedDisplayMode))
    }
  }

  saveLangData = selectedLanguage => {
    if (isStorageExist(this.props.t('storage_availability'))) {
      localStorage.setItem(this.state.LANGUAGE_STORAGE_KEY, JSON.stringify(selectedLanguage))
    }
  }

  saveUpdateSetting = isAutoCheckUpdate => {
    if (isStorageExist(this.props.t('storage_availability'))) {
      localStorage.setItem(this.state.UPDATE_SETTING_STORAGE_KEY, JSON.stringify(isAutoCheckUpdate))
    }
  }

  loadProductData() {
    const getDateUpdatedDataFromLocal = localStorage.getItem(this.state.DATE_UPDATED_STORAGE_KEY)
    const getProductDataFromLocal = localStorage.getItem(this.state.PRODUCT_STORAGE_KEY)
    try {
      const parsedDateUpdated = JSON.parse(getDateUpdatedDataFromLocal)
      const parsedProductData = JSON.parse(getProductDataFromLocal)
      if (parsedDateUpdated !== null && parsedProductData !== null) {
        if (Object.keys(parsedProductData).length > 0) {
          this.setState({
            getDateUpdated: parsedDateUpdated,
            getProductList: parsedProductData,
            getFilteredProducts: parsedProductData
          }, () => this.loadProductsPerPage())
        } else {
          localStorage.removeItem(this.state.DATE_UPDATED_STORAGE_KEY)
          localStorage.removeItem(this.state.PRODUCT_STORAGE_KEY)
          this.setState({
            getDateUpdated: '',
            getProductList: [],
            getFilteredProducts: []
          }, () => this.loadProductsPerPage())
        }
        this.setState({ isProductListLoading: false })
      } else this.fetchProductList()
    } catch (error) {
      localStorage.removeItem(this.state.PRODUCT_STORAGE_KEY)
      alert(`Error: ${error.message}\n${this.props.t('reload')}`)
    }
  }

  loadProductsPerPage () {
    const lastPage = parseInt(this.state.getFilteredProducts.length / this.state.itemsPerPage)
    this.setState({
      getProductsPerPage: this.state.getFilteredProducts.slice(
        (this.state.currentPage - 1) * this.state.itemsPerPage,
        this.state.currentPage * this.state.itemsPerPage),
      lastPage: lastPage + 1
    })
  }

  fetchProductList() {
    const productsUrl = import.meta.env.VITE_PRODUCT_LIST_URL
    this.setState(prevState => ({ ...prevState, isProductListLoading: true }))
    fetch(productsUrl, {
      mode: 'cors',
      signal: timeOut(20).signal
    }).then(response => response.json()).then(response => {
      if (Object.entries(response?.data?.product_list).length > 0) {
        this.setState({
          getDateUpdated: response?.date_updated || new Date().toISOString(),
          getProductList: response.data.product_list,
          isProductListLoading: false,
          isSyncBtnClicked: false
        }, () => {
          this.sortProductList(this.state.sortBy)
          this.saveProductData()
        })
      } else {
        this.setState({ isProductListLoading: false, isSyncBtnClicked: false})
        Swal.fire(this.props.t('empty_data_alert'), '', 'warning')
      }
    }).then(() => this.loadProductData())
    .catch(error => {
      Swal.fire(this.props.t('fetch_error'), error.message, 'error')
      this.setState({ isProductListLoading: false, isSyncBtnClicked: false })
    })
  }

  saveProductData() {
    if (isStorageExist(this.props.t('storage_availability'))) {
      const dateUpdatedStringData = JSON.stringify(this.state.getDateUpdated)
      const productsStringData = JSON.stringify(this.state.getProductList)
      localStorage.removeItem(this.state.DATE_UPDATED_STORAGE_KEY)
      localStorage.removeItem(this.state.PRODUCT_STORAGE_KEY)
      localStorage.setItem(this.state.DATE_UPDATED_STORAGE_KEY, dateUpdatedStringData)
      localStorage.setItem(this.state.PRODUCT_STORAGE_KEY, productsStringData)
    }
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
    this.setState({ itemsPerPage: event.target.value || 20 }, () => {
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

  onClickSyncBtn () {
    this.setState({ isSyncModalOpened: true })
  }

  synchronizeProductData (selection) {
    this.setState({ isSyncBtnClicked: true, syncSelection: selection }, () => {
      if (selection === 'Update All') {
        this.onClickDeleteAllBtn()
        this.fetchProductList()
      } else if (selection === 'Partially Update') {
        this.fetchProductList()
      } else {
        // this.fetchProductList()
      }
    })
    this.onCloseModalHandler()
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
    } else {
      const sortProductsByTagDesc = dataCopy.sort((a, b) => (b.name_tag > a.name_tag) ? 1 : -1)
      this.setState({ getFilteredProducts: sortProductsByTagDesc }, () => this.loadProductsPerPage())
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

  onClickDetailBtn (idx) {
    const viewDetailProduct = this.findProductByIdx(idx)
    if (viewDetailProduct !== undefined) {
      this.setState({
        isBtnCloseClicked: false,
        isDetailModalOpened: true,
        getSelectedProduct: viewDetailProduct
      })
    } else Swal.fire({ icon: 'error', title: this.props.t('product_not_found') })
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

  onCloseModalHandler () {
    this.setState({
      isBtnCloseClicked: true,
      isSyncModalOpened: false,
      isDetailModalOpened: false,
      isEditModalOpened: false
    })
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

  onUnloadPage = event => {
    event.preventDefault()
    event.returnValue = this.props.t('reload_page_prompt')
  }

  render() {
    return (
      <div className="identification-page h-screen flex flex-col dark:bg-black overflow-y-auto">
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
          changeUpdateSetting={this.changeUpdateSetting.bind(this)}
          changeItemsPerPage={this.changeItemsPerPageHandler.bind(this)}
          searchItem={this.searchHandler.bind(this)}
          onClickSyncBtn={this.onClickSyncBtn.bind(this)}
          syncProductData={this.synchronizeProductData.bind(this)}
          sortItems={this.sortProductList.bind(this)}
          onSelectNavHandler={this.onSelectNavHandler.bind(this)}
          onClickDeleteAllBtn={this.onClickDeleteAllBtn.bind(this)}
          onClickDetailBtn={this.onClickDetailBtn.bind(this)}
          onClickEditBtn={this.onClickEditBtn.bind(this)}
          onClickDeleteBtn={this.onClickDeleteBtn.bind(this)}
          findProductByIdx={this.findProductByIdx.bind(this)}
          editProductItem={this.editProductHandler.bind(this)}
          onCloseModal={this.onCloseModalHandler.bind(this)}
        />
        <FooterContainer/>
      </div>
    )
  }
}

export default withTranslation()(IdentificationPage)