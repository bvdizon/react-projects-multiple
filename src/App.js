import React, { useEffect, useReducer, useState } from 'react';
import reducer, { initialState } from './reducer';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './App.css';
import Alert from './components/Alert';

// Getting items from localStorage, and returning values in array.
// Ternary operator; if items exist in LS, parse it and return,
// if items don't exist, return empty array '[]'
const itemsLS = () => {
  const items = localStorage.getItem('items');
  return JSON.parse(items);
};

// Passing the items in localStorage to useReducer() third parameter
// which sets the second argument of this hook.
const initState = () => {
  return {
    todoItems: itemsLS(),
    alert: { show: false, message: '', type: '' },
  };
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState, initState);
  const [taskItem, setTaskItem] = useState('');
  const [editID, setEditID] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(state.todoItems));
  }, [state.todoItems]);

  // Adding and Editing is using the same form.
  // Thus, logic is set to determine how to process the data in the form.
  // The control state to determine if item is for add or edit is
  // the 'isEdit' state.
  const addItem = (item) => {
    if (isEdit) {
      const editItem = { id: editID, title: taskItem, toEdit: true };
      dispatch({ type: 'ADD', payload: editItem });
      setIsEdit(false);
      setEditID(null);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: item };
      dispatch({ type: 'ADD', payload: newItem, toEdit: false });
    }
  };

  // changing state necessary to edit, to be evaluated by 'addItem' function
  const handleClickEdit = (id, title) => {
    setTaskItem(title);
    setEditID(id);
    setIsEdit(true);
  };

  const closeAlert = () => {
    dispatch({ type: 'CLOSE_ALERT' });
  };

  return (
    <section className='section' id='todoApp'>
      <h2>To Do List</h2>

      {state.alert.show && (
        <Alert
          message={state.alert.message}
          closeAlert={closeAlert}
          type={state.alert.type}
        />
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addItem(taskItem);
          setTaskItem('');
        }}>
        <input
          type='text'
          value={taskItem}
          onChange={(e) => setTaskItem(e.target.value)}
          required
        />
        {/* conditional styling of the submit button */}
        <button className={isEdit ? 'btn btn-edit' : 'btn btn-green'}>
          {isEdit ? 'Save Edit' : 'Add to List'}
        </button>
      </form>

      {state.todoItems.length > 0 && <h3>outstanding tasks</h3>}
      <ul className='todo-list'>
        {state.todoItems.map((item) => (
          <li key={item.id}>
            <span title={item.title}>
              {/* setting the max number of characters per todo item */}
              {item.title.length > 30
                ? item.title.substring(0, 27) + '...'
                : item.title}
            </span>
            <div>
              {/* 'handleClickEdit' is called here to change appropriate state(s) */}
              <span onClick={() => handleClickEdit(item.id, item.title)}>
                <FaEdit />
              </span>{' '}
              &nbsp; | &nbsp;
              <span
                onClick={() => dispatch({ type: 'DELETE', payload: item.id })}>
                <FaTrashAlt />
              </span>
            </div>
          </li>
        ))}
      </ul>

      {state.todoItems.length > 0 && (
        <button
          className='btn btn-danger my-15'
          onClick={() => dispatch({ type: 'CLEAR_ALL' })}>
          clear tasks
        </button>
      )}
    </section>
  );
};

export default App;
