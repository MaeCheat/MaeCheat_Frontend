import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const DetailHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1 text-sm text-white/40 hover:text-accent transition-colors cursor-pointer"
      >
        <span>&larr;</span>
        <span className="font-pixel">MaeCheat</span>
      </button>

      <SearchBar />
    </div>
  );
};

export default DetailHeader;
