import { useNavigate } from "react-router";
import DOMPurify from "dompurify";

const BlogCard = ({ blog }) => {
  const { _id, title, description, category, image } = blog;
  const safeHtml = DOMPurify.sanitize(description);
  const navigate = useNavigate();
  return (
    <div
      className="hover-3d cursor-pointer"
      onClick={() => navigate(`/blog/${_id}`)}
    >
      <div className="card bg-base-200 shadow-sm">
        <figure className="overflow-hidden rounded-t-lg h-56 bg-base-300">
          {image ? (
            <img
              src={image}
              alt="Blog image"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full skeleton" />
          )}
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="text-3xl font-medium">{title}</h2>
          </div>
          <span className="badge badge-sm badge-soft badge-secondary">
            {category}
          </span>
          <p
            className="text-xs"
            dangerouslySetInnerHTML={{
              __html: safeHtml ? `${safeHtml.slice(0, 80)}...` : "",
            }}
          />
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default BlogCard;
