import { useState } from "react";

const Button = ({ onClick, name }) => <button onClick={onClick}>{name}</button>;

const StatisticLine = ({ text, value }) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) return <text>No feedback given</text>;

  const average = all === 0 ? "N/A" : (good - bad) / all;
  const positive = all === 0 ? "N/A" : (good / all) * 100 + " %";
  return (
    <>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>

      <Button onClick={() => setGood(good + 1)} name="good" />
      <Button onClick={() => setNeutral(neutral + 1)} name="neutral" />
      <Button onClick={() => setBad(bad + 1)} name="bad" />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
