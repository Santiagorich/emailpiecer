import React from "react";
import SearchInput from "./../components/SearchInput/SearchInput";

function LandingSearch() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className=" w-96">
        <SearchInput></SearchInput>
      </div>
    </div>
  );
}

export default LandingSearch;
