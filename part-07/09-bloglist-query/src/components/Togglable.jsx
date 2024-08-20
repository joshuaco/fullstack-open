/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from 'react-bootstrap';

const Togglable = forwardRef(function TogglableComponent(props, refs) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} className="w-25 mt-3">
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          variant="danger"
          className="mt-2 w-25"
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

export default Togglable;
