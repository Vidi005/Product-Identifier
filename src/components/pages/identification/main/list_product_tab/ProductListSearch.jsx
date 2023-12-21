import React from "react"
import { withTranslation } from "react-i18next"

class ProductListSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  
  onSearchHandler = (event) => {
    scrollTo(0, 0)
    this.setState({ value: event.target.value }, () => this.props.searchItem(this.state.value))
  }

  render() {
    return (
      <input
        className="toolbar-search grow mr-2 p-1 md:p-2 border border-green-800 dark:border-gray-100 bg-green-50/25 dark:bg-gray-900/25 dark:text-white rounded-lg shadow-inner dark:shadow-white/50 backdrop-blur-sm"
        type="search"
        placeholder={this.props.t('search_items')}
        value={this.state.value}
        onChange={this.onSearchHandler.bind(this)}
      />
    )
  }
}

export default withTranslation()(ProductListSearch)