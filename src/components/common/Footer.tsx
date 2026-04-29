const Footer = () => {
  return (
    <footer className="relative text-center py-6 text-white/25 text-xs space-y-1">
      <p>Data based on NEXON Open API · Not affiliated with NEXON</p>
      <p>AI 요약은 자동 생성된 결과이며, 사실과 다를 수 있습니다.</p>
      <p>&copy; {new Date().getFullYear()} MaeCheat. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
