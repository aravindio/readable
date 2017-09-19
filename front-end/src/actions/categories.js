import * as API from '../utils/api'

export const SET_CATEGORIES = 'SET_CATEGORIES'

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  API
    .getCategories()
    .then(categories => dispatch(setCategories(categories)))
)