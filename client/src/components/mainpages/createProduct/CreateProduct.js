import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: '',
  content: '',
  category: '',
  _id: ''
}

export default function Createproduct (props) {
  const state = useContext(GlobalState)
  const [product, setProduct] = useState(initialState)
  const [categories] = state.CategoryAPI.categories
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)

  const [isAdmin] = state.userAPI.isAdmin
  const [callback, setCallback] = state.ProductsAPI.callback

  const [token] = state.token

  const history = useHistory()

  const handleUpload = async e => {
    e.preventDefault()
    try {
      if (!isAdmin) return alert("You're not an admin ")

      const file = e.target.files[0]

      if (!file) return alert('File not exists')

      if (file.size > 1024 * 1024) return alert('Size too large')

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') { return alert('File format is incorrect') }

      const formData = new FormData()
      formData.append('file', file)

      setLoading(true)

      const res = await axios.post('/api/upload', formData, {
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
      })

      setLoading(false)
      setImages(res.data)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin ")

      setLoading(true)
      await axios.post(
        '/api/destroy',
        { public_id: images.public_id },
        {
          headers: { Authorization: token }
        }
      )

      setLoading(false)
      setImages(false)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const [products] = state.ProductsAPI.products
  const [onEdit, setOnEdit] = useState(false)
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      setOnEdit(true)
      products.forEach(product => {
        if (product._id === params.id) {
          setProduct(product)
          setImages(product.images)
        }
      })
    } else {
      setOnEdit(false)
      setProduct(initialState)
      setImages()
    }
  }, [params.id, products])

  const handleChangeInput = e => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (!isAdmin) return alert('You aren\'t an admin')
      if (!images) return alert('No Image uploaded')

      if (onEdit) {
        await axios.put(`/api/products/${product._id}`, { ...product, images }, {
          headers: { Authorization: token }
        })
      } else {
        await axios.post('/api/products', { ...product, images }, {
          headers: { Authorization: token }
        })
      }

      setCallback(!callback)
      history.push('/')
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const styleUpload = {
    display: images ? 'block' : 'none'
  }

  return (
    <div className='create_product'>
      <div className='upload'>
        <input type='file' name='file' id='file_up' onChange={handleUpload} />
        {loading
          ? (
            <div id='file_img'>
              <Loading />
            </div>
            )
          : (
            <div id='file_img' style={styleUpload}>
              <img src={images ? images.url : ''} alt='' />
              <span onClick={handleDestroy}>X</span>
            </div>
            )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label htmlFor='product_id'>Product ID</label>
          <input
            type='text'
            name='product_id'
            id='product_id'
            required
            value={product.product_id}
            disabled={onEdit}
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            name='price'
            id='price'
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='description'>Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            required
            value={product.description}
            onChange={handleChangeInput}
            rows='5'
          />
        </div>

        <div className='row'>
          <label htmlFor='content'>Content</label>
          <textarea
            type='text'
            name='content'
            id='content'
            required
            value={product.content}
            onChange={handleChangeInput}
            rows='7'
          />
        </div>

        <div className='row'>
          <label htmlFor='categories'>Categories: </label>
          <select name='category' value={product.category} onChange={handleChangeInput}>
            <option value=''>Please select a category</option>
            {categories.map(category => {
              return (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              )
            })}
          </select>
        </div>

        <button type='submit'>{onEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  )
}