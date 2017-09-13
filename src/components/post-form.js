import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostForm extends Component {
  render() {
    const { categories } = this.props
    return (
      <div className='container'>
        <div className='inner-container'>
          <h3><b>Add post</b></h3>
          <form>
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
            <button className='btn btn-primary' type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(PostForm)