import { RiDeleteBinLine } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";

const CommentsTable = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, content, name, isApproved } = comment;
  const blogDate = new Date(createdAt);
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
            <button className="btn btn-circle btn-primary">
              <TiTickOutline size={20} />
            </button>
          ) : (
            <p className="text-success text-xs px-3 py-1">Approved</p>
          )}
          <button className="btn btn-circle btn-error">
            <RiDeleteBinLine size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};
export default CommentsTable;
