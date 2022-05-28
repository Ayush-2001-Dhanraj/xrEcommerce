import React, { useState, useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

export default function Categories (props) {
  const state = useContext(GlobalState)
  const [categories] = state.CategoryAPI.categories
  const [callback, setCallback] = state.CategoryAPI.callback
  const [token] = state.token
  const [category, setCategory] = useState('')
  const [Id, setId] = useState('')
  const [onEdit, setOnEdit] = useState('')

  const createCategory = async e => {
    e.preventDefault()
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${Id}`,
          { name: category },
          {
            headers: { Authorization: token }
          }
        )
        alert(res.data.msg)
      } else {
        const res = await axios.post(
          '/api/category',
          { name: category },
          {
            headers: { Authorization: token }
          }
        )
        alert(res.data.msg)
      }
      setOnEdit(false)
      setCallback(!callback)
      setCategory('')
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const editCategory = async (id, name) => {
    setId(id)
    setCategory(name)
    setOnEdit(true)
  }

  const deleteCategory = async id => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token }
      })
      alert(res.data.msg)
      setCallback(!callback)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div className='categories'>
      <form onSubmit={createCategory}>
        <label htmlFor='category'>Category</label>
        <input
          type='text'
          name='category'
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />

        <button type='submit'>{onEdit ? 'Update' : 'Create'}</button>
      </form>

      <div className='col'>
        {categories.map(category => (
          <div className='row' key={category._id}>
            <p>{category.name}</p>
            <div>
              <button onClick={() => editCategory(category._id, category.name)}>
                Edit
              </button>
              <button onClick={() => deleteCategory(category._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
