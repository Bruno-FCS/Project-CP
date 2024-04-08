import { LOGIN, LOGOUT, REGISTER_USER } from "../actionTypes";

const initialState = {
  users: [
    {
      id: 1,
      name: "John",
      email: "john@email.com",
      password: "123456",
    },
  ],
  loggedUser: {
    // id: 1,
    // name: "John",
    // email: "john@email.com",
    // password: "123456",
  },
  errorMessage: "Default",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      let existingUser = state.users.find(
        (user) => user.email == action.payload.email.toLowerCase()
      );

      if (action.payload.email == "" || action.payload.password == "") {
        return { ...state, errorMessage: "All fields must be filled!" };
      } else if (existingUser) {
        if (existingUser.password == action.payload.password) {
          return { ...state, loggedUser: existingUser, errorMessage: "" };
        } else {
          return { ...state, errorMessage: "Invalid password provided!" };
        }
      } else {
        return { ...state, errorMessage: "Invalid email provided!" };
      }
    }
    case LOGOUT: {
      return { ...state, loggedUser: {}, errorMessage: "Default" };
    }

    case REGISTER_USER: {
      let newUser = action.payload;
      let userCheck = state.users.find((user) => user.email == newUser.email);

      if (!userCheck) {
        console.log("user not found");
        return {
          ...state,
          users: [
            ...state.users,
            {
              id: Math.floor(Math.random * 4000), //generate a random 4 digit number as ID
              name: newUser.name,
              email: newUser.email,
              password: newUser.password,
            },
          ],
          errorMessage: "",
        };
      } else {
        console.log("user found");
        return {
          ...state,
          errorMessage: "Email/Password has already been used!",
        };
      }
    }
    default:
      return state;
  }
};

export default usersReducer;
