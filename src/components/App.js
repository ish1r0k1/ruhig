import React from 'react'
import ConfigureForm from '../containers/ConfigureForm'
import PreviewTwitterHeader from '../containers/PreviewTwitterHeader'
import PreviewOGImage from '../containers/PreviewOGImage'
import PreviewTweetImage from '../containers/PreviewTweetImage'

const App = () => (
  <div className="container">
    <h1>ruhig <span className="version">beta</span></h1>
    <ConfigureForm />
    <hr/>
    <PreviewTwitterHeader />
    <hr/>
    <PreviewTweetImage />
    <hr/>
    <PreviewOGImage />
  </div>
)

export default App
