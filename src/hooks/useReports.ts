import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReports, createReport } from "../api/report-api";

export const useReportsQuery = (nickname: string) => {
  return useQuery({
    queryKey: ["reports", nickname],
    queryFn: () => getReports(nickname),
    enabled: !!nickname,
  });
};

export const useCreateReport = (nickname: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sourceUrl: string) => createReport(nickname, sourceUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports", nickname] });
      onSuccess?.();
    },
  });
};
