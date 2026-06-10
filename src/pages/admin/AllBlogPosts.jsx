import { useEffect, useState } from "react";
import TableItems from "../../components/admin/TableItems";
import { api } from "../../api/Axios";
import toast from "react-hot-toast";

const AllBlogPosts = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/api/admin/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in fetchBlogs!:", error);
      toast.error("Internal Server Error!");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="mb-5 text-center text-primary text-2xl">All Blogs</h1>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Blog Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {blogs.map((item, index) => (
              <TableItems
                key={item._id}
                blog={item}
                fetchBlogs={fetchBlogs}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllBlogPosts;
