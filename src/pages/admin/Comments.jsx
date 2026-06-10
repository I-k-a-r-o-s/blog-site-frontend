import { useEffect, useState } from "react";
import CommentsTable from "../../components/admin/CommentsTable";
import { api } from "../../api/Axios";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = async () => {
    try {
      const { data } = await api.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error("Internal Server Error!");
      console.log("Error in fetchComments!:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-2xl text-primary pb-5">Comments</h1>
        <div>
          <button
            onClick={() =>
              setFilter((prev) =>
                prev === "Approved" ? "Not Approved" : "Approved",
              )
            }
            className={`btn ${filter === "Approved" ? "btn-success" : "btn-warning"}`}
          >
            {filter === "Approved" ? "Approved" : "Not Approved"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Blog Title</th>
              <th>Comment & Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "Approved") {
                  return comment.isApproved === true;
                }
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentsTable
                  key={comment._id}
                  comment={comment}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Comments;
