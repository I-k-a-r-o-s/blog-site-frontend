import { useState } from "react";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
import NoBlogs from "./NoBlogs";

const BlogList = () => {
  const [menu, setMenu] = useState("All");

  const { blogs, input } = useAppContext();

  const blogCategories = [
    "All",
    "Technology",
    "Startup",
    "Lifestyle",
    "Finance",
  ];

  const filterBlogs = () => {
    if (input === "") {
      return blogs;
    }
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase()),
    );
  };
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 reactive">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <motion.button
              animate={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className={`btn ${menu === item ? "btn-primary" : "btn-outline btn-primary"}`}
              onClick={() => setMenu(item)}
            >
              {item}
            </motion.button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filterBlogs().filter((blog) =>
          menu === "All" ? true : menu === blog.category,
        ).length === 0 ? (
          <NoBlogs category={menu} />
        ) : (
          filterBlogs()
            .filter((blog) => (menu === "All" ? true : menu === blog.category))
            .map((blog) => <BlogCard key={blog._id} blog={blog} />)
        )}
      </div>
    </div>
  );
};
export default BlogList;
