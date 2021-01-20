import { useState } from 'react';
import './App.css';
// locally hosted data
import data from './data';

function App() {
  // 'text' state will be set based on the 'count' state
  // 'count' state is being set by a form onSubmit,
  // it determines how many paragraphs will be set to 'text' state
  const [text, setText] = useState([]);
  const [count, setCount] = useState(1);

  // using javascript '.splice()' function, local 'data' will be
  // fetched and saved to 'text' state
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = data.map((data) => data);
    setText(newData.splice(0, count));
  };

  return (
    <div className='section'>
      <h2>Lorem Ipsum Generator</h2>
      <h4>Choose the number of paragraphs to generate.</h4>
      <form onSubmit={handleSubmit}>
        <button>Generate</button>
        <input
          type='number'
          name='count'
          value={count}
          onChange={(e) => setCount(e.target.value)}
          min='1'
          max='8'
        />
      </form>

      {/* 
        'text' state is now set with data based on the logic in 'handleSubmit 
        and will be conditionally displayed using short-circuit evaluation '&&'
      */}
      {text && text.map((text, index) => <p key={index}>{text}</p>)}
    </div>
  );
}

export default App;
