import { useState } from "react";
import { MainContainer } from "./style";
import SearchBar from "../../components/SearchBar";
import SearchResult from "../../components/SearchResult";

function Main() {
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);

  const focusSearchBar = (e) => {
    e.stopPropagation();
    setIsSearchBarClicked(true);
  };

  const focusOutSearchBar = () => {
    setIsSearchBarClicked(false);
  };

  const handleBlur = () => {
    setIsSearchBarClicked(false);
  };

  return (
    <MainContainer onClick={() => focusOutSearchBar()}>
      <SearchBar onClick={(e) => focusSearchBar(e)} onBlur={handleBlur} />
      {isSearchBarClicked ? <SearchResult /> : null}
    </MainContainer>
  );
}

export default Main;
