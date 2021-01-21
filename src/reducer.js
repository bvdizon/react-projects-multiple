// This is the function being called by useReducer() hook.
// This is the first parameter (and required) for this useReducer() hook.
// This function must always return a state.
// Notice that it is returning an object
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // '.payload' is arbitrary and is the naming convention.
      // It must match the name declared on dispatch function
      const newPeople = [...state.people, action.payload];
      // Important to keep track of your current state value, always.
      return {
        ...state,
        people: newPeople,
        showModal: true,
        modalContent: 'Player added.',
      };
    case 'NO_VALUE':
      return { ...state, showModal: true, modalContent: 'Please enter name.' };
    case 'REMOVE_ITEM':
      const filteredPlayers = state.people.filter(
        (person) => person.id !== action.payload
      );
      return {
        ...state,
        people: filteredPlayers,
        showModal: true,
        modalContent: 'Player Removed',
      };
    case 'CLOSE_MODAL':
      return { ...state, showModal: false };
    default:
      return state;
  }
};

export default reducer;
