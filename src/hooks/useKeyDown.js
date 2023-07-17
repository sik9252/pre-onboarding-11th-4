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
      if (e.key === "Escape") {
        setSelectedItemIndex(-1);
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
