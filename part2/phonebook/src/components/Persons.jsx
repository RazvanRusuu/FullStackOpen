const Persons = ({ persons }) => {
  return (
    <>
      {persons?.map((person) => (
        <div key={person.name}>
          <span>{person.name}</span>: <span>{person.number}</span>
        </div>
      ))}
    </>
  );
};

export default Persons;
