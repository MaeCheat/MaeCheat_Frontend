const Footer = () => {
  return (
    <footer className="relative text-center py-6 text-white/25 text-xs space-y-1">
      <p>AI 요약은 자동 생성된 결과이며, 사실과 다를 수 있습니다.</p>
      <p>Data based on NEXON Open API · Not affiliated with NEXON</p>
      <p>
        &copy; {new Date().getFullYear()} MaeCheat. All rights reserved.
        <span className="hidden md:inline"> · </span>
        <br className="md:hidden" />
        <a
          href="mailto:shin1488dev@gmail.com"
          className="hover:text-white/50 transition-colors"
        >
          Contact: shin1488dev@gmail.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
