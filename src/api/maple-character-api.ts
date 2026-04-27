import axiosInstance from "./axios-instance";
import type { MapleCharacterRequest } from "../types/maple-character";

export const getCharacterBasic = async ({
  nickname,
}: MapleCharacterRequest) => {
  const { data } = await axiosInstance.get("/maple-characters/basic", {
    params: { nickname },
  });
  return data;
};
