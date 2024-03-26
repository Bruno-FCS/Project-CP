import { LOGIN, LOGOUT } from "../actionTypes";

const initialState = {
  users: [],
  loggedUser: {
    id: 1,
    name: "John",
    email: "john@email.com",
    password: "123456",
  },
  errorMessage: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      let existingUser = users.find(
        (user) => user.email == action.payload.email
      );
      if (existingUser) {
        if (existingUser.password == action.payload.password) {
          return { ...state, loggedUser: existingUser, errorMessage: "" };
        } else {
          return { ...state, errorMessage: "Invalid email/password provided!" };
        }
      } else {
        return { ...state, errorMessage: "Invalid email/password provided!" };
      }
    }
    case LOGOUT: {
      return { ...state, loggedUser: {} };
    }
    default:
      return state;
  }
};

export default usersReducer;
