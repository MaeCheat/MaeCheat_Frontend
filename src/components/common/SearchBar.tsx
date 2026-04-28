import { useState } from "react";
import { useCharacterSearch } from "../../hooks/useCharacterSearch";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder = "캐릭터 검색" }: SearchBarProps) => {
  const [nickname, setNickname] = useState("");
  const { isPending, mutate } = useCharacterSearch();

  const handleSearch = () => {
    if (nickname.trim()) mutate({ nickname });
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder={placeholder}
        className="w-full px-4 py-2 pr-10 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
      />
      <button
        onClick={handleSearch}
        disabled={isPending}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-white/40 hover:text-accent disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
