import { SearchButtonContainer, Button } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchButton() {
  return (
    <SearchButtonContainer>
      <Button>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </SearchButtonContainer>
  );
}

export default SearchButton;
