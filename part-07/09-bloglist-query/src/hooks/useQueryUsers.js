import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../services/users';

export const useQueryUsers = () => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });

  return { users };
};
