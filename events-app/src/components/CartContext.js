import React, { createContext, useReducer } from 'react';

const initialState = {
  items: [],
  itemCount: 0,
};

const CartContext = createContext(initialState);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        itemCount: state.itemCount + 1,
      };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return (
    <CartContext.Provider value={{ cartItems: state.items, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
