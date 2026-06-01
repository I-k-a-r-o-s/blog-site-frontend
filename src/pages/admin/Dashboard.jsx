import { useEffect, useState } from "react";
import { dashboard_data } from "../../assets/assets";
import { FaBlog } from "react-icons/fa";
import { TfiCommentAlt, TfiWrite } from "react-icons/tfi";
import { GrDocumentUpdate } from "react-icons/gr";
import TableItems from "../../components/admin/TableItems";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboardData = async () => {
    setDashboardData(dashboard_data);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <div className="flex-1 p-4 md:p-10">
      <h1 className="text-2xl text-center text-primary mb-5">Dashboard</h1>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaBlog size={20} />
          </div>
          <div className="stat-title">Blogs</div>
          <div className="stat-value">{dashboardData.blogs}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <TfiCommentAlt size={20} />
          </div>
          <div className="stat-title">Comments</div>
          <div className="stat-value">{dashboardData.comments}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <TfiWrite size={20} />
          </div>
          <div className="stat-title">Drafts</div>
          <div className="stat-value">{dashboardData.drafts}</div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 text-info">
          <GrDocumentUpdate size={20} />
          <p>Latest Blogs</p>
        </div>

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Blog Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {dashboardData.recentBlogs.map((item, index) => (
                <TableItems
                  key={item._id}
                  blog={item}
                  fetchBlogs={fetchDashboardData}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
