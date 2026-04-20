import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { getCharacterBasic } from "../api/maple-character-api";

const Home = () => {
  const [nickname, setNickname] = useState("");

  const { data, isPending, error, mutate } = useMutation({
    mutationFn: getCharacterBasic,
  });

  const handleSearch = () => {
    if (!nickname.trim()) return;
    mutate({ nickname });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center px-4">
      {/* 타이틀 */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-primary tracking-tight">
          MaeCheat
        </h1>
        <p className="mt-2 text-text-secondary text-sm">
          메이플스토리 캐릭터 정보 조회
        </p>
      </div>

      {/* 검색 영역 */}
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

        {/* 에러 */}
        {error && (
          <p className="mt-3 text-sm text-error text-center">{error.message}</p>
        )}
      </div>

      {/* 결과 카드 */}
      {data && (
        <div className="mt-10 bg-bg-primary rounded-2xl shadow-lg p-8 w-full max-w-sm border border-border/50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-xl bg-bg-tertiary flex items-center justify-center overflow-hidden">
              <img
                src={data.character_image}
                alt={data.character_name ?? "캐릭터"}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-text-primary">
                {data.character_name}
              </p>
              <p className="text-sm text-text-secondary mt-1">
                Lv.{data.character_level} {data.character_class}
              </p>
              <div className="mt-3 flex items-center gap-2 justify-center">
                <span className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                  {data.world_name}
                </span>
                {data.character_guild_name && (
                  <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    {data.character_guild_name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
