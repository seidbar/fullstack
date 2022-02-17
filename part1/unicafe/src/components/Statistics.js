import { StatsisticLine } from './StatisticLine';

export const Statistics = ({ good, bad, neutral, total }) => {
  return (
    <>
      <h1>statistics</h1>
      {total > 0 ? (
        <table>
          <tbody>
            <StatsisticLine text="good" value={good} />
            <StatsisticLine text="neutral" value={neutral} />
            <StatsisticLine text="bad" value={bad} />
            <StatsisticLine text="all" value={total} />
            <StatsisticLine
              text="average"
              value={(good * 1 + bad * -1) / total}
            />
            <StatsisticLine
              text="positive"
              value={`${(good / total) * 100}%`}
            />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};
