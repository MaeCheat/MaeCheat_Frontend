import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useReportsQuery, useCreateReport, useVote } from "../../hooks/useReports";
import { useToast } from "../../hooks/useToast";
import CharacterCard from "../../components/character/CharacterCard";
import AiSummary from "../../components/report/AiSummary";
import ReportForm from "../../components/report/ReportForm";
import ReportList from "../../components/report/ReportList";
import ToastContainer from "../../components/common/ToastContainer";

const CharacterDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const character = location.state?.character;

  const [showForm, setShowForm] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const nickname = character?.character_name ?? "";

  const { data: reports, isLoading, error } = useReportsQuery(nickname);
  const { upvote, downvote } = useVote(nickname);
  const { mutate: submitReport, isPending: isSubmitting } = useCreateReport(
    nickname,
    () => {
      setShowForm(false);
      addToast("게시글이 등록되었습니다.", "success");
    },
    (message) => addToast(message, "error")
  );

  if (!character) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">캐릭터 정보가 없습니다.</p>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline cursor-pointer"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-secondary">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors cursor-pointer mb-4"
        >
          <span>&larr;</span>
          <span className="font-pixel">MaeCheat</span>
        </button>
        <CharacterCard character={character} />

        {character.ai_summary && <AiSummary summary={character.ai_summary} />}

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">
              관련 게시글
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-9 h-9 rounded-lg bg-primary text-text-inverse flex items-center justify-center hover:bg-primary-hover active:bg-primary-active transition-colors text-xl leading-none cursor-pointer"
            >
              {showForm ? "×" : "+"}
            </button>
          </div>

          {showForm && (
            <ReportForm
              onSubmit={submitReport}
              isSubmitting={isSubmitting}
              onCancel={() => setShowForm(false)}
            />
          )}

          <ReportList
            reports={reports ?? []}
            isLoading={isLoading}
            error={error}
            onUpvote={upvote}
            onDownvote={downvote}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
