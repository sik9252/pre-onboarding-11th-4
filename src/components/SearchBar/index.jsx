import { SearchBarContainer, Input } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchButton from "../SearchButton";

function SearchBar() {
  return (
    <SearchBarContainer>
      <Input placeholder="질환명을 입력해주세요." />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <SearchButton />
    </SearchBarContainer>
  );
}

export default SearchBar;
