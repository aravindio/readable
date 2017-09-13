import React, { Component } from 'react'

class CommentForm extends Component {
  render() {
    return (
      <div className='inner-container'>
        <h4><b>Add comment</b></h4>
        <form>
          <label>Name</label>
          <input
            className='form-control'
            type='text'
            name='author'
          />
          <label>Comment</label>
          <textarea
            className='form-control'
            name='body'
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

export default CommentForm