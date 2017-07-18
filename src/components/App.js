import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Configure from '../containers/Configure'
import Preview from '../containers/Preview'

const App = () => (
  <div className="container">
    <Header />
    <Configure />
    <hr/>
    <Preview />
    <Footer />
  </div>
)

export default App
