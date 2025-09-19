import Logo from "../assets/logo-transparent-png.png";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful!", { autoClose: 1000, theme: "colored" });
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1000);
  };
  return (
    <div className="bg-transparent w-full relative rounded-2xl min-h-fit px-2 py-1 flex flex-row items-center gap-3 z-30">
      <Link to="/" className="inline-block h-[40px]">
        <div className="relative h-full w-[40px] h-[40px]">
          <img
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[40px]"
            src={Logo}
            alt=""
          />
        </div>
      </Link>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 rounded-2xl flex flex-row justify-between items-center gap-0">
        <Link to="/dashboard">
          <button className="rounded-2xl cursor-pointer hover:bg-white/90 mx-1 my-1 px-5 py-1 text-center text-md">
            Dashboard
          </button>
        </Link>
        <Link to="/report">
          <div className="rounded-2xl cursor-pointer hover:bg-white/90 hover:rounded-b-none mx-1 my-1 px-5 py-1 text-center text-md">
            Report
          </div>
        </Link>
        <div className="rounded-2xl cursor-pointer hover:bg-white/90 hover:rounded-b-none mx-1 my-1 px-5 py-1 text-center text-md relative group">
          Account
          <div
            onClick={() => {
              handleLogout();
            }}
            className="absolute hidden w-full top-[100%] left-0 hover:bg-gray-200 bg-white px-5 py-1 rounded-b-2xl group-hover:block"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
