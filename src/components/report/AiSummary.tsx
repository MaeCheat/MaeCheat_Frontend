interface AiSummaryProps {
  summary: string;
}

const AiSummary = ({ summary }: AiSummaryProps) => {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
      <p className="text-xs font-medium text-primary mb-1">AI 요약</p>
      <p className="text-sm text-text-primary leading-relaxed">{summary}</p>
    </div>
  );
};

export default AiSummary;
