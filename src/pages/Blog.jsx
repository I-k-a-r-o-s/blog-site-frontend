import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import moment from "moment";
import { PiUserCircleLight } from "react-icons/pi";
import { FaFacebookSquare, FaTwitter } from "react-icons/fa";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Blog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [name, setName] = useState("");
  const [userComment, setUserComment] = useState("");

  const fetchBlogData = async () => {
    const data = blog_data.find((item) => item._id === id);
    setBlogData(data);
  };

  const fetchComments = async () => {
    setCommentData(comments_data);
  };

  const addComment = async (e) => {
    e.preventDefault();
    console.log(name + "and" + userComment);
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);
  return blogData ? (
    <div>
      <Navbar />
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
          <p className="mb-4 font-semibold">{commentData.length} Comments.</p>
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

        <div className="max-w-3xl mx-auto ">
          <p className="font-semibold mb-4">Add your comment.</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              type="text"
              placeholder="Name"
              className="input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="textarea"
              placeholder="Comment"
              required
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            ></textarea>
            <button className="btn btn-primary" type="submit">
              Add Comment
            </button>
          </form>
        </div>

        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">Share on</p>
          <div className="flex gap-4">
            <FaFacebookSquare size={20} />
            <FaTwitter size={20} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loading />
  );
};
export default Blog;
