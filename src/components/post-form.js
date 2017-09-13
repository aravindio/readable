import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import uuid from 'uuid'
import { submitPost } from '../actions'

class PostForm extends Component {
  onFormSubmit = e => {
    e.preventDefault()

    const { submitPost, history } = this.props
    const formData = serializeForm(e.target, { hash: true })
    formData.id = uuid().replace(/-/g, '').slice(0, 20)
    formData.timestamp = Date.now()
    formData.title = formData.title || 'Empty title'
    formData.author = formData.author || 'nobody'
    formData.body = formData.body || 'Empty post'
    submitPost(formData)
    history.push('/')
  }

  render() {
    const { categories } = this.props
    return (
      <div className='container'>
        <div className='inner-container'>
          <h3><b>Add post</b></h3>
          <form onSubmit={this.onFormSubmit}>
            <label>Title</label>
            <input
              className='form-control'
              type='text'
              name='title'
            />
            <label>Author</label>
            <input
              className='form-control'
              type='text'
              name='author'
            />
            <label>Category</label><br/>
            <select name='category'>
              {categories && categories.map(c => (
                <option
                  key={c.path}
                  value={c.path}
                >
                  {c.name}
                </option>
              ))}
            </select>
            <br/>
            <label>Post</label>
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
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

function mapDispatchToProps (dispatch) {
  return {
    submitPost: data => dispatch(submitPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)