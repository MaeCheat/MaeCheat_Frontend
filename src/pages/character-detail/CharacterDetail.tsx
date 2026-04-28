import { useNavigate } from "react-router-dom";
import { useCharacterDetail } from "./useCharacterDetail";
import CharacterCard from "../../components/character/CharacterCard";
import AiSummary from "../../components/report/AiSummary";
import ReportForm from "../../components/report/ReportForm";
import ReportList from "../../components/report/ReportList";
import ToastContainer from "../../components/common/ToastContainer";

const CharacterDetail = () => {
  const navigate = useNavigate();
  const {
    character,
    isCharacterLoading,
    reports,
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
  } = useCharacterDetail();

  if (isCharacterLoading) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <p className="text-text-secondary">캐릭터 정보를 불러오는 중...</p>
      </div>
    );
  }

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
            <div className="flex flex-col gap-3">
              <CharacterCard character={character} />
              {character.ai_summary && <AiSummary summary={character.ai_summary} />}
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full py-2.5 rounded-xl bg-primary text-text-inverse text-sm font-medium hover:bg-primary-hover active:bg-primary-active transition-colors cursor-pointer"
              >
                {showForm ? "등록 취소" : "+ 게시글 등록"}
              </button>
              {showForm && (
                <ReportForm
                  onSubmit={submitReport}
                  isSubmitting={isSubmitting}
                  onCancel={() => setShowForm(false)}
                />
              )}
            </div>
          </div>

          {/* 우측: 게시글 영역 */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-muted mb-2">
              관련 게시글
            </p>

            <ReportList
              reports={reports}
              isLoading={isReportsLoading}
              error={reportsError}
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
