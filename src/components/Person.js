import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../useFetch';

const url = 'https://jsonplaceholder.typicode.com/users';

const Person = () => {
  // useParams() is a hook that comes with react-router-dom
  // using console log, it will return what you configured
  // in the <Route> url
  const { id } = useParams();

  // using a custom hook
  const { users } = useFetch(url);

  // getting the value of a specific user from the fetched API data
  const specificUser = users && users.find((user) => user.id === parseInt(id));

  // short-circuit evaluation "&&" is again used as it is causing
  // it to crash on manual refresh
  return (
    <div>
      {specificUser && (
        <div>
          <h3>{specificUser.name}</h3>
          <p>{specificUser.username}</p>
          <p>{specificUser.email}</p>
          <p>{specificUser.company.catchPhrase}</p>
        </div>
      )}
    </div>
  );
};

export default Person;
