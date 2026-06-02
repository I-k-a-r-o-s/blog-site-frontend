import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import ParticleBackground from "./components/ParticleBackground";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlogPost from "./pages/admin/AddBlogPost";
import AllBlogPosts from "./pages/admin/AllBlogPosts";
import Comments from "./pages/admin/Comments";

import "quill/dist/quill.snow.css"

const App = () => {
  return (
    <div>
      <ParticleBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={true ? <Layout /> : <Home />}>
          <Route index element={<Dashboard />} />
          <Route path="addblogpost" element={<AddBlogPost />} />
          <Route path="allblogposts" element={<AllBlogPosts />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
