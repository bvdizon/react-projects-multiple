import React, { useState } from 'react';

function AddForm({ addItem }) {
  const [itemName, setItemName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(itemName);
    setItemName((itemName) => '');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />
      <button type='submit'>Add to List</button>
    </form>
  );
}

export default AddForm;
