import { useState } from "react";
import logo from "../../assets/logo.png";
import Footer from "../../components/common/Footer";
import { useCharacterSearch } from "../../hooks/useCharacterSearch";

const Home = () => {
  const [nickname, setNickname] = useState("");
  const { isPending, error, mutate } = useCharacterSearch();

  const handleSearch = () => {
    if (!nickname.trim()) return;
    mutate({ nickname });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-dvh glass-page relative overflow-hidden flex flex-col items-center justify-center px-4">
      <div className="glass-orb-home-1" />
      <div className="glass-orb-home-2" />

      <div className="relative mb-6 text-center flex flex-col items-center">
        <div className="relative">
          <div className="absolute -left-11 md:-left-14 top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 flex items-center justify-center">
            <div className="absolute inset-[-12px] rounded-full bg-accent/20 blur-2xl" />
            <img
              src={logo}
              alt="MaeCheat"
              className="relative w-9 h-9 md:w-12 md:h-12 brightness-150 drop-shadow-[0_0_12px_rgba(232,145,58,0.5)]"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-pixel">
            Mae<span className="text-accent">Cheat</span>
          </h1>
        </div>
        <p className="text-white/50 text-xs font-pixel mt-1">
          메이플스토리 유저 AI 리포트
        </p>
      </div>

      <div className="relative w-full max-w-lg -mt-1">
        <div className="relative">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="캐릭터 닉네임을 입력하세요"
            className="w-full px-4 md:px-5 py-3 md:py-4 pr-20 md:pr-24 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md text-white placeholder:text-white/30 shadow-lg focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all text-base"
          />
          <button
            onClick={handleSearch}
            disabled={isPending}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-accent text-white font-medium hover:bg-accent-hover disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed text-xs md:text-sm"
          >
            {isPending ? "검색 중..." : "검색"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">
            {error.message}
          </p>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
