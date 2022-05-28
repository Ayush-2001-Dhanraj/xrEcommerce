import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Userapi (token) {
  const [isLoggedIn, setIsLoggeddIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [cart, setCart] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/infor', {
            headers: { Authorization: token }
          })
          setIsLoggeddIn(true)
          res.data.role === 0 ? setIsAdmin(false) : setIsAdmin(true)
          setCart(res.data.cart)
        } catch (err) {
          alert(err.response.data.msg)
        }
      }
      getUser()
    }
  }, [token])

  const addCart = async product => {
    if (!isLoggedIn) return alert('Please Login to continue buying!')

    const check = cart.every(item => {
      return item._id !== product._id
    })

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }])

      await axios.patch(
        '/user/addCart',
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token }
        }
      )
    } else {
      alert('This product is added to the cart')
    }
  }

  return {
    isLogged: [isLoggedIn, setIsLoggeddIn],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory]
  }
}
