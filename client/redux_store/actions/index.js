import {
  SAVE_PRODUCTS,
  GET_PRODUCT,
  INSERT_INTO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  LOGIN,
  LOGOUT,
  REGISTER_USER
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

export const emptyCart = () =>({
  type: EMPTY_CART,
})

export const login = (userInfo) => ({
  type: LOGIN,
  payload: userInfo,
});

export const logout = () => ({
  type: LOGOUT,
});

export const registerUser = (userInfo) => ({
  type: REGISTER_USER,
  payload: userInfo
});