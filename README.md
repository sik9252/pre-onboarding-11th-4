# pre-onboarding-11th-4

## 📌 프로젝트 목적

[한국임상정보](https://clinicaltrialskorea.com/) 사이트의 검색 영역을 클론 코딩하며 디바운싱 및 캐싱 전략을 수립하고 키보드를 이용해 검색 리스트 간 요소를 이동할 수 있는 기능을 구현한다.

![ezgif com-video-to-gif](https://github.com/sik9252/pre-onboarding-11th-4/assets/64947440/a8f7b727-2d9f-47ca-8476-3b960fe95d8c)

## 📌 배포 주소

[View Demo](https://web-pre-onboarding-11th-4-koh2xlixy7104.sel4.cloudtype.app/)

## 📌 로컬 실행 방법

```
$ https://github.com/sik9252/pre-onboarding-11th-4.git
```

```
$ yarn install
$ yarn start
```

## 📌 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">

<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">

<img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=Styled Components&logoColor=white"> <img src="https://img.shields.io/badge/Font Awesome-528DD7?style=for-the-badge&logo=Font Awesome&logoColor=white">

## 📌 주요 기능

### 1. 검색어 추천 기능

검색창에 입력한 값을 바탕으로 검색창 아래에 추천 검색어 목록을 보여주는 기능

![검색어 추천](https://github.com/sik9252/pre-onboarding-11th-4/assets/64947440/19e455d6-9217-408b-afd9-af099c27a511)

### 2. API 호출별 로컬 캐싱 기능

한번 입력한 검색어에 대해서는 캐시가 유지되는 일정 시간 동안은 재 요청을 하지 않고 캐시에 존재하는 데이터를 불러오는 기능

![캐싱](https://github.com/sik9252/pre-onboarding-11th-4/assets/64947440/de42840d-3a66-49a2-8ef0-464ba0f3d3b7)

**구현 코드**

```js
// useCachedApiCall.js

import { useState, useEffect } from "react";
import { getDisease } from "../api/getDisease";

export const useCachedApiCall = ({ isSearchBarClicked, diseaseName }) => {
  const [diseaseList, setDiseaseList] = useState([]);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const getDiseasesFunc = () => {
      const currentTime = new Date().getTime();
      const staleTime = 1000 * 60 * 0.3;

      if (
        diseaseName &&
        (!cache[diseaseName] ||
          currentTime - cache[diseaseName].timestamp > staleTime)
      ) {
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
  }, [isSearchBarClicked, diseaseName, cache]);

  return diseaseList;
};
```

### 3. API 호출 횟수를 줄이기 위한 Debounce 기능

**적용 전**

![디바운스 적용 전](https://github.com/sik9252/pre-onboarding-11th-4/assets/64947440/60ac9b6a-d988-4cd7-ab0a-560f69e6ccff)

**적용 후**

![디바운스 적용 후](https://github.com/sik9252/pre-onboarding-11th-4/assets/64947440/b55487bd-93f5-4ac6-9cbe-1fd1973531ac)

API 호출 횟수를 확인하기 위한 `console.info("calling api");`의 호출이 debounce 적용 후 확실하게 줄어든 것을 확인할 수 있다.

```js
const debounce = setTimeout(() => {
  getDiseasesFunc(diseaseName);
}, 400);

return () => {
  clearTimeout(debounce);
};
```

### 4. 키보드를 이용한 추천 검색어 목록 이동 기능

![키보드 이동](https://github.com/sik9252/pre-onboarding-11th-4/assets/64947440/5f754d88-0382-43e2-9d97-59103b02d582)

## 📌 폴더 구조

```
├─ src
│  ├─ App.jsx
│  ├─ api
│  │  ├─ customAxios.js
│  │  └─ getDisease.js
│  ├─ components
│  │  ├─ SearchBar
│  │  │  ├─ index.jsx
│  │  │  └─ style.js
│  │  ├─ SearchButton
│  │  │  ├─ index.jsx
│  │  │  └─ style.js
│  │  └─ SearchResult
│  │     ├─ index.jsx
│  │     └─ style.js
│  ├─ globalStyles.js
│  ├─ hooks
│  │  ├─ useCachedApiCall.js
│  │  └─ useKeyDown.js
│  ├─ main.jsx
│  └─ pages
│     └─ Main
│        ├─ index.jsx
│        └─ style.js
├─ index.html
├─ vite.config.js
└─ yarn.lock
```
