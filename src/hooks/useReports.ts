import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getReports,
  createReport,
  upvoteReport,
  downvoteReport,
} from "../api/report-api";

export const useReportsQuery = (nickname: string) => {
  return useQuery({
    queryKey: ["reports", nickname],
    queryFn: () => getReports(nickname),
    enabled: !!nickname,
  });
};

export const useVote = (
  nickname: string,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  const handleError = (error: any) => {
    const message =
      error.response?.data?.message ?? "추천 또는 비추천에 실패했습니다.";
    onError?.(message);
  };

  const upvote = useMutation({
    mutationFn: (reportId: number) => upvoteReport(nickname, reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports", nickname] });
    },
    onError: handleError,
  });

  const downvote = useMutation({
    mutationFn: (reportId: number) => downvoteReport(nickname, reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports", nickname] });
    },
    onError: handleError,
  });

  return { upvote: upvote.mutate, downvote: downvote.mutate };
};

export const useCreateReport = (
  nickname: string,
  onSuccess?: () => void,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sourceUrl: string) => createReport(nickname, sourceUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports", nickname] });
      onSuccess?.();
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ?? "게시글 등록에 실패했습니다.";
      onError?.(message);
    },
  });
};
