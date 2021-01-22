// initial state, declared as object
export const initialState = {
  todoItems: [],
  showAlert: false,
};

// reducer function taking in state and action parameters
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // evaluates if the payload is for ADD or EDIT
      // '.toEdit' is in the payload with boolean value
      if (action.payload.toEdit) {
        return {
          ...state,
          todoItems: state.todoItems.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, title: action.payload.title };
            }
            return item;
          }),
        };
      }
      // if '.toEdit' in payload is false, new item is created
      const newItems = [...state.todoItems, action.payload];
      return {
        ...state,
        todoItems: newItems,
      };

    case 'DELETE':
      const filteredItems = state.todoItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        todoItems: filteredItems,
      };

    case 'CLEAR_ALL':
      return {
        ...state,
        todoItems: [],
      };
    default:
      return state;
  }
};
export default reducer;
