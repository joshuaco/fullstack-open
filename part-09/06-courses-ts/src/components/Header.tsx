interface HeaderProps {
  name: string;
}

function Header(prop: HeaderProps) {
  return (
    <div>
      <h1>{prop.name}</h1>
    </div>
  );
}

export default Header;
