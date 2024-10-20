import React from "react";

const Search = ({ onChange, value }) => {
  return (
    <div className="search">
      <input name="search" value={value} onChange={onChange} />
    </div>
  );
};

export default Search;
