import { useOidcUser } from '@axa-fr/react-oidc';
import { useEffect, useState } from 'react';
import { getUser, User } from '../api/user.api';
import { OidcUser } from '../components/NavBar/Profile';

const useUser = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const { oidcUser } = useOidcUser() as OidcUser;

  useEffect(() => {
    const func = async () => {
      setUser(await getUser(oidcUser?.preferred_username));
      setIsLoading(false);
    };

    func();
  }, [oidcUser]);

  return { user, isLoading };
};

export default useUser;
