import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../useFetch';

const url = 'https://jsonplaceholder.typicode.com/users';

const People = () => {
  // a hook that comes with react-router-dom
  const { users } = useFetch(url);

  return (
    <div>
      <h3>People Component</h3>
      <ul>
        {users &&
          users.map((user) => {
            const { id, username, name, info } = user;
            return (
              <li key={id}>
                <h3>
                  {name} | {username}
                </h3>
                <p>{info}</p>
                <button>
                  <Link to={`/person/${id}`}>Check User</Link>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default People;
