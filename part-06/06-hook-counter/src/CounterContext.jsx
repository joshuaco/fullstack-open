/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react';

const counterReducer = (state, action) => {
  if (action.type === 'INCREMENT') {
    return state + 1;
  }

  if (action.type === 'DECREMENT') {
    return state - 1;
  }

  if (action.type === 'ZERO') {
    return 0;
  }

  return state;
};

const CounterContext = createContext();

export const useCounterValue = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[0];
};

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[1];
};

export function CounterContextProvider(props) {
  const [counter, dispatch] = useReducer(counterReducer, 0);

  return (
    <CounterContext.Provider value={[counter, dispatch]}>
      {props.children}
    </CounterContext.Provider>
  );
}

export default CounterContext;
