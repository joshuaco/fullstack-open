/* eslint-disable react/prop-types */
import { useCounterValue, useCounterDispatch } from './CounterContext';

function Display() {
  const counter = useCounterValue();
  return <p>{counter}</p>;
}

function Button({ type, label }) {
  const dispatch = useCounterDispatch();
  return <button onClick={() => dispatch({ type })}>{label}</button>;
}

function App() {
  return (
    <>
      <Display />

      <div>
        <Button label="+" type="INCREMENT" />
        <Button label="0" type="ZERO" />
        <Button label="-" type="DECREMENT" />
      </div>
    </>
  );
}

export default App;
