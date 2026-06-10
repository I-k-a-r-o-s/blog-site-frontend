import { RiDeleteBinLine } from "react-icons/ri";
import { api } from "../../api/Axios";
import toast from "react-hot-toast";

const TableItems = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const blogDate = new Date(createdAt);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you SURE you want to delete?");
    if (!confirmDelete) {
      return;
    }

    try {
      const { data } = await api.delete(`/api/blog/delete/${blog._id }`);
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Internal Server Error!");
      console.log("Error in handleDelete!:", error);
    }
  };

  const publishedStatus=async()=>{
    try {
      const { data } = await api.post(`/api/blog/published-state/${blog._id }`);
      if(data.success){
        toast.success(data.message)
        await fetchBlogs()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Internal Server Error!")
      console.log("Error in publishedStatus!:",error)
    }
  }
  return (
    <tr>
      <th>{index}</th>
      <td>{title}</td>
      <td>{blogDate.toLocaleDateString()}</td>
      <td>
        <p className={`${blog.isPublished ? "text-success" : "text-error"}`}>
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="flex gap-3">
        <button
          className={`btn ${blog.isPublished ? "btn-warning" : "btn-primary"}`}
          onClick={publishedStatus}
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <button className="btn btn-dash btn-error btn-circle" onClick={handleDelete} >
          <RiDeleteBinLine size={20} />
        </button>
      </td>
    </tr>
  );
};
export default TableItems;
