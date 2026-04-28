import { useState } from "react";

interface ReportFormProps {
  onSubmit: (sourceUrl: string) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

const ReportForm = ({ onSubmit, isSubmitting, onCancel }: ReportFormProps) => {
  const [sourceUrl, setSourceUrl] = useState("");

  const handleSubmit = () => {
    if (!sourceUrl.trim()) return;
    onSubmit(sourceUrl);
    setSourceUrl("");
  };

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-white">게시글 링크 등록</p>
        <button
          onClick={onCancel}
          className="text-white/40 hover:text-white text-sm cursor-pointer"
        >
          취소
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="url"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="https://..."
          className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.06] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? "등록 중..." : "등록"}
        </button>
      </div>
    </div>
  );
};

export default ReportForm;
