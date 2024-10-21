import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-1/3">
      <input
        className="p-3 pl-5 w-full rounded-md text-black focus:outline-none relative"
        placeholder="Search anything..."
        onChange={handleSearch}
        value={searchTerm}
      />
      <MagnifyingGlassIcon className="absolute bottom-[0.8rem] right-4 h-6 w-6 text-black" />
      {searchTerm.trim().length > 0 && (
        <div className="w-full border-2 broder-black h-[30rem] bg-black rounded-md absolute"></div>
      )}
    </div>
  );
};

export default SearchBar;
