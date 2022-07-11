const Search = ({ filter, onChange }) => (
  <>
    find countries <input value={filter} onChange={onChange} />
  </>
);

export default Search;
