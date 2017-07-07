import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ConfigureActions from '../actions/ConfigureActions'

class ConfigureForm extends Component {
  constructor(props) {
    super(props)
    this.state = { release_status: 'not_available' }
  }

  handleChangeMode(evt) {
    const { configure, actions } = this.props

    if ( !configure.modeDoujin ) {
      actions.enableDoujinMode()
    } else {
      actions.disableDoujinMode()
    }
  }

  handleChangeData() {
    const { actions } = this.props
    const { release_status } = this.state

    const releaseDate = ReactDOM.findDOMNode(this.refs.release_date).value.trim(),
          artistName  = ReactDOM.findDOMNode(this.refs.artist_name).value.trim(),
          title       = ReactDOM.findDOMNode(this.refs.title).value.trim(),
          notes       = ReactDOM.findDOMNode(this.refs.notes).value.trim()

    const dataObject = Object.assign({}, { releaseStatus: release_status }, { releaseDate, artistName, title, notes })

    actions.updateData(dataObject)
  }

  handleChangeFile(e) {
    const file = e.target.files
    const { actions } = this.props

    const fr = new FileReader()
    fr.onload = () => {
      actions.updateJacketData(fr.result)
    }
    fr.readAsDataURL(file[0])
  }

  render() {
    const { modeDoujin } = this.props.configure
    const { release_status } = this.state

    return (
      <form onSubmit={e => {
        e.preventDefault()
        this.handleSubmit()
      }}>
        <div>
          <div className="label">Mode:</div>
          <label>
            <input type="checkbox"
              checked={modeDoujin ? 'on' : ''}
              onChange={this.handleChangeMode.bind(this)}
            />
            <div className="label-body">for Doujin</div>
          </label>
        </div>
        <div style={{ 'opacity': (!modeDoujin ? '1' : '.4') }}>
          <div className="label">Release status:</div>
          <div className="row">
            <div className="columns six">
              <label>
                <input type="radio" name="release_status"
                  checked={release_status === 'not_available'}
                  disabled={modeDoujin}
                  onChange={() => {
                    this.setState({ release_status: 'not_available' }, () => {
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
                  checked={release_status === 'available'}
                  disabled={modeDoujin}
                  onChange={() => {
                    this.setState({ release_status: 'available' }, () => {
                      this.handleChangeData()
                    })
                  }}
                />
                <span className="label-body">Out now</span>
              </label>
            </div>
          </div>
        </div>
        <div style={{ 'opacity': ((release_status !== 'available' || modeDoujin) ? '1' : '.4') }}>
          <label>{ !modeDoujin ? 'Release date/market' : 'Event' }:</label>
          <input className="u-full-width" type="text" ref="release_date"
            disabled={!(release_status !== 'available' || modeDoujin)}
            onChange={this.handleChangeData.bind(this)}
          />
        </div>
        <div>
          <label>{ !modeDoujin ? 'Artist name' : 'Circle' }:</label>
          <input className="u-full-width" type="text" ref="artist_name"
            onChange={this.handleChangeData.bind(this)}
          />
        </div>
        <div>
          <label>Title:</label>
          <input className="u-full-width" type="text" ref="title"
            onChange={this.handleChangeData.bind(this)}
          />
        </div>
        <div>
          <label>Notes:</label>
          <input className="u-full-width" type="text" ref="notes"
            onChange={this.handleChangeData.bind(this)}
          />
        </div>
        <div>
          <label>Jacket:</label>
          <input className="u-full-width" accept="image/*" type="file" ref="jacket"
            onChange={this.handleChangeFile.bind(this)}
          />
        </div>
      </form>
    )
  }
}

ConfigureForm.propTypes = {
  configure: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    configure: state.configure
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ConfigureActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigureForm)
