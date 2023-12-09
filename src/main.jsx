import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/style.css'
import 'animate.css/animate.min.css'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <BrowserRouter basename=''>
      <App/>
    </BrowserRouter>
  </React.Fragment>
)
