import React from 'react'

const CartContext = React.createContext({
  CartItem: [],
  addcartitemlist: () => {},
  increasecount: () => {},
  decreasecount: () => {},
  removeelementfromcart: () => {},
  removeallitem: () => {},
})

export default CartContext
