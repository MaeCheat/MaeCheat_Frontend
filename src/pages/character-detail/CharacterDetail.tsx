import { useNavigate } from "react-router-dom";
import CharacterSidebar from "../../components/character/CharacterSidebar";
import DetailHeader from "../../components/common/DetailHeader";
import Footer from "../../components/common/Footer";
import ToastContainer from "../../components/common/ToastContainer";
import ReportList from "../../components/report/ReportList";
import { useCharacterDetail } from "./useCharacterDetail";

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
      <div className="min-h-screen glass-page flex items-center justify-center">
        <p className="text-white/60">캐릭터 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen glass-page flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">캐릭터 정보가 없습니다.</p>
          <button
            onClick={() => navigate("/")}
            className="text-accent hover:underline cursor-pointer"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen glass-page relative overflow-hidden flex flex-col">
      <div className="glass-orb-1" />
      <div className="glass-orb-2" />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="relative flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        <DetailHeader />

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <CharacterSidebar
            character={character}
            showForm={showForm}
            setShowForm={setShowForm}
            submitReport={submitReport}
            isSubmitting={isSubmitting}
          />

          <div className="flex-1 min-w-0 w-full">
            <p className="text-sm font-medium text-white/40 mb-2">
              관련 게시글 {reports && <span className="text-white/25">{reports.length}건</span>}
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

      <Footer />
    </div>
  );
};

export default CharacterDetail;
