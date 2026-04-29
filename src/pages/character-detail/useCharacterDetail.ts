import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCharacterQuery } from "../../hooks/useCharacterQuery";
import { useReportsQuery, useCreateReport, useVote } from "../../hooks/useReports";
import { useToast } from "../../hooks/useToast";

export const useCharacterDetail = () => {
  const { name: encodedNickname } = useParams<{ name: string }>();
  const nickname = decodeURIComponent(encodedNickname ?? "");

  const [showForm, setShowForm] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const { data: character, isLoading: isCharacterLoading } =
    useCharacterQuery(nickname);

  const { data: reports, isLoading: isReportsLoading, error: reportsError } =
    useReportsQuery(nickname);

  const { upvote, downvote } = useVote(nickname, (message) =>
    addToast(message, "error"),
  );

  const { mutate: submitReport, isPending: isSubmitting } = useCreateReport(
    nickname,
    () => {
      setShowForm(false);
      addToast("게시글이 등록되었습니다.", "success");
    },
    (message) => addToast(message, "error"),
  );

  return {
    character,
    isCharacterLoading,
    reports: reports ?? [],
    isReportsLoading,
    reportsError,
    upvote,
    downvote,
    showForm,
    setShowForm,
    submitReport,
    isSubmitting,
    toasts,
    removeToast,
  };
};
