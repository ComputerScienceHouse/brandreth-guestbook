import { useEffect, useState } from 'react';
import { getUsers, User } from '../api/user.api';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      setUsers(await getUsers());
      setIsLoading(false);
    };

    func();
  }, []);

  return { users, isLoading };
};

export default useUsers;
