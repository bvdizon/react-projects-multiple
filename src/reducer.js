export const initialState = {
  list: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    // DELETE an item from the list
    case 'DELETE':
      let filterList = state.list.filter((item) => item.id !== action.payload);
      return {
        ...state,
        list: filterList,
      };

    // ADD an item to the list
    case 'ADD':
      if (action.payload.isEdit) {
        // This part of the code gave me a hard time for I was overthinking it
        // Just use '.map()' to iterate through the list, and it is important
        // to run a condition statement to match the ID of the item you want to
        // edit. Another important to note is that the item is updated with
        // spread operator and is needed to return.
        // The last important part is that for each iteration, outside the
        // condition statment, you must return the item you don't want to
        // edit to maintain the same set of items in the array.
        const editList = state.list.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, name: action.payload.name };
          }
          return item;
        });

        return {
          ...state,
          list: editList,
        };
      }
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    default:
      return state;
  }
};
