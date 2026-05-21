import { IoSearch } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const Header = () => {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>AI Powered!</p>
          <FaStar />
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-primary-content">
          Your own <span className="text-primary">blog</span> <br />
          platform!
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-secondary-content">
          Whatever is in your mind, write it and share with the world. Doesn't
          matter its one word or a thousand!
        </p>

        <form>
          <div className="join">
            <label className="input join-item">
              <IoSearch size={20} />
              <input
                type="search"
                required
                placeholder="Search for posts"
                required
              />
            </label>
            <button className="btn btn-primary join-item">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Header;
