const Persons = ({ persons, onDelete }) => {
  return (
    <>
      {persons?.map((person) => (
        <div key={person.name} style={{ display: "flex", gap: "10px" }}>
          <div>
            <span>{person.name}</span>: <span>{person.number}</span>
          </div>
          <button onClick={() => onDelete(person)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
