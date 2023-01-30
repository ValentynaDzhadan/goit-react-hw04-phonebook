import PropTypes from 'prop-types';

export const ContactList = ({ deleteContactById, filteredArrOfContacts }) => {
  return (
    <ul>
      {filteredArrOfContacts.map(el => (
        <li key={el.id}>
          <span>
            {el.name} : {el.number}
          </span>
          <button
            onClick={() => {
              deleteContactById(el.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  deleteContactById: PropTypes.func.isRequired,
  filteredArrOfContacts: PropTypes.array.isRequired,
};
