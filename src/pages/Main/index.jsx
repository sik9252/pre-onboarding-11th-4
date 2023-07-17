import { useState, useEffect } from "react";
import { MainContainer, Title } from "./style";
import SearchBar from "../../components/SearchBar";
import SearchResult from "../../components/SearchResult";
import { useCachedApiCall } from "../../hooks/useCachedApiCall";

function Main() {
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);
  const [diseaseName, setDiseaseName] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  // 캐시를 활용한 API 요청
  const diseaseList = useCachedApiCall(
    isSearchBarClicked && diseaseName ? { isSearchBarClicked, diseaseName } : ""
  );

  const focusSearchBar = (e) => {
    e.stopPropagation();
    setIsSearchBarClicked(true);
  };

  const focusOutSearchBar = () => {
    setIsSearchBarClicked(false);
  };

  const handleFocus = () => {
    setIsSearchBarClicked(true);
  };

  const handleDiseaseNameChange = (e) => {
    setDiseaseName(e.target.value);
  };

  // ESC 눌렀을때 검색어 초기화
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setDiseaseName("");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MainContainer onClick={() => focusOutSearchBar()}>
      <Title>
        <div>국내 모든 임상시험 검색하고</div>
        <div>온라인으로 참여하기</div>
      </Title>
      <SearchBar
        placeholder={isSearchBarClicked ? "" : "질환명을 입력해주세요."}
        onClick={(e) => focusSearchBar(e)}
        onFocus={handleFocus}
        onChange={handleDiseaseNameChange}
        value={diseaseName}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
      {isSearchBarClicked ? (
        <SearchResult
          diseaseList={diseaseList}
          diseaseName={diseaseName}
          isComposing={isComposing}
        />
      ) : null}
    </MainContainer>
  );
}

export default Main;
