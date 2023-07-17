import { useState } from "react";
import { SearchResultContainer, Item } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useKeyDown from "../../hooks/useKeyDown";

function SearchResult({ diseaseList, diseaseName, isComposing }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const diseaseListLength = diseaseList.length;

  // 키보드로 추천 검색어 이동
  useKeyDown(
    isComposing,
    diseaseListLength,
    selectedItemIndex,
    setSelectedItemIndex,
    diseaseName
  );

  const handleResultClick = (event) => {
    event.stopPropagation();
  };

  return (
    <SearchResultContainer onClick={handleResultClick}>
      <div>추천 검색어</div>
      {diseaseList.length > 0 && diseaseName ? (
        <>
          {diseaseList.map((disease, index) => (
            <Item
              key={disease.sickCd}
              className={index === selectedItemIndex ? "selected" : ""}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span>{disease.sickNm}</span>
            </Item>
          ))}
        </>
      ) : (
        <div>검색어가 없습니다.</div>
      )}
    </SearchResultContainer>
  );
}

export default SearchResult;
