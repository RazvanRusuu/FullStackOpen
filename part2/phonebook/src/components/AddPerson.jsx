const AddPerson = ({
  name,
  number,
  onNumberChange,
  onNameChange,
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          type="number"
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPerson;
