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
    <div className="bg-bg-primary rounded-xl border border-border/50 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-text-primary">게시글 링크 등록</p>
        <button
          onClick={onCancel}
          className="text-text-muted hover:text-text-primary text-sm cursor-pointer"
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
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-bg-secondary text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-border-focus/20 transition-all"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg bg-primary text-text-inverse text-sm font-medium hover:bg-primary-hover disabled:bg-primary-disabled transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? "등록 중..." : "등록"}
        </button>
      </div>
    </div>
  );
};

export default ReportForm;
