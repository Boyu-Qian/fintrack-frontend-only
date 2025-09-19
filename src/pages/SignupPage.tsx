import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-transparent-png.png";
import Image from "../assets/image.png";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "../features/users/usersApi";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassMatch, setShowPassMatch] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [createUser, { error, isLoading, isSuccess }] = useCreateUserMutation();
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
      toast.success("Sign up successful!", {
        autoClose: 3000,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    }
    if (error) {
      let message = "Unknown error";
      if ("data" in error) {
        const data = error.data as {
          errors?: { password: string[] };
          error?: string;
        };
        message = data.error || data.errors?.password[0] || "Request failed";
      } else if ("message" in error) {
        message = error.message || "Something went wrong";
      }
      toast.warn(message, { autoClose: 3000, theme: "colored" });
    }
  }, [isSuccess, error, navigate]);
  const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[\w.-]+@[\w.-]+\.\w+$/;
    if (!regex.test(event.target.value)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const handleCreateUser = async () => {
    const newUser = { email: email, password: password };
    createUser(newUser);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateUser();
  };
  const matchPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (password === event.target.value) {
      setShowPassMatch(false);
    } else {
      setShowPassMatch(true);
    }
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

            <div className="flex items-center my-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="text-sm flex-shrink mx-4 text-black-400">
                Sign Up
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <form onSubmit={handleSubmit}>
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e);
                  }}
                  className={`focus:outline-black w-full text-sm p-2 border border-gray-300 rounded ${
                    emailValid ? "mb-4" : "mb-0"
                  }`}
                  placeholder="Enter your email"
                  required
                />
                <div
                  className={`mb-4 text-sm ${emailValid ? "hidden" : "block"}`}
                >
                  Your email address is not valid
                </div>
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
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black-700"
                >
                  Repeat Password
                </label>
                <input
                  id="passwordRepeat"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                    matchPassHandler(e);
                  }}
                  required
                  className={`focus:outline-black text-sm w-full p-2 border border-gray-300 rounded ${
                    showPassMatch ? "mb-0" : "mb-4"
                  }`}
                  placeholder="Enter your password"
                />
                <div
                  className={`text-sm ${
                    showPassMatch ? "mb-4 block" : "hidden"
                  }`}
                >
                  Your passowrd doesn't match
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={
                    !emailValid || password !== repeatPassword || isLoading
                  }
                  className={`${
                    !emailValid || password !== repeatPassword
                      ? "bg-gray-300 cursor-not-allowed"
                      : ""
                  } border-black border text-white bg-black w-full font-bold py-1 px-2 rounded-lg hover:bg-white hover:text-black focus:outline-none focus:shadow-outline transition duration-300 `}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden md:block w-1/2 h-full flex items-center justify-center">
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
