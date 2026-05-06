import { Route, Routes, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import CharacterDetail from "./pages/character-detail/CharacterDetail";
import Shutdown from "./pages/shutdown/Shutdown";

const UNLOCK_KEY = import.meta.env.VITE_UNLOCK_KEY || "";
const SHUTDOWN_ENABLED = import.meta.env.VITE_SHUTDOWN_ENABLED === "true";
const COOKIE_NAME = "maecheat_access";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasAccess, setHasAccess] = useState(() => {
    if (!SHUTDOWN_ENABLED) return true;
    return getCookie(COOKIE_NAME) === "granted";
  });

  useEffect(() => {
    if (!SHUTDOWN_ENABLED || !UNLOCK_KEY) return;

    const key = searchParams.get("unlock");
    if (key === UNLOCK_KEY) {
      setCookie(COOKIE_NAME, "granted", 365);
      setHasAccess(true);
      // URL에서 unlock 파라미터 제거
      searchParams.delete("unlock");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  if (!hasAccess) {
    return <Shutdown />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters/:name" element={<CharacterDetail />} />
    </Routes>
  );
}

export default App;
