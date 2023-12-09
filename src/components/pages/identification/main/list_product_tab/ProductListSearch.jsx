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
    this.setState({ value: event.target.value }, () => this.props.searchItem(this.state.value))
  }

  render() {
    return (
      <input
        className="grow mr-2 p-1 border border-green-800 bg-green-50 rounded-lg shadow-inner"
        type="search"
        placeholder={this.props.t('search_items')}
        value={this.state.value}
        onChange={this.onSearchHandler.bind(this)}
      />
    )
  }
}

export default withTranslation()(ProductListSearch)