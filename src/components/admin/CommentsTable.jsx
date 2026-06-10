import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";
import { api } from "../../api/Axios";

const CommentsTable = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, content, name, isApproved } = comment;
  const blogDate = new Date(createdAt);

  const approvedStatus = async () => {
    try {
      const { data } = await api.post(`/api/admin/approve-comment/${_id}`);
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Internal Server Error!");
      console.log("Error in approvedStatus!:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you SURE you want to delete?");
      if (!confirm) {
        return;
      }

      const { data } = await api.delete(`/api/admin/delete-comment/${_id}`);
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Internal Server Error!");
      console.log("Error in handleDelete!:", error);
    }
  };

  return (
    <tr>
      <td>
        <p className="font-bold">{blog.title}</p>
      </td>
      <td>
        <span className="font-bold">Comment:</span> {content}
        <br />
        <span className="badge badge-ghost badge-sm">Name: {name}</span>
      </td>
      <td>{blogDate.toLocaleDateString()}</td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!isApproved ? (
            <button
              className="btn btn-circle btn-primary"
              onClick={approvedStatus}
            >
              <TiTickOutline size={20} />
            </button>
          ) : (
            <p className="text-success text-xs px-3 py-1">Approved</p>
          )}
          <button className="btn btn-circle btn-error" onClick={handleDelete}>
            <RiDeleteBinLine size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};
export default CommentsTable;
