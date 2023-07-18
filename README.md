# pre-onboarding-11th-4

## 📌 프로젝트 목적

[한국임상정보](https://clinicaltrialskorea.com/) 사이트의 검색 영역을 클론 코딩하며 API 요청 관련 디바운싱 및 캐싱 전략을 수립하고 키보드를 이용해 검색 리스트 간 요소를 이동할 수 있는 기능을 구현한다.

**전체 시뮬레이션**

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

검색창에 입력한 값을 바탕으로 검색창 아래에 추천 검색어 목록을 보여주는 기능 (입력 값에 대한 추천 검색어가 없다면 "검색어가 없습니다."를 표시한다.)

**구현 결과**

![검색어 추천](https://github.com/sik9252/pre-onboarding-11th-4/assets/64947440/19e455d6-9217-408b-afd9-af099c27a511)

### 2. API 호출별 로컬 캐싱 기능

한번 입력한 검색어에 대해서는 캐시가 유지되는 일정 시간 동안은 재 요청을 하지 않고 캐시에 존재하는 데이터를 불러오는 기능

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

**API 호출 별 캐싱 과정**

1. 사용자의 입력 값(diseaseName)을 기준으로 cache 상태에 입력 값에 해당하는 데이터가 있는지 검사한다.

   1-1. cache에 해당 데이터가 없다면 실제 API 요청을 수행하고 해당 입력 값과 그에 대한 결과값을 cache에 저장하고 반환한다.

   1-2. cache에 해당 데이터가 있다면 API 요청을 수행하지 않고, cache에 존재하는 결과값을 반환한다.

2. staleTime 변수에 캐시의 expire time을 설정하고 cache에는 특정 입력 값과 함께 해당 입력 값이 요청된(저장된) 시간을 함께 저장한다. (빠른 테스트를 위해 위에서는 30초로 설정)

   2-1. 특정 데이터에 대한 요청이 들어왔을 때, 해당 캐시의 저장 시간과 staleTime을 비교해 만료된 데이터인 경우 해당 입력 값에 대해 다시 1-1. 과정을 수행한다.

**구현 결과**

![캐싱](https://github.com/sik9252/pre-onboarding-11th-4/assets/64947440/de42840d-3a66-49a2-8ef0-464ba0f3d3b7)

### 3. API 호출 횟수를 줄이기 위한 Debounce 기능

```js
const debounce = setTimeout(() => {
  getDiseasesFunc(diseaseName);
}, 400);

return () => {
  clearTimeout(debounce);
};
```

setTimeout()을 이용해 사용자의 입력에 대한 API 요청을 400ms 뒤에 수행하도록 지연시켜 매 입력에 대해 요청이 발생하지 않도록 구현하였다.

**디바운싱 적용 전**

![디바운스 적용 전](https://github.com/sik9252/pre-onboarding-11th-4/assets/64947440/60ac9b6a-d988-4cd7-ab0a-560f69e6ccff)

**디바운싱 적용 후**

![디바운스 적용 후](https://github.com/sik9252/pre-onboarding-11th-4/assets/64947440/b55487bd-93f5-4ac6-9cbe-1fd1973531ac)

API 호출 횟수를 확인하기 위한 `console.info("calling api");`의 호출이 debounce 적용 후 같은 단어를 입력하고 지웠을때, 11번 -> 5번으로 확실하게 줄어든 것을 확인할 수 있다.

### 4. 키보드를 이용한 추천 검색어 목록 이동 기능

```js
// useKeyDown.js

import { useEffect } from "react";

const useKeyDown = (
  isComposing,
  diseaseListLength,
  selectedItemIndex,
  setSelectedItemIndex,
  diseaseName
) => {
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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isComposing, diseaseListLength, selectedItemIndex, setSelectedItemIndex]);

  useEffect(() => {
    setSelectedItemIndex(-1);
  }, [diseaseName, setSelectedItemIndex]);
};

export default useKeyDown;
```

keyboard event의 "ArrowDown", "ArrowUp"을 이용하여 해당 이벤트 발생 시 selectedItemIndex 값을 증가 혹은 감소시켜 렌더링된 추천 검색어 목록의 index 값과 비교하여 선택된 요소의 배경색을 달리 함으로써 시각적으로 어느 위치에 커서가 위치하고 있는지 보여주는 식으로 처리하였다.

**구현 도중 이슈**

검색창에 한글을 입력한 후 키보드로 화살표 아래 방향을 누르면 바로 추천 검색어의 맨 처음 요소로 이동하는 것이 아닌 바로 두번째 요소로 이동하는 현상이 발생하였다.

이는 한글과 같은 조합이 필요한 문자의 입력을 지원하기 위한 IME(Input Method Editor) 과정에서 KeyDown 이벤트가 발생할 때 운영체제와 브라우저가 해당 이벤트를 중복 처리하기 때문에 발생하는 문제이다.

**해결법**

isComposing 상태를 추가하여 `onCompositionStart`, `onCompositionEnd` 속성을 이용해 컴포지션 세션이 시작될 때 true, 세션이 종료될 때 false 상태가 되도록 하여 컴포지션 상태를 확인해 키보드 이벤트를 제어하도록하여 해결하였다.

**구현 결과**

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
