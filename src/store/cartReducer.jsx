
import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART, RESET_CART } from './cartActions';

const initialState = {
  items: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    case CLEAR_CART:
      return {
        ...state,
        items: []
      };
      case RESET_CART: 
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
};

export default cartReducer;
