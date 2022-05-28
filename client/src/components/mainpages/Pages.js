import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import Products from './products/Products'
import Detailproduct from './detailProduct/DetailProduct'
import NotFound from './utils/not_found/NotFound'
import { GlobalState } from '../../GlobalState'
import Orderhistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Categories from './categories/Categories'
import Createproduct from './createProduct/CreateProduct'

export default function Pages (props) {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin
  return (
    <Switch>
      <Route path='/' exact component={Products} />
      <Route path='/details/:id' exact component={Detailproduct} />
      <Route path='/login' exact component={isLogged ? NotFound : Login} />
      <Route path='/register' exact component={isLogged ? NotFound : Register} />
      <Route path='/category' exact component={isAdmin ? Categories : NotFound} />
      <Route path='/create_product' exact component={isAdmin ? Createproduct : NotFound} />
      <Route path='/edit_product/:id' exact component={isAdmin ? Createproduct : NotFound} />
      <Route path='/history' exact component={isLogged ? Orderhistory : NotFound} />
      <Route path='/history/:id' exact component={isLogged ? OrderDetails : NotFound} />
      <Route path='/cart' exact component={Cart} />
      <Route path='*' exact component={NotFound} />
    </Switch>
  )
}
