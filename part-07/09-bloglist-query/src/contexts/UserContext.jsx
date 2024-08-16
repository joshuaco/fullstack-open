import { createContext, useReducer } from 'react';
import { userReducer } from '../reducers/userReducer';

const UserContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
