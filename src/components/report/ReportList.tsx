import type { Report } from "../../types/report";

interface ReportListProps {
  reports: Report[];
  isLoading: boolean;
  error: Error | null;
}

const ReportList = ({ reports, isLoading, error }: ReportListProps) => {
  if (isLoading) {
    return (
      <p className="text-sm text-text-muted text-center py-8">
        불러오는 중...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-error text-center py-8">
        게시글을 불러올 수 없습니다.
      </p>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted text-sm">등록된 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {reports.map((report) => (
        <a
          key={report.id}
          href={report.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-bg-primary rounded-xl border border-border/50 p-4 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
        >
          <p className="text-sm font-medium text-text-primary">
            {report.title}
          </p>
          <p className="text-xs text-text-muted mt-1 truncate">
            {report.sourceUrl}
          </p>
        </a>
      ))}
    </div>
  );
};

export default ReportList;
