import {
  SAVE_PRODUCTS,
  GET_PRODUCT,
  INSERT_INTO_CART,
  REMOVE_FROM_CART,
} from "../actionTypes";

export const saveProducts = (products) => ({
  type: SAVE_PRODUCTS,
  payload: products,
});

export const getProduct = (productId) => ({
  type: GET_PRODUCT,
  payload: productId,
});

export const insertIntoCart = (product) => ({
  type: INSERT_INTO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
