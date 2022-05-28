import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

export default function Btnrender ({ product, deleteProduct }) {
  const state = useContext(GlobalState)
  const [isAdmin] = state.userAPI.isAdmin
  const addCart = state.userAPI.addCart
  return (
    <div className='row_btn'>
      {isAdmin
        ? (
          <>
            <Link to='#1' id='btn_buy' onClick={() => deleteProduct(product._id, product.images.public_id)}>
              Delete
            </Link>
            <Link to={`/edit_product/${product._id}`} id='btn_view'>
              Edit
            </Link>
          </>
          )
        : (
          <>
            <Link to='#1' id='btn_buy' onClick={() => addCart(product)}>
              Buy
            </Link>
            <Link to={`/details/${product._id}`} id='btn_view'>
              View
            </Link>
          </>
          )}
    </div>
  )
}
