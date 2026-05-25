import { useState } from "react";
import { motion } from "motion/react";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const blogCategories = [
    "All",
    "Technology",
    "Startup",
    "Lifestyle",
    "Finance",
  ];
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 reactive">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <motion.button animate={{ rotate: 360 }} transition={{ duration: 1 }}
              className={`btn ${menu === item ? "btn-primary" : "btn-outline btn-primary"}`}
              onClick={() => setMenu(item)}
            >
              {item}
            </motion.button>
          </div>
        ))}
      </div>
      <div className="">{/*blog cards*/}</div>
    </div>
  );
};
export default BlogList;
