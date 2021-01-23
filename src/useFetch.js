import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState();

  const getUsers = async () => {
    setLoading(true);
    const resp = await fetch(url);
    const users = await resp.json();
    setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { loading, users };
};
