import { forwardRef } from "react";
import { Xenon } from "uvcanvas";
import { useState } from "react";
import LogoWhite from "../assets/logo-white-transparent-png.png";
import FaceBook from "../assets/facebook-f-brands-solid-full.svg";
import Ins from "../assets/instagram-brands-solid-full.svg";
import Pin from "../assets/pinterest-p-brands-solid-full.svg";
import You from "../assets/youtube-brands-solid-full.svg";
interface FooterProps {
  navSize: { width: number; height: number };
  isIntersecting4: boolean;
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(
  ({ navSize, isIntersecting4 }, div4Ref) => {
    const [subscribe, setSubsribe] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const handleSubscribe = () => {
      setSubsribe(true);
    };
    const submitHandler = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };
    return (
      <div
        ref={div4Ref}
        className="relative snap-start snap-always"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Xenon />
        <div
          className={`z-20 absolute bottom-0 left-0 w-[65%] overflow-hidden h-[75vh] bg-black rounded-tr-4xl transition-all duration-1000 ${
            isIntersecting4 ? "-translate-x-[0%]" : "-translate-x-[100%]"
          }`}
          style={{
            paddingLeft: `calc(50vw - ${navSize.width / 2}px)`,
          }}
        >
          <div className="z-20 container h-[100%] bg-black flex flex-col md:flex-row md:p-3 pt-3 pr-3">
            <div className="text-white font-domine space-x-4 w-[100%] md:w-[50%] lg:w-[33%] mb-4">
              Take control of your life with effortless expense tracking, smart
              insights, clear reports, and peace of mind – because financial
              freedom starts with clarity.
              <div className="flex flex-row justify-start md:justify-start  gap-3 items-start mt-2 w-[100%]">
                <div className="w-[40px] h-[40px] bg-white rounded-full relative cursor-not-allowed">
                  <img
                    src={FaceBook}
                    alt="Facebook"
                    className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[80%] h-[80%]"
                  />
                </div>
                <div className="w-[40px] h-[40px] bg-white rounded-full relative cursor-not-allowed">
                  <img
                    src={Ins}
                    alt="Facebook"
                    className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[80%] h-[80%]"
                  />
                </div>
                <div className="w-[40px] h-[40px] bg-white rounded-full relative cursor-not-allowed">
                  <img
                    src={Pin}
                    alt="Facebook"
                    className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[80%] h-[80%]"
                  />
                </div>
                <div className="w-[40px] h-[40px] bg-white rounded-full relative cursor-not-allowed">
                  <img
                    src={You}
                    alt="Facebook"
                    className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[80%] h-[80%]"
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%] md:w-[50%] lg:w-[67%] bg-black border-gray-300 border-t-1 md:border-0 text-center">
              <p
                className={`text-white font-domine mb-2 mt-2 ${
                  subscribe || submitted ? "hidden" : "block"
                }`}
              >
                Sign up for our newsletter to get the latest updates and offers.
              </p>
              <button
                onClick={handleSubscribe}
                className={`${
                  subscribe || submitted ? "hidden" : "block"
                } bg-white mx-auto text-black px-4 py-2 rounded-md border border-black border-1 hover:bg-black hover:text-white hover:border-1 hover:border-white hover:border-black transition-colors duration-300`}
              >
                Subscribe
              </button>
              <div
                className={`${
                  subscribe ? (submitted ? "hidden" : "block") : "hidden"
                } border border-white border-1 mt-2 rounded-xl focus:outline-none focus:ring-0`}
              >
                <p className="text-white font-domine text-sm p-2">
                  By entering your email, you agree that we collect your email
                  address.
                </p>
                <form onSubmit={submitHandler}>
                  <input
                    className="bg-white w-[90%] max-w-[350px] px-3 py-2 rounded-xl block mx-auto mb-2 focus:outline-none focus:ring-0"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="text-black w-[90%] max-w-[350px] bg-white px-3 py-2 rounded-xl mb-2 border border-black border-1 hover:bg-black hover:border-white hover:text-white hover:border-1 transition-colors duration-300"
                  >
                    Subscribe now
                  </button>
                </form>
              </div>
              <div
                className={`text-white mt-2 ${submitted ? "block" : "hidden"}`}
              >
                <p>
                  Thank you for providing your email. We have stored your email
                  in our database.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`z-20 absolute bottom-0 right-0  w-[33%] overflow-hidden h-[75vh] bg-black rounded-tl-4xl transition-all duration-1000 ${
            isIntersecting4 ? "translate-x-[0%]" : "translate-x-[50%]"
          }`}
          style={{
            paddingRight: `calc(50vw - ${navSize.width / 2}px)`,
          }}
        >
          <div className="z-20 container h-[100%] bg-black pl-3 pt-3">
            <div className="flex flex-col justify-center items-center text-center md:flex-row md:justify-start">
              <img
                className="w-[50px] md:w-[70px] inline-block"
                src={LogoWhite}
                alt=""
              />
              <p className="text-white text-sm inline-block">
                &copy; 2024 Fintrack. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Footer;
