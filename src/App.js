import React, { useEffect, useReducer, useState } from 'react';
import reducer, { initialState } from './reducer';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './App.css';
import Alert from './components/Alert';
/*
  These are temporary data to pass to state.todoItems
  const data = [
    { id: 1, title: 'Todo item #1' },
    { id: 2, title: 'Todo item #2' },
    { id: 3, title: 'Todo item #3' },
  ];
 */

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [taskItem, setTaskItem] = useState('');
  const [editID, setEditID] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

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
