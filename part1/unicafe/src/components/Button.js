export const Button = ({ setter, state, caption }) => {
  const increment = (setter, amount) => {
    return () => setter(amount + 1);
  };

  return <button onClick={increment(setter, state)}>{caption}</button>;
};
