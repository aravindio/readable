import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import uuid from 'uuid'
import { submitPost, fetchPost, editPost, clearPostToEdit } from '../actions'

class PostForm extends Component {
  componentWillMount() {
    const { fetchPost, match } = this.props
    const { id } = match.params
    if (this.isEditMode() && id)
      fetchPost(id)
  }

  componentWillReceiveProps(nextProps) {
    const { postToEdit } = nextProps
    if (postToEdit) {
      this.titleInput.value = postToEdit.title
      this.bodyInput.value = postToEdit.body
    }
  }

  componentWillUnmount() {
    this.props.clearPostToEdit()
  }

  isEditMode = () => {
    const { pathname } = this.props.location
    const regEx = /\/(.*?)\//ig
    const type = pathname.match(regEx)[0].slice(1, -1)
    return type === 'edit'
  }

  getIdAndTimestamp = () => ({
    id: uuid().replace(/-/g, '').slice(0, 20),
    timestamp: Date.now()
  })

  categoryExists = () => {
    const { category } = this.props.match.params
    let { categories } = this.props
    categories = categories.map(c => c.path)
    return categories.indexOf(category) !== -1
  }

  setDefaults = (formData, edit) => {
    formData.title = formData.title || 'Empty title'
    formData.body = formData.body || 'Empty post'
    if (this.categoryExists())
      formData.category = this.props.match.params.category
    else
      if (!edit)
        formData.category = 'react'
    return formData
  }

  onFormSubmit = e => {
    e.preventDefault()
    const { submitPost, history, postToEdit, editPost } = this.props
    const formData = serializeForm(e.target, { hash: true })
    if (!this.isEditMode()) {
      formData.author = formData.author || 'nobody'
      submitPost(
        Object.assign(
          formData,
          this.setDefaults(formData),
          this.getIdAndTimestamp()
        )
      )
      history.push('/')
    } else {
      editPost(postToEdit.id, Object.assign(
        formData,
        this.setDefaults(formData, true)
      ))
      history.goBack()
    }
  }

  render() {
    const { categories, match } = this.props
    const { category } = match.params
    const editMode = this.isEditMode()
    return (
      <div className='container'>
        <div className='inner-container'>
          <h3>
            <b>{!editMode ? 'Add post' : 'Edit post' }</b>
          </h3>
          <form onSubmit={this.onFormSubmit}>
            <label>Title</label>
            <input
              className='form-control'
              type='text'
              name='title'
              ref={i => this.titleInput = i}
            />
            {!editMode && (
              <div>
                <label>Author</label>
                <input
                  className='form-control'
                  type='text'
                  name='author'
                />
                {!category && (
                  <div>
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
                  </div>
                )}
              </div>
            )}
            <label>Post</label>
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
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }) {
  const postToEdit = posts.postToEdit
  return { categories, postToEdit }
}

function mapDispatchToProps (dispatch) {
  return {
    submitPost: data => dispatch(submitPost(data)),
    fetchPost: id => dispatch(fetchPost(id)),
    editPost: (id, data) => dispatch(editPost(id, data)),
    clearPostToEdit: () => dispatch(clearPostToEdit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)