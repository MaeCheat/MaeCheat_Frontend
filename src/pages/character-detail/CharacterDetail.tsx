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

      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors cursor-pointer mb-6"
        >
          <span>&larr;</span>
          <span className="font-pixel">MaeCheat</span>
        </button>

        <div className="flex gap-6 items-start">
          {/* 좌측: 캐릭터 정보 */}
          <div className="w-72 shrink-0 sticky top-8">
            <p className="text-sm font-medium text-text-muted mb-2">캐릭터 정보</p>
            <CharacterCard character={character} />
            {character.ai_summary && <AiSummary summary={character.ai_summary} />}
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full mt-3 py-2.5 rounded-xl bg-primary text-text-inverse text-sm font-medium hover:bg-primary-hover active:bg-primary-active transition-colors cursor-pointer"
            >
              {showForm ? "등록 취소" : "+ 게시글 등록"}
            </button>
          </div>

          {/* 우측: 게시글 영역 */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-muted mb-2">
              관련 게시글
            </p>

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
    </div>
  );
};

export default CharacterDetail;
