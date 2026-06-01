import { FaRegCommentDots } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { LuClipboardList, LuClipboardPenLine } from "react-icons/lu";
import { Link, NavLink } from "react-router";
{/**<NavLink
        end={true}
        to={"/admin"}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive}`
        }
      >
        <IoHomeOutline size={20} />
        <p className="hidden md:inline-block">Dashboardz</p>
      </NavLink> */}
const Sidebar = () => {
  return (
    <div>
       <ul className="menu w-full grow gap-10">
        <Link to={"/admin"}>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
            {/* Home icon */}
            <IoHomeOutline size={20}/>
            <span className="is-drawer-close:hidden">Dashboard</span>
          </button>
        </li>
        </Link>

        <Link to={"/admin/addblogpost"}>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Blog Post">
            {/* Home icon */}
            <LuClipboardPenLine  size={20}/>
            <span className="is-drawer-close:hidden">Add Blog Post</span>
          </button>
        </li>
        </Link>
        
        <Link to={"/admin/allblogposts"}>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Blog Posts">
            {/* Home icon */}
            <LuClipboardList  size={20}/>
            <span className="is-drawer-close:hidden">All Blog Posts</span>
          </button>
        </li>
        </Link>

        <Link to={"/admin/comments"}>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Comments">
            {/* Home icon */}
            <FaRegCommentDots   size={20}/>
            <span className="is-drawer-close:hidden">Comments</span>
          </button>
        </li>
        </Link>
     
      </ul>
    </div>
  );
};
export default Sidebar;
