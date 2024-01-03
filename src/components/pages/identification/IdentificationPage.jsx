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
      getTempProductList: [],
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
      syncSelection: '',
      isDarkModeEnabled: false,
      isCheckingForUpdate: false,
      isProductListLoading: false,
      isSyncBtnClicked: false,
      isSyncModalOpened: false,
      isAutoCheckUpdate: true,
      isDetailModalOpened: false,
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
  }

  checkWindowSize () {
    if (window.innerWidth > 768) this.setState({ itemsPerPage: 10 })
    else this.setState({ itemsPerPage: 20 })
  }

  checkLocalStorage () {
    isStorageExist(this.props.t('storage_availability'))
    if (isStorageExist('')) {
      this.checkDisplayMode()
      this.checkLanguageData()
      this.checkUpdateSetting()
      this.checkProductData()
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

  checkUpdateSetting () {
    const getUpdateSettingFromLocal = localStorage.getItem(this.state.UPDATE_SETTING_STORAGE_KEY)
    try {
      const parsedUpdateSetting = JSON.parse(getUpdateSettingFromLocal)
      if (parsedUpdateSetting !== undefined) {
        this.setState({ isAutoCheckUpdate: parsedUpdateSetting }, () => this.checkProductData())
      }
    } catch (error) {
      localStorage.removeItem(this.state.UPDATE_SETTING_STORAGE_KEY)
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
        if (this.state.isAutoCheckUpdate) this.checkProductUpdate(true)
      } else this.fetchProductList()
    } catch (error) {
      localStorage.removeItem(this.state.PRODUCT_STORAGE_KEY)
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
    const lastPage = parseInt((this.state.getFilteredProducts.length - 1) / this.state.itemsPerPage)
    this.setState({
      getProductsPerPage: this.state.getFilteredProducts.slice(
        (this.state.currentPage - 1) * this.state.itemsPerPage,
        this.state.currentPage * this.state.itemsPerPage),
      lastPage: lastPage + 1
    })
  }

  checkProductUpdate (truthState) {
    return new Promise((resolve, reject) => {
      const productsUrl = import.meta.env.VITE_PRODUCT_LIST_URL
      this.setState({ isCheckingForUpdate: truthState })
      fetch(productsUrl, {
        mode: 'cors',
        signal: timeOut(20).signal
      }).then(response => response.json()).then(response => {
        if (response?.date_updated !== undefined && Object.entries(response?.data?.product_list).length > 0) {
          if (Date.parse(response.date_updated) > Date.parse(this.state.getDateUpdated)) {
            Swal.fire({
              title: this.props.t('update_available_title_alert'),
              text: this.props.t('update_available_text_alert'),
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: 'green',
              cancelButtonColor: 'red',
              confirmButtonText: this.props.t('question_tag_confirmation.0'),
              cancelButtonText: this.props.t('question_tag_confirmation.1'),
            }).then((result) => {
              if (result.isConfirmed) {
                this.setState({
                  getDateUpdated: response.date_updated,
                  getTempProductList: response.data.product_list,
                  isCheckingForUpdate: false,
                  isSyncModalOpened: truthState
                })
                resolve()
              } else {
                this.setState({ isCheckingForUpdate: false, isSyncBtnClicked: false })
                resolve()
              }
            })
          } else {
            this.setState({ isCheckingForUpdate: false })
            resolve()
          }        
        } else {
          this.setState({ isCheckingForUpdate: false })
          Swal.fire(this.props.t('empty_data_alert'), '', 'warning')
          reject(new Error(this.props.t('empty_data_alert')))
        }
      }).catch(error => {
        let errorMsg = ''
        if (error.message.includes('The user aborted a request.')) errorMsg = 'Request Timeout!'
        else errorMsg = error.message
        Swal.fire(this.props.t('check_update_error'), errorMsg, 'error')
        this.setState({ isCheckingForUpdate: false })
        reject(new Error(errorMsg))
      })
    })
  }

  mergeProductList(newData) {
    const mergedList = []
    const oldData = this.state.getProductList
    const combinedProductList = [...oldData, ...newData]
    const indexMap = new Map()
    combinedProductList.forEach(productItem => {
      const { index } = productItem
      if (!indexMap.has(index)) {
        indexMap.set(index, productItem)        
      }
    })
    indexMap.forEach(productItem => {
      mergedList.push(productItem)
    })
    return mergedList
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
      let errorMsg = ''
      if (error.message.includes('The user aborted a request.')) errorMsg = 'Request Timeout!'
      else errorMsg = error.message
      Swal.fire(this.props.t('fetch_error'), errorMsg, 'error')
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
        if (this.state.getTempProductList.length > 0) {
          this.setState({ getProductList: this.state.getTempProductList }, () => {
            this.sortProductList(this.state.sortBy)
            this.saveProductData()
            this.setState({ getTempProductList: [], isSyncBtnClicked: false }, () => this.loadProductData())
          })
        } else {
          this.onClickDeleteAllBtn()
          this.fetchProductList()
        }
      } else if (selection === 'Partially Update') {
        if (this.state.getTempProductList.length > 0) {
          const mergedProductList = this.mergeProductList(this.state.getTempProductList)
          this.setState({ getProductList: mergedProductList }, () => {
            this.sortProductList(this.state.sortBy)
            this.saveProductData()
            this.setState({ getTempProductList: [], isSyncBtnClicked: false }, () => this.loadProductData())
          })
        } else {
          this.checkProductUpdate(false).then(() => {
            if (this.state.getTempProductList.length > 0) {
              const mergedProductList = this.mergeProductList(this.state.getTempProductList)
              this.setState({ getProductList: mergedProductList }, () => {
                this.sortProductList(this.state.sortBy)
                this.saveProductData()
                this.setState({ getTempProductList: [] }, () => this.loadProductData())
              })
            }
          })
        }
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

  onCloseModalHandler () {
    this.setState({
      isBtnCloseClicked: true,
      isSyncModalOpened: false,
      isDetailModalOpened: false
    })
  }

  render() {
    return (
      <div className="identification-page h-screen flex flex-col dark:bg-black overflow-y-auto">
        <Helmet>
          <title>{this.props.t('identify_products')}</title>
          <meta name="description" content="Identify Products by QR Code, Barcode, Image, or Text Input."/>
          <link rel="canonical" href="https://product-identifier.pages.dev/identify"/>
        </Helmet>
        <HeaderContainer
          props={this.props}
          headerTitle={this.props.t('identify_products')}
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
          onClickDetailBtn={this.onClickDetailBtn.bind(this)}
          findProductByIdx={this.findProductByIdx.bind(this)}
          onCloseModal={this.onCloseModalHandler.bind(this)}
        />
        <FooterContainer/>
      </div>
    )
  }
}

export default withTranslation()(IdentificationPage)