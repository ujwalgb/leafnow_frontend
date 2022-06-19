const intialState = {
  user: null,
};

export default function AppReducer(state = intialState, action) {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      return state;
  }
}
