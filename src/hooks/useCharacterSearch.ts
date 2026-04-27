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
  });
};
