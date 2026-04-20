import { useState } from "react";

const API_BASE = "http://localhost:8080";

const Home = () => {
  const [nickname, setNickname] = useState("");
  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const [characterName, setCharacterName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!nickname.trim()) return;

    setLoading(true);
    setError(null);
    setCharacterImage(null);

    try {
      const res = await fetch(
        `${API_BASE}/characters/basic?nickname=${encodeURIComponent(nickname)}`,
      );

      if (!res.ok) throw new Error("캐릭터를 찾을 수 없습니다.");

      const data = await res.json();
      setCharacterImage(data.characterImage);
      setCharacterName(data.characterName);
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류");
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "검색 중..." : "검색"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {characterImage && (
        <div className="flex flex-col items-center gap-2">
          <img src={characterImage} alt={characterName ?? "캐릭터"} />
          <p className="text-lg font-semibold">{characterName}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
