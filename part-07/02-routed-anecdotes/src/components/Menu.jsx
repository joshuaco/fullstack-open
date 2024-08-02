import { Link } from 'react-router-dom';

function Menu() {
  const padding = {
    paddingRight: 5
  };

  return (
    <header>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </header>
  );
}

export default Menu;
