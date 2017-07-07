import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

class PreviewOGImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      downloadHref: '#',
      canvasSize: {
        width: 1200,
        height: 630
      }
    }
  }

  componentDidMount() {
    const { canvasSize } = this.state

    this.jacketSize = {
      width: 428,
      height: 428
    }

    this.offsetFromRightEnd = 87

    this.canvas = ReactDOM.findDOMNode(this.refs.preview_og_image)
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
      this.ctx.font = '28px Muli'
      this.ctx.textBaseline = 'bottom'
      this.ctx.fillText(artistName , dx, dy - 48)
    }

    if (title) {
      this.ctx.font = 'bold 48px Muli'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillText(title , dx, dy)
    }

    if (notes) {
      this.ctx.font = 'bold 20px Muli'
      this.ctx.textBaseline = 'top'
      this.ctx.fillText(notes , dx, dy + 48)
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

      this.ctx.font = 'bold 18px Muli'
      this.ctx.textBaseline = 'top'
      this.ctx.fillText(releaseText , dx, dy - (48 * 3))
    }
  }

  render() {
    return (
      <div className="canvas">
        <div className="label">OG image</div>
        <canvas ref="preview_og_image" width={this.state.canvasSize.width} height={this.state.canvasSize.height} />
        <a onClick={this.handleDownload.bind(this)} href={this.state.downloadHref} className="button button-primary" download="og_image.png">Download</a>
      </div>
    )
  }
}

PreviewOGImage.propTypes = {
  configure: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    configure: state.configure
  }
}

export default connect(
  mapStateToProps
)(PreviewOGImage)
