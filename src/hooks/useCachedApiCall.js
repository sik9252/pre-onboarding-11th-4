import { useState, useEffect } from "react";
import { getDisease } from "../api/getDisease";

export const useCachedApiCall = ({ isSearchBarClicked, diseaseName }) => {
  const [diseaseList, setDiseaseList] = useState([]);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const getDiseasesFunc = () => {
      const currentTime = new Date().getTime();
      const staleTime = 1000 * 60 * 0.3; // 캐시 30초 뒤 expire

      if (
        diseaseName &&
        (!cache[diseaseName] ||
          currentTime - cache[diseaseName].timestamp > staleTime)
      ) {
        // API 호출 빈도수 확인용
        console.info("calling api");
        getDisease(diseaseName)
          .then((response) => {
            setDiseaseList(response.data.slice(0, 8));
            setCache((prevCache) => ({
              ...prevCache,
              [diseaseName]: {
                data: response.data.slice(0, 8),
                timestamp: currentTime,
              },
            }));
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } else {
        setDiseaseList(cache[diseaseName].data);
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
