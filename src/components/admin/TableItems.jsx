import { RiDeleteBinLine } from "react-icons/ri";

const TableItems = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const blogDate = new Date(createdAt);
  return (
    <tr>
      <th>{index}</th>
      <td>{title}</td>
      <td>{blogDate.toLocaleString()}</td>
      <td>
        <p className={`${blog.isPublished ? "text-success" : "text-error"}`}>
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="flex gap-3">
        <button
          className={`btn ${blog.isPublished ? "btn-warning" : "btn-primary"}`}
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <button className="btn btn-dash btn-error btn-circle">
          <RiDeleteBinLine size={20} />
        </button>
      </td>
    </tr>
  );
};
export default TableItems;
