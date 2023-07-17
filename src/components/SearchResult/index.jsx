import { useState, useEffect } from "react";
import { SearchResultContainer, Item } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchResult({ diseaseList, diseaseName, isComposing }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const diseaseListLength = diseaseList.length;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        if (isComposing) return;
        if (selectedItemIndex < diseaseListLength - 1) {
          setSelectedItemIndex((prevIndex) => prevIndex + 1);
        }
      }
      if (e.key === "ArrowUp") {
        if (selectedItemIndex > 0) {
          setSelectedItemIndex((prevIndex) => prevIndex - 1);
        }
      }
      if (e.key === "Escape") {
        setSelectedItemIndex(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isComposing, diseaseListLength, selectedItemIndex]);

  useEffect(() => {
    setSelectedItemIndex(-1);
  }, [diseaseName]);

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
