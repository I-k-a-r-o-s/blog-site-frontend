import { LuFilePenLine } from "react-icons/lu";

const NoBlogs = ({ category }) => {
  return (
    <div className="col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-4 flex justify-center items-center">
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <LuFilePenLine size={30} />
        </div>
        <h3 className="text-2xl font-bold text-base-content mb-2">
          No Posts Yet
        </h3>
        <p className="text-base-content/70 mb-6">
          {category === "All"
            ? "No blog posts are available right now. Check back soon!"
            : `No blog posts available in the ${category} category yet. Check back soon!`}
        </p>
        <div className="badge badge-lg badge-neutral">
          Stay tuned for updates
        </div>
      </div>
    </div>
  );
};

export default NoBlogs;
