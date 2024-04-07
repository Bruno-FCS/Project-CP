import {
  SAVE_PRODUCTS,
  INSERT_INTO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART
} from "../actionTypes";

const initialState = {
  products: [],
  cart: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PRODUCTS: {
      return { ...state, products: action.payload };
    }
    case INSERT_INTO_CART: {
      let item = state.cart.find((item) => item.id == action.payload.id);
      let itemQuantity = item ? item.quantity : 0;
      if (item) {
        return {
          ...state,
          cart: [
            ...state.cart.filter((cartItem) => cartItem != item),
            { ...item, quantity: itemQuantity + action.payload.quantity },
          ],
        };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    }
    case REMOVE_FROM_CART: {
      return {...state, cart: state.cart.filter((item) => item.id !== action.payload)};
    }
    case EMPTY_CART:{
      return{...state, cart:[]}
    }
    default:
      return state;
  }
};

export default productsReducer;