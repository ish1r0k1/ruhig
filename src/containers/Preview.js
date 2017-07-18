import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Canvas from '../components/Canvas'

class Preview extends Component {
  static PropTypes = {
    configure: PropTypes.object.isRequired,
    information: PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <div className="canvas">
          <h3>Twitter header</h3>
          <p className="description">Twitter用ヘッダーに適した画像です。</p>
          <Canvas
            width={1500}
            height={500}
            jacketSize={320}
            offsetEdge={160}
            offsetJacket={80}
            fontSizes={{
              small: 18,
              normal: 20,
              large: 28,
              larger: 48
            }}
            refName={'twitter_header'}
            {...this.props}
          />
        </div>
        <hr/>
        <div className="canvas">
          <h3>Twitter image</h3>
          <p className="description">
            Twitterのタイムラインに適した画像です。<br/>
            画像つきツイート時に、テキストが見切れないように調整されています。
          </p>
          <Canvas
            width={900}
            height={450}
            jacketSize={320}
            offsetEdge={65}
            offsetJacket={65}
            fontSizes={{
              small: 15,
              normal: 18,
              large: 21,
              larger: 36
            }}
            refName={'twitter_image'}
            {...this.props}
          />
        </div>
        <hr/>
        <div className="canvas">
          <h3>Facebook OG image</h3>
          <p className="description">OGイメージに適したサイズの画像です。</p>
          <Canvas
            width={1200}
            height={630}
            jacketSize={428}
            offsetEdge={87}
            offsetJacket={87}
            fontSizes={{
              small: 18,
              normal: 20,
              large: 28,
              larger: 48
            }}
            refName={'facebook_og_image'}
            {...this.props}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  configure: state.configure,
  information: state.information
})

export default connect(
  mapStateToProps
)(Preview)
