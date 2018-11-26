import React from "react";
import PropTypes from "prop-types";

const SearchForm = ({ placeholder, value, onSubmit }) => {
  let input;
  const _onSubmit = e => {
    e.preventDefault();
    onSubmit(input.value);
  };
  const onKeyDown = e => {
    if (e.charCode === 13) {
      _onSubmit(e);
    }
  };
  return (
    <form className="search__form">
      <input
        ref={node => (input = node)}
        type="search"
        name="search"
        onKeyDown={onKeyDown}
        value={value}
        placeholder={placeholder}
        className="search__input"
      />
      <button
        onClick={_onSubmit}
        type="submit"
        className="btn btn__img btn__img__search"
      >
        <span className="hidden">Rechercher</span>
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onSubmit: PropTypes.func
};

SearchForm.defaultProps = {
  placeholder: "Posez votre question",
  value: null,
  onSubmit: () => {}
};

export default SearchForm;
