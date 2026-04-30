import { useState } from "react";
import type { Report } from "../../types/report";

interface ReportListProps {
  reports: Report[];
  isLoading: boolean;
  error: Error | null;
  onUpvote: (reportId: number) => void;
  onDownvote: (reportId: number) => void;
}

const ReportList = ({
  reports,
  isLoading,
  error,
  onUpvote,
  onDownvote,
}: ReportListProps) => {
  const [showHidden, setShowHidden] = useState(false);

  if (isLoading) {
    return (
      <p className="text-sm text-white/40 text-center py-8">
        불러오는 중...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-400 text-center py-8">
        게시글을 불러올 수 없습니다.
      </p>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/40 text-sm">등록된 게시글이 없습니다.</p>
      </div>
    );
  }

  const visibleReports = reports.filter((r) => !r.hidden);
  const hiddenReports = reports.filter((r) => r.hidden);

  return (
    <div className="flex flex-col gap-3">
      {visibleReports.map((report) => (
        <ReportItem
          key={report.id}
          report={report}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
        />
      ))}

      {hiddenReports.length > 0 && (
        <>
          <button
            onClick={() => setShowHidden(!showHidden)}
            className="glass-card rounded-2xl p-5 text-center text-xs text-white/40 hover:text-white/60 transition-colors cursor-pointer"
          >
            {showHidden
              ? "숨겨진 게시글 접기"
              : `숨겨진 게시글 ${hiddenReports.length}개 보기`}
          </button>

          {showHidden &&
            hiddenReports.map((report) => (
              <ReportItem
                key={report.id}
                report={report}
                onUpvote={onUpvote}
                onDownvote={onDownvote}
                dimmed
              />
            ))}
        </>
      )}
    </div>
  );
};

interface ReportItemProps {
  report: Report;
  onUpvote: (reportId: number) => void;
  onDownvote: (reportId: number) => void;
  dimmed?: boolean;
}

const ReportItem = ({
  report,
  onUpvote,
  onDownvote,
  dimmed = false,
}: ReportItemProps) => {
  return (
    <div
      className={`glass-card rounded-2xl p-5 transition-all ${
        dimmed ? "opacity-50" : ""
      }`}
    >
      <a
        href={report.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:text-accent transition-colors cursor-pointer"
      >
        <p className="text-sm font-semibold text-white">{report.title}</p>
        <p className="text-xs text-white/30 mt-1 truncate">
          {report.sourceUrl}
        </p>
      </a>

      <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-3">
        <p className="text-xs text-white/40">이 게시글이 도움이 되었나요?</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpvote(report.id)}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-emerald-400 hover:bg-emerald-400/10 transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
            <span>{report.upvotes}</span>
          </button>
          <button
            onClick={() => onDownvote(report.id)}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
            </svg>
            <span>{report.downvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportList;
