export const People = ({ people, deletePerson }) => {
  return people.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}{' '}
      <button
        onClick={() => {
          deletePerson(person);
        }}
      >
        delete
      </button>
    </div>
  ));
};
