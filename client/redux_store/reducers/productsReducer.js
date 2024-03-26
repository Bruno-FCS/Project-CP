import {
  SAVE_PRODUCTS,
  INSERT_INTO_CART,
  REMOVE_FROM_CART,
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
      console.log(state.cart);
      if (item) {
        return {
          ...state,
          cart: [
            ...state.cart,
            { ...item, quantity: item.quantity + action.payload.quantity },
          ],
        };
        item.quantity += action.payload.quantity;
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    }
    case REMOVE_FROM_CART: {
      return state;
    }
    default:
      return state;
  }
};

export default productsReducer;
