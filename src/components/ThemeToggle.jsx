import { useEffect, useState } from "react";

function ThemeToggle() {

  const [darkMode, setDarkMode] =
    useState(true);

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "light") {

      document.documentElement
        .classList.remove("dark");

      setDarkMode(false);

    }

    else {

      document.documentElement
        .classList.add("dark");

      setDarkMode(true);

    }

  }, []);

  const toggleTheme = () => {

    if (darkMode) {

      document.documentElement
        .classList.remove("dark");

      localStorage.setItem(
        "theme",
        "light"
      );

    }

    else {

      document.documentElement
        .classList.add("dark");

      localStorage.setItem(
        "theme",
        "dark"
      );

    }

    setDarkMode(!darkMode);

  };

  return (

    <button

      onClick={toggleTheme}

      className="px-5 py-3 rounded-2xl
      bg-white/10 border border-white/10
      backdrop-blur-xl
      hover:bg-white/20
      transition-all duration-300
      font-semibold"

    >

      {

        darkMode

          ? "☀️ Light Mode"

          : "🌙 Dark Mode"

      }

    </button>

  );

}

export default ThemeToggle;