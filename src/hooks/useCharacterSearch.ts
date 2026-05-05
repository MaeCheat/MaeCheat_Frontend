import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCharacterBasic } from "../api/maple-character-api";

export const useCharacterSearch = (onError?: (message: string) => void) => {
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
        error.response?.data?.message ?? "존재하지 않는 캐릭터입니다.";
      error.message = message;
      onError?.(message);
    },
  });
};
