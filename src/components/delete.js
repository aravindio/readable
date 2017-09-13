import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePost } from '../actions'
import Back from 'react-icons/lib/fa/angle-double-left'


class Delete extends Component {
  onDeleteClick = id => {
    const { deletePost, history } = this.props
    deletePost(id)
    history.push('/')
  }

  render() {
    const { history, match } = this.props
    const { id } = match.params
    return (
      <div className='container'>
        <div className='text-center inner-container'>
          <h3>
            <b>Are you sure you want to delete this post?</b>
          </h3>
          <button
            className='btn btn-default'
            onClick={() => this.onDeleteClick(id)}
          >
            Yes
          </button>
          <button
            className='btn btn-primary'
            onClick={() => history.goBack()}
          >
            <Back /> No, go back
          </button>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: id => dispatch(deletePost(id))
  }
}

export default connect(null, mapDispatchToProps)(Delete)