import { useState } from "react";
import logo from "../../assets/logo.png";
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
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center px-4">
      <div className="mb-10 text-center flex flex-col items-center">
        <img src={logo} alt="MaeCheat" className="w-16 h-16 mb-4" />
        <h1 className="text-4xl font-bold text-primary tracking-tight font-pixel">
          MaeCheat
        </h1>
        <p className="mt-2 text-text-secondary text-sm font-pixel">
          메이플스토리 캐릭터 평판 조회
        </p>
      </div>

      <div className="w-full max-w-lg">
        <div className="relative">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="캐릭터 닉네임을 입력하세요"
            className="w-full px-5 py-4 pr-24 rounded-full border border-border bg-bg-primary text-text-primary placeholder:text-text-muted shadow-md focus:outline-none focus:border-border-focus focus:shadow-lg transition-all text-base"
          />
          <button
            onClick={handleSearch}
            disabled={isPending}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full bg-primary text-text-inverse font-medium hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled transition-colors cursor-pointer disabled:cursor-not-allowed text-sm"
          >
            {isPending ? "검색 중..." : "검색"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-error text-center">{error.message}</p>
        )}
      </div>
    </div>
  );
};

export default Home;
