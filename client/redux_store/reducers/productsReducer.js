import { SAVE_PRODUCTS, GET_PRODUCT } from "../actionTypes";

const initialState = {
  products: [],
  selectedProduct: {},
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PRODUCTS: {
      return { ...state, products: action.payload };
    }
    case GET_PRODUCT: {
      return {
        ...state,
        selectedProduct: state.products.filter(
          (product) => product.id == action.payload
        ),
      };
    }
    default:
      return state;
  }
};

export default productsReducer;
