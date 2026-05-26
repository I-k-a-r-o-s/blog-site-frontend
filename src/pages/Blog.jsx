import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import moment from "moment";
import { PiUserCircleLight } from "react-icons/pi";

const Blog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchBlogData = async () => {
    const data = blog_data.find((item) => item._id === id);
    setBlogData(data);
  };

  const fetchComments = async () => {
    setCommentData(comments_data);
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);
  return blogData ? (
    <div>
      <div className="text-center mt-20">
        <p className="text-secondary py-4 font-medium">
          Published on {moment(blogData.createdAt).format("Do MMMM YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-info">
          {blogData.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{blogData.subTitle}</h2>
        <span className="badge badge-outline badge-primary font-semibold">
          Author
        </span>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={blogData.image} alt="image" className="rounded-3xl mb-5" />
        <div>{blogData.description}</div>
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p>{commentData.length} Comments.</p>
          <div className="flex flex-col gap-4">
            {commentData.map((item, index) => (
              <div
                key={index}
                className="relative max-w-xl p-4 bg-base-100 rounded border border-base-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <PiUserCircleLight size={20} />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
};
export default Blog;
