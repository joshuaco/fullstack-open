/* eslint-disable react/prop-types */
function Contacts({ persons, deletePerson }) {
  return (
    <section>
      <h2>Contacts</h2>
      <ol>
        {persons.map((person, index) => (
          <li key={person.id}>
            <p>{`${index + 1}.- ${person.name}`}</p>
            <p>{person.number}</p>
            <button onClick={() => deletePerson(person.id, person.name)}>
              X
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Contacts;
