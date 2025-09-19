import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../assets/logo-transparent-png.png";
import { useAuthUserMutation } from "../features/users/usersApi";
import type { AppDispatch, RootState } from "../store";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";
import Image from "../assets/image.png"; // Assuming you have an image for the login page
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const [authUser, { data, error, isSuccess }] = useAuthUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const isLogged = useSelector((state: RootState) => {
    return state.auth.isAuthenticated;
  });

  useEffect(() => {
    if (isLogged) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log("id" in data);
      if ("id" in data) {
        dispatch(
          loginSuccess({
            user: { id: data.id, email: data.email },
            token: data.token,
          })
        );
      }
      toast.success("Login successful!", { autoClose: 2000, theme: "colored" });

      navigate("/dashboard", { replace: true });
    }
    if (error) {
      if ("error" in error) {
        dispatch(loginFailure(error.error));
      }
      let message = "Unknown error";
      if ("data" in error) {
        const dataTemp = error.data as {
          error?: string;
        };
        message = dataTemp.error || "Request failed";
      } else if ("message" in error) {
        message = error.message || "Something went wrong";
      }
      toast.warn(message, { autoClose: 3000, theme: "colored" });
    }
  }, [navigate, error, data]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authUser({ email: email, password: password });
    dispatch(loginStart());
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white md:bg-gray-100">
      <div className="w-full p-2.5 rounded  h-screen flex flex-row justify-center items-center">
        <div className="w-3/3 md:w-1/2 h-full flex items-center justify-center">
          <div className="w-3/4 md:w-2/4 max-w-[350px]">
            <div className="flex justify-center ">
              <Link to={"/"}>
                <img src={Logo} alt="" className="h-26 w-auto" />
              </Link>
            </div>
            {/* <button className="hover:bg-[#d8e4f8] cursor-pointer flex flex-row justify-center align-middle text-sm whitespace-nowrap w-full p-1 my-2 border border-gray-300 rounded">
              <img className="mr-1 w-[16px]" src={GoogleSvg} alt="" />
              Continue with Google
            </button>
            <button className="hover:bg-[#d8e4f8] cursor-pointer flex flex-row justify-center align-middle text-sm whitespace-nowrap w-full p-1 border border-gray-300 rounded">
              <img className="mr-1 w-[16px]" src={GithubSvg} alt="" />
              Continue with Github
            </button>
            <div className="flex items-center my-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="text-sm flex-shrink mx-4 text-gray-400">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div> */}
            <form onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:outline-black w-full text-sm p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className=" block mb-2 text-sm font-medium text-black-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="focus:outline-black text-sm w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className={`border-black border text-white cursor-pointer bg-black w-full font-bold py-1 px-2 rounded-lg hover:bg-white hover:text-black focus:outline-none focus:shadow-outline transition duration-300 `}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden md:block w-1/2 h-full items-center justify-center">
          <img
            className="rounded h-full w-full object-cover"
            src={Image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
