import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCharacterBasic } from "../api/maple-character-api";

export const useCharacterSearch = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: getCharacterBasic,
    onSuccess: (data) => {
      navigate(`/characters/${encodeURIComponent(data.character_name)}`, {
        state: { character: data },
      });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ?? "캐릭터 검색에 실패했습니다.";
      error.message = message;
    },
  });
};
