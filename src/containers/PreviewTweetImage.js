import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

class PreviewTweetImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      downloadHref: '#',
      canvasSize: {
        width: 900,
        height: 450
      }
    }
  }

  componentDidMount() {
    const { canvasSize } = this.state

    this.jacketSize = {
      width: 320,
      height: 320
    }

    this.offsetFromRightEnd = 65

    this.canvas = ReactDOM.findDOMNode(this.refs.preview_tweet_image)
    this.ctx = this.canvas.getContext('2d')

    this.initCanvas()
  }

  componentWillReceiveProps() {
    console.log('receive')
  }

  componentDidUpdate() {
    this.clearCanvas()
    this.initCanvas()
    this.drawCanvas()
  }

  handleDownload() {
    let dataUrl = this.canvas.toDataURL('image/png')

    this.setState({ downloadHref: dataUrl })
  }

  drawCanvas() {
    const { imageSrc } = this.props.configure.data

    if (imageSrc) {
      this.insertJacket()
    } else {
      this.insertText()
    }
  }

  clearCanvas() {
    const { canvasSize } = this.state
    this.ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
  }

  initCanvas() {
    const { canvasSize } = this.state

    // fill the canvas to black
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
  }

  insertJacket() {
    const { canvasSize } = this.state
    const { imageSrc } = this.props.configure.data

    const image = new Image()
    image.src = imageSrc

    const backgroundBlurJacketScale = 1.133333,
          backgroundBlurJacketSize = canvasSize.width * backgroundBlurJacketScale

    let dx = canvasSize.width - this.offsetFromRightEnd - this.jacketSize.width,
        dy = (canvasSize.height - this.jacketSize.height) * .5,
        dx2 = (this.canvas.width - backgroundBlurJacketSize) * .5,
        dy2 = (this.canvas.height - backgroundBlurJacketSize) * .5

    const { width, height } = this.jacketSize

    image.onload = () => {
      // Draw background blur jacket
      this.ctx.filter = 'blur(50px)'
      this.ctx.drawImage(image, dx2, dy2, backgroundBlurJacketSize, backgroundBlurJacketSize)

      // Draw front jacket
      this.ctx.filter = 'none'
      this.ctx.drawImage(image, 0, 0, image.width, image.height, dx, dy, width, height)

      this.insertText()
    }
  }

  insertText() {
    const { canvasSize } = this.state
    const { modeDoujin } = this.props.configure
    const { releaseStatus, releaseDate, artistName, title, notes } = this.props.configure.data

    const rightOffsetFromJacket = this.offsetFromRightEnd

    let dx = canvasSize.width - this.offsetFromRightEnd - this.jacketSize.width - rightOffsetFromJacket,
        dy = canvasSize.height * .5

    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'right'

    this.ctx.shadowColor = 'rgba(85, 85, 85, .2)'
    this.ctx.shadowBlur = 12

    if (artistName) {
      this.ctx.font = '21px Muli'
      this.ctx.textBaseline = 'bottom'
      this.ctx.fillText(artistName , dx, dy - 40)
    }

    if (title) {
      this.ctx.font = 'bold 36px Muli'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillText(title , dx, dy)
    }

    if (notes) {
      this.ctx.font = 'bold 18px Muli'
      this.ctx.textBaseline = 'top'
      this.ctx.fillText(notes , dx, dy + 40)
    }

    const isAvailable = (!!releaseStatus & releaseStatus !== 'not_available')

    if ((!modeDoujin && isAvailable) || (!modeDoujin && !isAvailable && releaseDate) || (modeDoujin && releaseDate)) {
      let releaseText

      if (!modeDoujin) {
        if (!isAvailable) {
          releaseText = `Available on ${releaseDate}`
        } else {
          releaseText = `OUT NOW`
        }
      } else {
        releaseText = releaseDate
      }

      this.ctx.font = 'bold 15px Muli'
      this.ctx.textBaseline = 'top'
      this.ctx.fillText(releaseText , dx, dy - ((40 * 2) + 21))
    }
  }

  render() {
    return (
      <div className="canvas">
        <div className="label">Tweet image</div>
        <canvas ref="preview_tweet_image" width={this.state.canvasSize.width} height={this.state.canvasSize.height} />
        <a onClick={this.handleDownload.bind(this)} href={this.state.downloadHref} className="button button-primary" download="tweet_image.png">Download</a>
      </div>
    )
  }
}

PreviewTweetImage.propTypes = {
  configure: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    configure: state.configure
  }
}

export default connect(
  mapStateToProps
)(PreviewTweetImage)
