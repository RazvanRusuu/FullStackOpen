import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (type) => {
    switch (type) {
      case "good":
        setGood((prev) => prev + 1);
        return;
      case "neutral":
        setNeutral((prev) => prev + 1);
        return;
      case "bad":
        setBad((prev) => prev + 1);
        return;
      default:
        return;
    }
  };

  return (
    <div>
      <h1>Give feedbacks</h1>
      <div style={{ display: "flex" }}>
        <Button value={"good"} onHandleClick={handleClick} />
        <Button value={"neutral"} onHandleClick={handleClick} />
        <Button value={"bad"} onHandleClick={handleClick} />
      </div>
      <Statistics statistics={{ good, neutral, bad }} />
    </div>
  );
};

const Statistics = ({ statistics }) => {
  const total = statistics.bad + statistics.neutral + statistics.good;

  const average = (statistics.good - statistics.bad) / total;
  const positive = (statistics.good / total) * 100;

  const noFeedback = !statistics.good && !statistics.bad && !statistics.neutral;

  return (
    <>
      <h2>Statistics</h2>
      {noFeedback ? (
        <span>No feedback given</span>
      ) : (
        <table>
          <tbody>
            <StaticLine text="good" value={statistics.good} />
            <StaticLine text="neutral" value={statistics.neutral} />
            <StaticLine text="bad" value={statistics.bad} />
            <StaticLine text="all" value={total} />
            <StaticLine
              text="average"
              value={`${Number.isNaN(average) || average} %`}
            />
            <StaticLine
              text="positive"
              value={`${Number.isNaN(positive) || positive} %`}
            />
          </tbody>
        </table>
      )}
    </>
  );
};

const StaticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ value, onHandleClick }) => {
  return <button onClick={() => onHandleClick(value)}>{value}</button>;
};

export default App;
