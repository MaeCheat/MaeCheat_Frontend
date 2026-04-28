import { useQuery } from "@tanstack/react-query";
import { getCharacterBasic } from "../api/maple-character-api";

export const useCharacterQuery = (nickname: string) => {
  return useQuery({
    queryKey: ["character", nickname],
    queryFn: () => getCharacterBasic({ nickname }),
    enabled: !!nickname,
  });
};
