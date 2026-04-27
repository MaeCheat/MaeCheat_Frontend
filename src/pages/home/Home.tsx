import { useState } from "react";
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
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-primary tracking-tight">
          MaeCheat
        </h1>
        <p className="mt-2 text-text-secondary text-sm">
          메이플스토리 캐릭터 정보 조회
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="flex gap-2">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="캐릭터 닉네임 입력"
            className="flex-1 px-4 py-3 rounded-lg border border-border bg-bg-primary text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-border-focus/20 transition-all"
          />
          <button
            onClick={handleSearch}
            disabled={isPending}
            className="px-6 py-3 rounded-lg bg-primary text-text-inverse font-medium hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {isPending ? "검색 중..." : "검색"}
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-error text-center">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
