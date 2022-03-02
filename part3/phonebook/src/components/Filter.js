export const Filter = ({ filter, handleSearch }) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={handleSearch} />
    </div>
  );
};
