import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import uuid from 'uuid'
import { submitComment, editComment, clearCommentToEdit } from '../actions'

class CommentForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.commentToEdit)
      this.bodyInput.value = nextProps.commentToEdit.body
  }

  getIdAndTimestamp = id => ({
    id: id || uuid().replace(/-/g, '').slice(0, 20),
    timestamp: Date.now()
  })

  clearInputs = (clearName, clearBody) => {
    if (clearName)
      this.nameInput.value = ''
    if (clearBody)
      this.bodyInput.value = ''
  }

  onCancelClick = e => {
    e.preventDefault()
    this.clearInputs(false, true)
    this.props.clearCommentToEdit()
  }

  componentWillUnmount() {
    this.props.clearCommentToEdit()
  }

  onFormSubmit = e => {
    e.preventDefault()
    const {
      submitComment,
      commentToEdit,
      editComment,
      clearCommentToEdit,
      postId
    } = this.props
    const formData = serializeForm(e.target, { hash: true })
    if (!commentToEdit) {
      formData.author = formData.author || 'no-author'
      formData.body = formData.body || 'Empty comment'
      formData.parentId = postId
      submitComment(Object.assign(formData, this.getIdAndTimestamp()))
      this.clearInputs(true, true)
    } else {
      const id = commentToEdit.id
      formData.body = formData.body || 'Empty comment'
      formData.timestamp = Date.now()
      editComment(id, Object.assign(
        formData,
        this.getIdAndTimestamp(id)
      ))
      this.clearInputs(false, true)
      clearCommentToEdit()
    }
  }

  render() {
    const { commentToEdit } = this.props
    return (
      <div className='inner-container'>
        <h4>
          <b>{!commentToEdit ? 'Add comment' : 'Edit comment' }</b>
        </h4>
        <form onSubmit={this.onFormSubmit}>
          {!commentToEdit && (
            <div>
              <label>Name</label>
              <input
                className='form-control'
                type='text'
                name='author'
                ref={i => this.nameInput = i}
              />
            </div>
          )}
          <label>Comment</label>
          <textarea
            className='form-control'
            name='body'
            ref={t => this.bodyInput = t}
          >
          </textarea>
          <button className='btn btn-primary' type='submit'>
            {!commentToEdit ? 'Submit' : 'Update' }
          </button>
          {commentToEdit && (
            <button className='btn btn-default' onClick={this.onCancelClick}>
              Cancel
            </button>
          )}
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {
    commentToEdit: comments.commentToEdit
  }
}

function mapDispatchToProps (dispatch) {
  return {
    submitComment: data => dispatch(submitComment(data)),
    editComment: (id, comment) => dispatch(editComment(id, comment)),
    clearCommentToEdit: () => dispatch(clearCommentToEdit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)