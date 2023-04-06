import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useScrollDirection } from "../hooks/ScrollDirection";
import { faFolder, faHome, faMoon, faPaperPlane, faSun, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollDirection = useScrollDirection(0);
  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const containerVariants = {
    hidden: { y: 0 },
    visible: () => {
      if (scrollDirection === "down") {
        return { y: isScrolling ? -20 : 0 };
      } else if (scrollDirection === "up") {
        return { y: isScrolling ? 20 : 0 };
      }
    },
  };

  return (
    <motion.div className="fixed sm:bottom-4 bottom-8 mx-auto z-50 left-0 right-0 flex justify-center items-end " variants={containerVariants} animate={isScrolling ? "visible" : "hidden"} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
      <div className="scale-[1.5] sm:scale-[1.0] dark:bg-white bg-zinc-900 shadow-md p-2 rounded-full ease-in-out duration-500 flex ">
        <p className="dark:text-black text-white ">
          <FontAwesomeIcon icon={faHome} className=" px-2 hover:text-cyan-500 hover:dark:text-cyan-500" />
          <FontAwesomeIcon icon={faUser} className="px-2 hover:text-cyan-500 hover:dark:text-cyan-500" />
          <FontAwesomeIcon icon={faFolder} className="px-2 hover:text-cyan-500 hover:dark:text-cyan-500" />
          <FontAwesomeIcon icon={faPaperPlane} className="px-2 hover:text-cyan-500 hover:dark:text-cyan-500" />
        </p>
        <p className="text-white dark:text-black cursor-default">│</p>

        <div className=" text-white dark:text-black px-2 hover:text-cyan-500 hover:dark:text-cyan-500">
          {theme === "dark" ? (
            <button onClick={(e) => setTheme("light")}>
              <FontAwesomeIcon icon={faMoon} />
            </button>
          ) : (
            <button onClick={(e) => setTheme("dark")}>
              <FontAwesomeIcon icon={faSun} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
