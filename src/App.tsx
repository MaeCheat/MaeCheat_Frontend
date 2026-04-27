import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import CharacterDetail from "./pages/character-detail/CharacterDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters/:name" element={<CharacterDetail />} />
    </Routes>
  );
}

export default App;
