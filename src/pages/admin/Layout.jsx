import { Outlet, useNavigate } from "react-router";
import logo from "../../assets/logo.jpeg";
import Sidebar from "../../components/admin/Sidebar";
import { FiSidebar } from "react-icons/fi";

{
  /**
        <>
    <div className="flex">
        <img src={logo} alt="logo" className="w-32 sm:w-40 cursor-pointer"
        onClick={()=>{navigate("/")}}
        />
        <button>Logout</button>
    </div>
    <div className="flex">
        <Sidebar/>
        <Outlet/>
    </div>
    </>
         */
}

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <div className="navbar-start">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <FiSidebar size={20} />
            </label>
            <div className="px-4">
              <img
                src={logo}
                alt="logo"
                className="w-15 h-15 rounded-full"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
          </div>
          <div className="navbar-end">
            <button className="btn btn-primary">Logout</button>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">         
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
export default Layout;
