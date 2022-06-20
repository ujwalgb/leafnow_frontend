const intialState = {
  user: null,
  cart: [],
  cart_popup: false,
};

export default function AppReducer(state = intialState, action) {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }

    case "SET_CART_POPUP": {
      return {
        ...state,
        cart_popup: action.cart_popup,
      };
    }

    case "ADD_TO_CART": {
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    }

    case "SET_CART": {
      return {
        ...state,
        cart: action.cart,
      };
    }

    case "REMOVE_FROM_CART": {
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.item_id
      );

      let newBasket = [...state.cart];

      if (index >= 0) {
        newBasket.splice(index, 1);
      }

      return {
        ...state,
        cart: newBasket,
      };
    }
    default:
      return state;
  }
}
