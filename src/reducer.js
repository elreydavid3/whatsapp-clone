export const initialState = {
  user: null,
  uid: null,
  togglerState: 1,
  photoURL: "",
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      //  console.log(action);
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
