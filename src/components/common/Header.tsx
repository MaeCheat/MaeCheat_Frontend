import { useNavigate } from "react-router-dom";

interface HeaderProps {
  showBack?: boolean;
}

const Header = ({ showBack = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-bg-primary border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate("/")}
            className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            &larr;
          </button>
        )}
        <h1 className="text-lg font-bold text-primary">MaeCheat</h1>
      </div>
    </header>
  );
};

export default Header;
