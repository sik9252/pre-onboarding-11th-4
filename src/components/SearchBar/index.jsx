import { SearchBarContainer, Input } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchButton from "../SearchButton";

function SearchBar({
  placeholder,
  onClick,
  onFocus,
  onChange,
  value,
  onCompositionStart,
  onCompositionEnd,
}) {
  return (
    <SearchBarContainer onFocus={onFocus} onClick={onClick}>
      <Input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <SearchButton />
    </SearchBarContainer>
  );
}

export default SearchBar;
