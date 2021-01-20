import React, { useEffect, useState } from 'react';
import Loading from './components/Loading';
import './App.css';
import { MdRadioButtonChecked } from 'react-icons/md';

// handler for the API endpoint
const url = 'https://course-api.com/react-tabs-project';

const App = () => {
  // setting the initial value of state we need
  // note that 'jobs' is initalized with empty array
  // 'value' state will use to control array index to show
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  // this is the function to call via useEffect to fetch data
  const fetchJobs = async () => {
    const response = await fetch(url);

    // check if there is an error fetching data
    if (response.status !== 200) {
      setLoading(false);
      // custom error message to display
      throw new Error('Could not fetch jobs.');
    }

    // setting the state 'jobs' for successful fetch
    const newJobs = await response.json();

    // the order of the two lines of code below is important
    // if switched, this will cause error in destructuring
    // set state first before turning loading off
    setJobs(newJobs);
    setLoading(false);
  };

  // useEffect to render only once in calling API
  useEffect(() => {
    fetchJobs();
  }, []);

  // start of multiple returns, will show loading spinner on loading
  if (loading) {
    return <Loading />;
  }

  // you need to destructure after Loading, else error
  const { title, dates, company, duties } = jobs[value];

  return (
    <main className='container'>
      <h1 className='text-center my-lg'>Work Experience</h1>
      <div className='underline'></div>
      <div id='jobsTab'>
        <aside className='companies'>
          {/* 
            This part sets the value state, which triggers what to display.
          */}
          {jobs.map((job, index) => {
            return (
              <button
                onClick={() => setValue(index)}
                className={`btn btn${index === value && '-active'}`}>
                {job.company}
              </button>
            );
          })}
        </aside>

        <article>
          <h2>{title}</h2>
          <h3>{company}</h3>
          <p>{dates}</p>
          <div className='job-duties'>
            {duties.map((duty, index) => {
              return (
                <div key={index}>
                  <MdRadioButtonChecked />
                  <p>{duty}</p>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </main>
  );
};

export default App;
