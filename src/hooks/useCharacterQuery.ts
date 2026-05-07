import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCharacterBasic, requestHide } from "../api/maple-character-api";

export const useCharacterQuery = (nickname: string) => {
  return useQuery({
    queryKey: ["character", nickname],
    queryFn: () => getCharacterBasic({ nickname }),
    enabled: !!nickname,
  });
};

export const useRequestHide = (
  nickname: string,
  onSuccess: () => void,
  onError: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reason: string) => requestHide(nickname, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["character", nickname] });
      onSuccess();
    },
    onError: () => {
      onError("숨김 요청에 실패했습니다.");
    },
  });
};
