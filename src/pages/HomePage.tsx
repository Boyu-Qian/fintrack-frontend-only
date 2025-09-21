import NaviBar from "../components/NaviBar";
import Image1 from "../assets/未命名的设计 (1).png";
import Tracking from "../assets/Tracking.png";
import Transparent1 from "../assets/transparent1.svg";
import Transparent2 from "../assets/transparent2.svg";
import Transparent3 from "../assets/transparent3.svg";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Lumiflex, Zenitho, Tranquiluxe } from "uvcanvas";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useResizeObserver from "../hooks/useResizeObserver";
import Footer from "../components/Footer";

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  // const div1Ref = useRef<HTMLDivElement>(null);
  // const div2Ref = useRef<HTMLDivElement>(null);
  // const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const options4 = useRef({ threshold: 0.5 });
  const isIntersecting4 = useIntersectionObserver(div4Ref, options4.current);
  const navSize = useResizeObserver(navRef, { box: "border-box" });

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrolled(scrollRef.current.scrollTop > 50);
      }
    };

    const scrollDiv = scrollRef.current;
    if (scrollDiv) {
      scrollDiv.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollDiv) {
        scrollDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return (
    <>
      <NaviBar ref={navRef} scrolled={scrolled} />
      <div
        ref={scrollRef}
        className="snap-y snap-mandatory overflow-y-scroll h-screen w-screen overflow-hidden"
      >
        <div
          className="relative snap-start snap-always"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Lumiflex />
          <div className="z-19 w-full max-w-9/10 absolute flex flex-row justify-start top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-4xl font-bold text-black mb-4 md:w-12/12">
              Track your spending, master your future.<br></br> Fin.track, your
              one stop shop for tracking
            </h1>
          </div>
          <img
            className="absolute bottom-0 z-0 right-5 w-14/12 md:w-6/12"
            src={Image1}
            alt=""
          />
        </div>
        <div
          className="relative snap-start snap-always bg-white"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Zenitho />
          <div className="z-19 h-[75vh] container absolute grid grid-cols-4 px-4 gap-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="p-3 md:p-0 text-md md:text-2xl font-bold text-black text-left col-span-4 md:col-span-3 row-span-2 md:row-span-1">
              Tired of wondering where your money goes? Our expense tracking
              website makes it simple to manage your spending, track income, and
              set financial goals — all in one place.
            </h2>
            <div className="col-span-4 md:flex md:flex-col md:justify-center md:items-center md:col-start-3 md:col-start-4 md:row-start-1 md:row-end-4 mb-3 md:mb-0">
              <p className="hidden md:block text-lg text-black mb-6">
                Take Control of Your Finances Today
              </p>
              <button className="bg-black text-nowrap text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition duration-300">
                <Link to="/signup">Get Started</Link>
              </button>
            </div>
            <div className="bg-gray-300/50 hover:bg-transparent transition-all group duration-300 overflow-hidden m-4 md:m-0 rounded-4xl relative mx-auto md:mx-0 col-span-4 row-span-4 md:col-span-2 md:row-span-2 overflow-hidden">
              <img
                className="group-hover:scale-125 transition-all duration-300 rounded-2xl h-full w-full "
                src={Transparent1}
                alt=""
              />
              <button className="group absolute top-0 right-0 m-4 p-1 bg-white border border-s rounded-full text-nowrap flex items-center justify-center justify-center hover:bg-black-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-600 group-hover:rotate-45 transition-transform duration-300 ease-in-out"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.69 18.56a.75.75 0 11-1.06-1.06L17.19 5.25H8.25a.75.75 0 010-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className="flex-shrink-0 w-0 group-hover:w-28 transition-all duration-300 overflow-hidden text-nowrap
                         opacity-0 group-hover:opacity-100 ease-in-out"
                >
                  <span className="font-semibold">
                    <Link to="/signup">Get Started</Link>
                  </span>
                </span>
              </button>
            </div>
            <div className="bg-gray-300/50 hover:bg-transparent transition-all duration-300 group overflow-hidden rounded-4xl relative hidden md:block col-span-1 row-span-1 overflow-hidden">
              {/* <video
                className="rounded-2xl h-full w-full object-fill"
                autoPlay
                muted
              >
                <source src={Video4} />
              </video> */}
              <img
                className="group-hover:scale-75 transition-all duration-300 rounded-2xl h-full w-full "
                src={Transparent2}
                alt=""
              />
              <button className="group absolute top-0 right-0 m-4 p-1 bg-white border border-s rounded-full text-nowrap flex items-center justify-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-600 group-hover:rotate-45 transition-transform duration-300 ease-in-out"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.69 18.56a.75.75 0 11-1.06-1.06L17.19 5.25H8.25a.75.75 0 010-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className="flex-shrink-0 w-0 group-hover:w-28 transition-all duration-300 overflow-hidden text-nowrap
                         opacity-0 group-hover:opacity-100 ease-in-out"
                >
                  <span className="font-semibold">
                    <Link to="/signup">Get Started</Link>
                  </span>
                </span>
              </button>
            </div>

            <div className="bg-gray-300/50 hover:bg-transparent transition-all duration-300 group overflow-hidden rounded-4xl relative hidden md:block col-span-1 row-span-1 overflow-hidden">
              {/* <video
                className="rounded-2xl h-full w-full object-fill"
                autoPlay
                muted
              >
                <source src={Video4} />
              </video> */}
              <img
                className="group-hover:scale-75 transition-all duration-300 rounded-2xl h-full w-full "
                src={Transparent3}
                alt=""
              />
              <button className="group absolute top-0 right-0 m-4 p-1 bg-white border border-s rounded-full text-nowrap flex items-center justify-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-600 group-hover:rotate-45 transition-transform duration-300 ease-in-out"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.69 18.56a.75.75 0 11-1.06-1.06L17.19 5.25H8.25a.75.75 0 010-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className="flex-shrink-0 w-0 group-hover:w-28 transition-all duration-300 overflow-hidden text-nowrap
                         opacity-0 group-hover:opacity-100 ease-in-out"
                >
                  <span className="font-semibold">
                    <Link to="/signup">Get Started</Link>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div
          className="relative snap-start snap-always"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Tranquiluxe />
          <div className="absolute px-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-left h-[70vh] container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col justify-start items-start p-4">
                <p className="text-sm md:text-lg font-bold text-black mb-2 md:mb-4 text-left">
                  Designed for everbody
                </p>
                <h2 className="text-1xl md:text-4xl mb-2 md:mb-4">
                  Why use fin.track?
                </h2>
                <p className="text-sm md:text-lg text-black mb-2 md:mb-6 text-left">
                  Our platform offers a clean, user-friendly interface and clear
                  insights to help you stay on top of your finances. Whether
                  you’re looking to save more, budget better, or simply
                  understand your spending habits, Fin.track gives you the tools
                  to take control—without the clutter.
                </p>
                <button className="mx-auto md:mx-0 rounded-full bg-white/30 hover:bg-white transition-all duration-300 px-6 py-3 border border-gray-300 shadow-amber-100">
                  <Link to={"/signup"}>Start using today!</Link>
                </button>
              </div>
              <div className="flex justify-center items-center rounded-3xl overflow-hidden w-full">
                <img
                  className="rounded-3xl overflow-hidden w-[80%] md:w-full"
                  src={Tracking}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <Footer
          ref={div4Ref}
          navSize={navSize}
          isIntersecting4={isIntersecting4}
        />
      </div>
    </>
  );
};

export default HomePage;
