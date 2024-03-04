import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState({});
  const randomNumber = Math.floor(Math.random() * anecdotes.length);

  const handleVote = (index) => {
    setVote((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  };

  const mostVotedIndex = () => {
    let mostVoted = 0;
    let index = 0;

    Object.entries(vote).forEach(([key, value]) => {
      if (value > mostVoted) {
        mostVoted = value;
        index = key;
      }
    });

    return index;
  };

  return (
    <div>
      <button onClick={() => handleVote(selected)}>vote</button>
      <button onClick={() => setSelected(randomNumber)}>next anecdote</button>
      <p>{anecdotes[selected]}</p>

      {Object.values(vote).length > 0 && (
        <>
          <h2>Anecdote with most votes</h2>
          <p>{anecdotes[mostVotedIndex()]}</p>
        </>
      )}
    </div>
  );
};

export default App;
