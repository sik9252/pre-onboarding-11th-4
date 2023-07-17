import { useState, useEffect } from "react";
import { MainContainer } from "./style";
import SearchBar from "../../components/SearchBar";
import SearchResult from "../../components/SearchResult";
import { getDisease } from "../../api/getDisease";

function Main() {
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);
  const [diseaseName, setDiseaseName] = useState("");
  const [diseaseList, setDiseaseList] = useState([]);
  const [isComposing, setIsComposing] = useState(false);

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

  // 질환명 API 요청
  useEffect(() => {
    const getDiseasesFunc = (diseaseName) => {
      // API 호출 횟수 확인용
      console.info("calling api");
      getDisease(diseaseName)
        .then((res) => {
          setDiseaseList(res.data.slice(0, 7));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (isSearchBarClicked && diseaseName) {
      // API 호출 줄이기 위한 debounce 적용
      const debounce = setTimeout(() => {
        getDiseasesFunc(diseaseName);
      }, 400);

      return () => {
        clearTimeout(debounce);
      };
    }
  }, [isSearchBarClicked, diseaseName]);

  return (
    <MainContainer onClick={() => focusOutSearchBar()}>
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
