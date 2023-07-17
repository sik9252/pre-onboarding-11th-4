import { customAxios } from "./customAxios";

export const getDisease = async (diseaseName) => {
  return await customAxios.get(`?q=${diseaseName}`);
};
