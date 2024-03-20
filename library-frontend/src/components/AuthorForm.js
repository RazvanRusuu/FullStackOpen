import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queris/queries";

const AuthorForm = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [update] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const { data } = useQuery(ALL_AUTHORS);

  if (!props.show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    update({ variables: { name, born: +born } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {[{ name: "Select an author..." }, ...data?.allAuthors].map(
              (author) => {
                return (
                  <option key={author.name} value={author.name}>
                    {author.name}
                  </option>
                );
              }
            )}
          </select>
        </div>
        <div>
          <label>Born</label>
          <input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default AuthorForm;
