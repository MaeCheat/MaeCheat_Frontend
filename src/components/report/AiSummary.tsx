interface AiSummaryProps {
  summary: string;
}

const AiSummary = ({ summary }: AiSummaryProps) => {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
      <div className="flex items-center gap-1.5 mb-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 2l1.2 3.8L14.5 7l-3.8 1.2L9.5 12l-1.2-3.8L4.5 7l3.8-1.2L9.5 2z" fill="currentColor" />
          <path d="M18 8l.9 2.6L21.5 12l-2.6.9L18 15.5l-.9-2.6L14.5 12l2.6-.9L18 8z" fill="currentColor" />
          <path d="M12 15l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1z" fill="currentColor" />
        </svg>
        <p className="text-base font-bold text-primary">AI 요약</p>
      </div>
      <p className="text-sm text-text-primary leading-relaxed">{summary}</p>
    </div>
  );
};

export default AiSummary;
