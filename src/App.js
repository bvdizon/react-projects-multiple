// importing the useReducer() Hook
import React, { useReducer } from 'react';
import Modal from './components/Modal';
import { data } from './components/data';
import AddPlayers from './components/AddPlayers';
// import the reducer file
import reducer from './reducer';

// This is passed as the second parameter to useReducer().
// It has the initial values for different state
const defaultState = {
  people: data,
  showModal: false,
  modalContent: '',
};

const App = () => {
  // When useReducer is invoked, we are getting two things back
  // the 'state' and 'dispatch' function.
  // 'state' and 'dispatch' are common naming convention
  // 'reducer' (naming convention) --- is a function, and required
  const [state, dispatch] = useReducer(reducer, defaultState);

  const addPlayers = (name) => {
    if (name) {
      // Create a new item to insert, via dispatch()
      // Notice that dispatch() takes in an object
      const newItem = {
        id: new Date().getTime().toString(),
        name: name,
      };

      // 'payload' is just a naming convention
      dispatch({ type: 'ADD_ITEM', payload: newItem });
    } else {
      dispatch({ type: 'NO_VALUE' });
    }
  };

  // Closing the modal
  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <div>
      <h1>Using useReducer()</h1>
      <AddPlayers addPlayers={addPlayers} />
      <ul>
        {state.people.map((person) => {
          return (
            <li key={person.id}>
              <button
                onClick={() =>
                  dispatch({ type: 'REMOVE_ITEM', payload: person.id })
                }>
                Remove
              </button>{' '}
              {person.name}
            </li>
          );
        })}
      </ul>

      {state.showModal && (
        <Modal modalContent={state.modalContent} closeModal={closeModal} />
      )}
    </div>
  );
};

export default App;
