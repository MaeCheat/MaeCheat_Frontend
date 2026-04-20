import { useState } from "react";
import { getCharacterBasic } from "../api/maple-character-api";
import { useMutation } from "@tanstack/react-query";

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
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="캐릭터 닉네임 입력"
          className="border rounded px-4 py-2 w-64"
        />
        <button
          onClick={handleSearch}
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isPending ? "검색 중..." : "검색"}
        </button>
      </div>

      {error && <p className="text-red-500">{error.message}</p>}

      {data && (
        <div className="flex flex-col items-center gap-2">
          <img src={data.characterImage} alt={data.characterName ?? "캐릭터"} />
          <p className="text-lg font-semibold">{data.characterName}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
