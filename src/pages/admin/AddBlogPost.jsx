import { useEffect, useRef, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import Quill from "quill";
import toast from "react-hot-toast";
import { api } from "../../api/Axios";
import { parse } from "marked";
import DOMPurify from "dompurify";

const AddBlogPost = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("StartuP");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const blogCategories = ["Technology", "Startup", "Lifestyle", "Finance"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await api.post("/api/blog/add", formData);
      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in handleSubmit!", error);
      toast.error("internal Server Error!");
    } finally {
      setLoading(false);
    }
  };

  const generateBlogPost = async () => {
    try {
      if (!title) {
        return toast.error("Title is REQUIRED!");
      }

      setLoading(true);
      quillRef.current.root.innerHTML = "";

      const { data } = await api.post("/api/blog/generate", { prompt: title });
      if (data.success) {
        quillRef.current.root.innerHTML = DOMPurify.sanitize(
          parse(data.aiBlog),
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in generateBlogPost!", error);
      toast.error("Internal Server Error!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);
  return (
    <div>
      <h1 className="text-2xl text-primary pb-5 text-center">Add Blog Post</h1>
      <form onSubmit={handleSubmit} className="flex-1 h-full overflow-scroll">
        <div className="bg-base-200 w-full max-w-3xl p-4 md:p-10 sm:m-10 rounded">
          <p>Upload Thumbnail</p>
          <label className="label">
            {!image ? (
              <>
                <BsCloudUpload
                  size={30}
                  className="mt-2 mx-12 cursor-pointer"
                />
                <input
                  type="file"
                  id="image"
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </>
            ) : (
              <>
                <img
                  src={URL.createObjectURL(image)}
                  alt="image"
                  className="mx-8 mt-2 w-15 h-15 rounded"
                />
              </>
            )}
          </label>
          <p className="mt-4 mb-2">Blog Title</p>
          <input
            type="text"
            className="input"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <p className="mt-4 mb-2">Subtitle</p>
          <input
            type="text"
            className="input"
            placeholder="Title"
            required
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />

          <p className="mt-4 mb-2">Blog Description</p>
          <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
            <div ref={editorRef}></div>
            <button
              className="btn btn-secondary absolute bottom-1 right-2 ml-2 px-4 py-1.5"
              onClick={generateBlogPost}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Generate with AI"
              )}
            </button>
          </div>

          <p className="mt-4 mb-2">Blog Category</p>
          <select
            className="select"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" hidden>
              Select Category
            </option>
            {blogCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="flex gap-2 mt-4">
            <p>Publish Now</p>
            <input
              type="checkbox"
              className="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          </div>

          <button
            disabled={loading}
            className="btn btn-primary mt-8"
            type="submit"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Add Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddBlogPost;
