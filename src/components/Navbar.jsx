//import { BiLogIn } from "react-icons/bi";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router";
import LoginModal from "./admin/LoginModal";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-300 shadow-sm py-5 sticky top-0 z-50">
      <div className="navbar-start">
        <button
          className="btn btn-ghost text-2xl gap-5"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-15 h-15 rounded-full" />
          Blog
        </button>
      </div>
      <div className="navbar-end">
        {/**<button
          className="btn btn-primary rounded-full gap-1"
          onClick={() => navigate("/admin")}
        >
          Login
          <BiLogIn size={20} />
        </button> */}
        <LoginModal/>
      </div>
    </div>
  );
};
export default Navbar;
