import { useState } from "react";
import toast from "react-hot-toast";
import { BiLogIn } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { useAppContext } from "../../context/AppContext";
import { api } from "../../api/Axios";
import { useNavigate } from "react-router";
import { MdClose } from "react-icons/md";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { token, setToken } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/admin/login", { email, password });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        api.defaults.headers.common["Authorization"] = data.token;
        document.getElementById("login_modal").close();
        toast.success(data.message || "Logged in successfully!");
        navigate("/admin");
      } else {
        toast.error(data.message || "Internal Server Error!");
      }
    } catch (error) {
      console.log("Error in handleSubmit!", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Internal Server Error!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {token ? (
        <button
          className="btn btn-primary btn-sm sm:btn-md rounded-full gap-1"
          onClick={() => navigate("/admin")}
        >
          Dashboard
        </button>
      ) : (
        <button
          className="btn btn-primary btn-sm sm:btn-md rounded-full gap-1"
          onClick={() => document.getElementById("login_modal").showModal()}
        >
          Login
          <BiLogIn size={20} />
        </button>
      )}

      <dialog id="login_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full max-w-md rounded-3xl border border-base-300/60 bg-base-100 p-6 shadow-2xl sm:p-8">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3"
            onClick={() => document.getElementById("login_modal").close()}
            aria-label="Close login modal"
            type="button"
          >
            <MdClose size={20} />
          </button>

          <div className="text-center">
            <h3 className="text-2xl font-bold">Admin Login</h3>
            <p className="mt-2 text-sm opacity-70">
              Enter Admin Credentials to access admin panel.
            </p>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit} className="w-full">
              <fieldset className="space-y-4">
                <div className="space-y-1 text-left">
                  <label className="label px-0 pb-1 pt-0">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full rounded-2xl"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="label px-0 pb-1 pt-0">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full rounded-2xl pr-12"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      title={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center rounded-r-2xl px-3 text-base-content/60 hover:text-base-content"
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-primary w-full rounded-2xl"
                  type="submit"
                >
                  {loading ? (
                    <span className="loading loading-ring loading-lg"></span>
                  ) : (
                    <>
                      Login
                      <LuLogIn size={20} />
                    </>
                  )}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LoginModal;
