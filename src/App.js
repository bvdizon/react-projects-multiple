import { useReducer, useState } from 'react';
import { reducer, initialState } from './reducer';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [itemName, setItemName] = useState('');
  const [itemIDToEdit, setItemIDToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const editItem = { id: itemIDToEdit, name: itemName, isEdit: true };
      dispatch({ type: 'ADD', payload: editItem });

      setItemName('');
      setItemIDToEdit(null);
      setIsEditing(false);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        name: itemName,
        isEdit: false,
      };
      dispatch({ type: 'ADD', payload: newItem });
    }
  };

  const editItem = (id, name) => {
    // edit an item
    setIsEditing(true);
    setItemName(name);
    setItemIDToEdit(id);
  };

  return (
    <div className='App'>
      <h2>Grocery List Items</h2>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <button type='submit'>Add to List</button>
      </form>

      <ul>
        {state.list.map((item) => {
          return (
            <li key={item.id}>
              <div>{item.name}</div>
              <div>
                <span onClick={() => editItem(item.id, item.name)}>Edit</span> |
                <span
                  onClick={() =>
                    dispatch({ type: 'DELETE', payload: item.id })
                  }>
                  Delete
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
