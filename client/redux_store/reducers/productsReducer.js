import {
  SAVE_PRODUCTS,
  INSERT_INTO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
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
          ].sort((a, b) => a.id - b.id),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload].sort((a, b) => a.id - b.id),
        };
      }
    }
    case INCREASE_QUANTITY: {
      let item = state.cart.find((item) => item.id == action.payload);
      return {
        ...state,
        cart: [
          ...state.cart.filter((item) => item.id != action.payload),
          { ...item, quantity: item.quantity + 1 },
        ].sort((a, b) => a.id - b.id),
      };
    }
    case DECREASE_QUANTITY: {
      let item = state.cart.find((item) => item.id == action.payload);
      let newQuantity = item.quantity - 1;
      if (newQuantity == 0) {
        return {
          ...state,
          cart: [
            ...state.cart.filter((item) => item.id != action.payload),
          ].sort((a, b) => a.id - b.id),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart.filter((item) => item.id != action.payload),
          { ...item, quantity: newQuantity },
        ].sort((a, b) => a.id - b.id),
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case EMPTY_CART: {
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
};

export default productsReducer;
