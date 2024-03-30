import { LOGIN, LOGOUT, REGISTER_USER } from "../actionTypes";

const initialState = {
  users: [
    {
      id: 1,
      name: "John",
      email: "john@email.com",
      password: "123456",
    }

  ],
  loggedUser: {
    // id: 1,
    // name: "John",
    // email: "john@email.com",
    // password: "123456",
  },
  errorMessage: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      let existingUser = state.users.find(
        (user) => user.email == action.payload.email
      );

      if (existingUser) {
        if (existingUser.password == action.payload.password) {
          return { ...state, loggedUser: existingUser, errorMessage: "" };
        } 
        else {
          return { ...state, errorMessage: "Invalid email/password provided!" };
        }
      } 
      else {
        return {...state, errorMessage: "Invalid email/password provided!"};
      }
      
    }
    case LOGOUT: {
      return { ...state, loggedUser: {} };
    }

    case REGISTER_USER: {
      let newUser = action.payload
      let userCheck = state.users.find((user) => user.email == newUser.email)
      if (!userCheck){
        console.log("user not found")
        return {...state, users: [{
                              id: (Math.floor(Math.random * 4000)), //generate a random 4 digit number as ID
                              name: newUser.name,
                              email: newUser.email,
                              password: newUser.password
                            }]
        }
      }
      else {
        console.log("user found")
        return {...state, errorMessage: "Email/Passowrd has already been used!"}
      }

     
    }

    default:
      return state;
  }
};

export default usersReducer;
