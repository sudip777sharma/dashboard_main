import React, { useState, useEffect } from "react";
import _ from "lodash";

interface DebouncedSearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const DebouncedSearchInput: React.FC<DebouncedSearchInputProps> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce the search function
  const debouncedSearch = _.debounce(onSearch, 500);

  useEffect(() => {
    // Call the debounced search function when the search term changes
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <input
      className="border-[1px] border-[#484D64] outline-none bg-transparent rounded-lg p-2"
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default DebouncedSearchInput;
