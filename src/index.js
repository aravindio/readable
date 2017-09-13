import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './components/app'
import './css/bootstrap.css'
import './css/index.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router>
    <Route path='/' component={App} />
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()