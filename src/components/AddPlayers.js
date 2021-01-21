import React, { useState } from 'react';

// 'addPlayers' is a function passed from App.js as prop
const AddPlayers = ({ addPlayers }) => {
  // as this is a form, state for the input field is mandatory
  // here we use the useState() Hook
  const [name, setName] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addPlayers(name);
        setName('');
      }}>
      <input
        type='text'
        placeholder='Enter name'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button>Add</button>
    </form>
  );
};
export default AddPlayers;
