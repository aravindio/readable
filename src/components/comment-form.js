import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import uuid from 'uuid'
import { submitComment } from '../actions'

class CommentForm extends Component {
  getIdAndTimestamp = () => ({
    id: uuid().replace(/-/g, '').slice(0, 20),
    timestamp: Date.now()
  })

  clearInputs = () => {
    this.nameInput.value = ''
    this.bodyInput.value = ''
  }

  onFormSubmit = e => {
    e.preventDefault()
    const { submitComment, postId } = this.props
    const formData = serializeForm(e.target, { hash: true })
    formData.author = formData.author || 'no-author'
    formData.body = formData.body || 'Empty comment'
    formData.parentId = postId
    submitComment(Object.assign(formData, this.getIdAndTimestamp()))
    this.clearInputs()
  }

  render() {
    return (
      <div className='inner-container'>
        <h4><b>Add comment</b></h4>
        <form onSubmit={this.onFormSubmit}>
          <label>Name</label>
          <input
            className='form-control'
            type='text'
            name='author'
            ref={i => this.nameInput = i}
          />
          <label>Comment</label>
          <textarea
            className='form-control'
            name='body'
            ref={t => this.bodyInput = t}
          >
          </textarea>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    submitComment: data => dispatch(submitComment(data))
  }
}

export default connect(null, mapDispatchToProps)(CommentForm)