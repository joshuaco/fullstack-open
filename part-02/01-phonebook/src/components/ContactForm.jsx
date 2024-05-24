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
          type="text"
          name="phone"
          id="phone"
          placeholder="012-345-6789"
          value={phone}
          onChange={handleNumberChange}
        />
      </div>
      <button className="form-button" type="submit">
        Add
      </button>
    </form>
  );
}

export default ContactForm;
