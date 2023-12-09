import React from "react"

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isTopBtnShown: false
    }
  }
  
  componentDidMount() {
    window.onscroll = () => {
      if (window.scrollY > 400) {
        this.setState({ isTopBtnShown: true })
      } else {
        this.setState({ isTopBtnShown: false })
      }
    }
  }
  render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    )
  }
}

export default LandingPage