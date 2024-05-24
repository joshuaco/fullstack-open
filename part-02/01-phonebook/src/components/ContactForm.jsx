/* eslint-disable react/prop-types */
function ContactForm({
  newName,
  phone,
  handleSubmit,
  handleNameChange,
  handleNumberChange
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="inputs">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          value={newName}
          onChange={handleNameChange}
        />
      </div>

      <div className="inputs">
        <label htmlFor="phone">Phone</label>
        <input
          type="number"
          name="phone"
          id="phone"
          placeholder="12345"
          value={phone}
          onChange={handleNumberChange}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default ContactForm;
