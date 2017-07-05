import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '../actions/CounterActions'

class Counter extends Component {
  handleDecrement() {
    this.props.actions.decrement()
  }

  handleIncrement() {
    this.props.actions.increment()
  }

  handleIncrementAsync() {
    this.props.actions.incrementAsync()
  }

  render() {
    const { counter } = this.props

    return (
      <div>
        <div>{counter}</div>
        <div>
          <button onClick={() => {
            this.handleDecrement()
          }}>-</button>
          <button onClick={() => {
            this.handleIncrement()
          }}>+</button>
          <button onClick={() => {
            this.handleIncrementAsync()
          }}>+ Async</button>
        </div>
      </div>
    )
  }
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CounterActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
