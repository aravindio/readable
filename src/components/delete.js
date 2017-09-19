import React, { Component } from 'react'
import { connect } from 'react-redux'
import Back from 'react-icons/lib/fa/angle-double-left'
import { deletePost, deleteComment } from '../actions'


class Delete extends Component {
  onDeleteClick = id => {
    const { deletePost, deleteComment, history } = this.props
    const { type } = this.props.match.params
    if (type === 'post') {
      deletePost(id)
      history.push('/')
    } else if (type === 'comment') {
      deleteComment(id)
      history.goBack()
    }
  }

  render() {
    const { history, match } = this.props
    const { id, type } = match.params
    return (
      <div className='container'>
        <div className='text-center inner-container'>
          <h3>
            <b>Are you sure you want to delete this {type}?</b>
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
    deletePost: id => dispatch(deletePost(id)),
    deleteComment: id => dispatch(deleteComment(id))
  }
}

export default connect(null, mapDispatchToProps)(Delete)