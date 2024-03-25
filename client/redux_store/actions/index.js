import { SAVE_PRODUCTS, GET_PRODUCT } from "../actionTypes";

export const saveProducts = (products) => ({
  type: SAVE_PRODUCTS,
  payload: products,
});

export const getProduct = (productId) => ({
  type: GET_PRODUCT,
  payload: productId,
});
