import { useState, useEffect } from "react";
import { getDisease } from "../api/getDisease";

export const useCachedApiCall = ({ isSearchBarClicked, diseaseName }) => {
  const [diseaseList, setDiseaseList] = useState([]);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const getDiseasesFunc = () => {
      if (diseaseName && !cache[diseaseName]) {
        // API 호출 빈도수 확인용
        console.info("calling api");
        getDisease(diseaseName)
          .then((response) => {
            setDiseaseList(response.data);
            setCache((prevCache) => ({
              ...prevCache,
              [diseaseName]: response.data,
            }));
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } else {
        setDiseaseList(cache[diseaseName]);
      }
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
  }, [isSearchBarClicked, diseaseName, cache]);

  return diseaseList;
};
