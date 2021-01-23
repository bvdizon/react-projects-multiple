// initial state, declared as object
export const initialState = {
  todoItems: [{ id: 1234, title: 'hello there again - reducer.js' }],
  alert: { show: false, message: '', type: '' },
};

// reducer function taking in state and action parameters
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // evaluates if the payload is for ADD or EDIT
      // '.toEdit' is in the payload with boolean value
      if (action.payload.toEdit) {
        const updatedListOfItems = state.todoItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, title: action.payload.title };
          }
          return item;
        });

        return {
          ...state,
          todoItems: updatedListOfItems,
          alert: { show: true, message: 'Edit saved!', type: 'info' },
        };
      }

      // if '.toEdit' in payload is false, new item is created
      const newItems = [...state.todoItems, action.payload];
      return {
        ...state,
        todoItems: newItems,
        alert: { show: true, message: 'Item added', type: 'success' },
      };

    case 'DELETE':
      const filteredItems = state.todoItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        todoItems: filteredItems,
        alert: { show: true, message: 'Item deleted!', type: 'warning' },
      };

    case 'CLEAR_ALL':
      return {
        ...state,
        todoItems: [],
      };

    case 'CLOSE_ALERT':
      return {
        ...state,
        alert: { show: false, message: '', type: '' },
      };

    default:
      return state;
  }
};
export default reducer;
