export const Persons = ({ persons }) => {
  return persons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));
};
