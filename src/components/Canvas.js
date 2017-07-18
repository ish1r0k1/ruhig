import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class Canvas extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    jacketSize: PropTypes.number.isRequired,
    offsetEdge: PropTypes.number.isRequired,
    offsetJacket: PropTypes.number.isRequired,
    fontSizes: PropTypes.shape({
      small: PropTypes.number.isRequired,
      normal: PropTypes.number.isRequired,
      large: PropTypes.number.isRequired,
      larger: PropTypes.number.isRequired
    }),
    refName: PropTypes.string.isRequired,
    configure: PropTypes.object.isRequired,
    information: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { downloadHref: '#' }

    this.handleDownload = this.handleDownload.bind(this)
  }

  componentDidMount() {
    const { refName } = this.props

    this.canvas = ReactDOM.findDOMNode(this.refs[refName])
    this.ctx = this.canvas.getContext('2d')

    this.initCanvas()
  }

  componentDidUpdate() {
    this.initCanvas()
    this.drawCanvas()
  }

  handleDownload() {
    let dataUrl = this.canvas.toDataURL('image/png')

    this.setState({ downloadHref: dataUrl })
  }

  drawCanvas() {
    const { jacketSrc } = this.props.information

    if (jacketSrc) {
      this.insertJacket()
    } else {
      this.insertText()
    }
  }

  initCanvas() {
    const { width, height } = this.props

    // fill the canvas to black
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, width, height)
  }

  insertJacket() {
    const { width, height, jacketSize, offsetEdge } = this.props
    const { jacketSrc } = this.props.information

    const image = new Image()
    image.src = jacketSrc

    const backgroundBlurJacketScale = 1.133333
    const backgroundBlurJacketSize = width * backgroundBlurJacketScale

    let dx = width - offsetEdge - jacketSize
    let dy = (height - jacketSize) * .5
    let dx2 = (width - backgroundBlurJacketSize) * .5
    let dy2 = (height - backgroundBlurJacketSize) * .5

    image.onload = () => {
      // Draw background blur jacket
      this.ctx.filter = 'blur(50px)'
      this.ctx.drawImage(image, dx2, dy2, backgroundBlurJacketSize, backgroundBlurJacketSize)

      // Draw front jacket
      this.ctx.filter = 'none'
      this.ctx.drawImage(image, 0, 0, image.width, image.height, dx, dy, jacketSize, jacketSize)

      this.insertText()
    }
  }

  insertText() {
    const { width, height, jacketSize, offsetEdge, offsetJacket, fontSizes } = this.props
    const { doujinMode } = this.props.configure
    const { releaseStatus, releaseDate, artistName, title, notes } = this.props.information

    let dx = width - offsetEdge - jacketSize - offsetJacket
    const dy = height * .5

    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'right'

    this.ctx.shadowColor = 'rgba(85, 85, 85, .2)'
    this.ctx.shadowBlur = 12

    if (artistName) {
      this.ctx.font = `${fontSizes.large}px Muli`
      this.ctx.textBaseline = 'bottom'
      this.ctx.fillText(artistName, dx, dy - fontSizes.larger)
    }

    if (title) {
      this.ctx.font = `bold ${fontSizes.larger}px Muli`
      this.ctx.textBaseline = 'middle'
      this.ctx.fillText(title, dx, dy)
    }

    if (notes) {
      this.ctx.font = `${fontSizes.normal}px Muli`
      this.ctx.textBaseline = 'top'
      this.ctx.fillText(notes, dx, dy + fontSizes.larger)
    }

    const isAvailable = (!!releaseStatus & releaseStatus !== 'not_available')

    if ((!doujinMode && isAvailable) || (!doujinMode && !isAvailable && releaseDate) || (doujinMode && releaseDate)) {
      let releaseText

      if (!doujinMode) {
        if (!isAvailable) {
          releaseText = `Available on ${releaseDate}`
        } else {
          releaseText = `OUT NOW`
        }
      } else {
        releaseText = releaseDate
      }

      this.ctx.font = `bold ${fontSizes.small}px Muli`
      this.ctx.textBaseline = 'top'
      this.ctx.fillText(releaseText, dx, dy - (fontSizes.larger * 3))
    }
  }

  render() {
    const { width, height, refName } = this.props

    return (
      <div>
        <canvas ref={refName} width={width} height={height} />
        <a onClick={this.handleDownload} href={this.state.downloadHref} className="button button-primary" download={`${refName}.png`}>Download</a>
      </div>
    )
  }
}

export default Canvas
