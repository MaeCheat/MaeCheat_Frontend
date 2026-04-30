import type { MapleCharacterResponse } from "../../types/maple-character";
import AiSummary from "../report/AiSummary";
import ReportForm from "../report/ReportForm";
import CharacterCard from "./CharacterCard";

interface CharacterSidebarProps {
  character: MapleCharacterResponse;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  submitReport: (sourceUrl: string) => void;
  isSubmitting: boolean;
}

const CharacterSidebar = ({
  character,
  showForm,
  setShowForm,
  submitReport,
  isSubmitting,
}: CharacterSidebarProps) => {
  return (
    <div className="w-full md:w-72 shrink-0 md:sticky md:top-8">
      <p className="text-sm font-medium text-white/40 mb-2">캐릭터 정보</p>
      <div className="flex flex-col gap-3">
        <CharacterCard character={character} />
        {character.ai_summary && <AiSummary summary={character.ai_summary} />}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors cursor-pointer"
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
  );
};

export default CharacterSidebar;
