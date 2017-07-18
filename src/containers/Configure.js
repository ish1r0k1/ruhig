import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

class Configure extends Component {
  static propTypes = {
    configure: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { releaseStatus: 'not_available' }

    this.handleChangeData = this.handleChangeData.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
  }

  handleChangeData() {
    const { actions } = this.props
    const { releaseStatus } = this.state

    const releaseDate = ReactDOM.findDOMNode(this.refs.release_date).value.trim()
    const artistName = ReactDOM.findDOMNode(this.refs.artist_name).value.trim()
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim()
    const notes = ReactDOM.findDOMNode(this.refs.notes).value.trim()

    actions.updateText(releaseStatus, releaseDate, artistName, title, notes)
  }

  handleChangeFile(e) {
    const file = e.target.files
    const { actions } = this.props

    const fr = new FileReader()
    fr.onload = () => {
      actions.updateJacket(fr.result)
    }
    fr.readAsDataURL(file[0])
  }

  render() {
    const { configure, actions } = this.props
    const { releaseStatus } = this.state
    const disabledOpacity = .4

    return (
      <form>
        <div>
          <div className="label">Mode:</div>
          <label>
            <input type="checkbox"
              checked={configure.doujinMode}
              onChange={() => {
                if (!configure.doujinMode) {
                  actions.enableDoujinMode()
                } else {
                  actions.disableDoujinMode()
                }
              }}
            />
            <div className="label-body">for Doujin</div>
          </label>
        </div>

        <div style={{ opacity: (!configure.doujinMode ? 1 : disabledOpacity) }}>
          <div className="label">Release status:</div>
          <div className="row">
            <div className="columns six">
              <label>
                <input type="radio" name="release_status"
                  checked={releaseStatus === 'not_available'}
                  disabled={configure.doujinMode}
                  onChange={() => {
                    this.setState({ releaseStatus: 'not_available' }, () => {
                      this.handleChangeData()
                    })
                  }}
                />
                <span className="label-body">Available on</span>
              </label>
            </div>
            <div className="columns six">
              <label>
                <input type="radio" name="release_status"
                  checked={releaseStatus === 'available'}
                  disabled={configure.doujinMode}
                  onChange={() => {
                    this.setState({ releaseStatus: 'available' }, () => {
                      this.handleChangeData()
                    })
                  }}
                />
                <span className="label-body">Out now</span>
              </label>
            </div>
          </div>
        </div>

        <div style={{ 'opacity': ((releaseStatus !== 'available' || configure.doujinMode) ? 1 : disabledOpacity) }}>
          <label>{ !configure.doujinMode ? 'Release date/market' : 'Event' }:</label>
          <input className="u-full-width" type="text" ref="release_date"
            disabled={!(releaseStatus !== 'available' || configure.doujinMode)}
            onChange={this.handleChangeData}
          />
        </div>

        <div>
          <label>{ !configure.doujinMode ? 'Artist name' : 'Circle' }:</label>
          <input className="u-full-width" type="text" ref="artist_name"
            onChange={this.handleChangeData}
          />
        </div>

        <div>
          <label>Title:</label>
          <input className="u-full-width" type="text" ref="title"
            onChange={this.handleChangeData}
          />
        </div>

        <div>
          <label>Notes:</label>
          <input className="u-full-width" type="text" ref="notes"
            onChange={this.handleChangeData}
          />
        </div>

        <div>
          <label>Jacket:</label>
          <input className="u-full-width" accept="image/*" type="file" ref="jacket"
            onChange={this.handleChangeFile}
          />
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  configure: state.configure
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configure)
