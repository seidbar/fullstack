export const Total = ({ parts }) => {
  const total = parts.reduce((subtotal, part) => subtotal + part.exercises, 0);
  return <p>Number of exercises {total}</p>;
};
