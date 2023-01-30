import PropTypes from 'prop-types';

export const Filter = ({ onSearchChange }) => {
  return (
    <label>
      <span> Find contacts by name </span>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={onSearchChange}
        required
      />
    </label>
  );
};

Filter.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};
