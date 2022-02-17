import { useState } from 'react';
import { Statistics } from './components/Statistics';
import { Button } from './components/Button';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + bad + neutral;

  return (
    <div>
      <h1>give feedback</h1>
      <Button setter={setGood} state={good} caption="good" />
      <Button setter={setNeutral} state={neutral} caption="neutral" />
      <Button setter={setBad} state={bad} caption="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  );
};

export default App;
