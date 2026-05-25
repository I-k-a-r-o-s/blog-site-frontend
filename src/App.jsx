import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import ParticleBackground from "./components/ParticleBackground";

const App = () => {
  return (
    <div>
      <ParticleBackground/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};
export default App;
