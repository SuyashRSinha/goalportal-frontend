import { motion } from "framer-motion";

function DashboardLayout({
  title,
  subtitle,
  children
}) {

  const name =
    localStorage.getItem("name");

  const role =
    localStorage.getItem("role");

  const navigateDashboard = () => {

    const userRole =
      role?.toLowerCase();

    if (userRole === "employee") {

      window.location.href =
        "/employee-dashboard";
    }

    else if (userRole === "manager") {

      window.location.href =
        "/manager-dashboard";
    }

    else {

      window.location.href =
        "/admin-dashboard";
    }
  };

  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">

      {/* TOP NAVBAR */}

      <motion.header

        initial={{
          y: -40,
          opacity: 0
        }}

        animate={{
          y: 0,
          opacity: 1
        }}

        transition={{
          duration: 0.5
        }}

        className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#020617]/90 border-b border-slate-800 shadow-2xl"
      >

        <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-5 md:px-8 lg:px-10">

          <div className="flex flex-col 2xl:flex-row 2xl:items-center 2xl:justify-between gap-5 py-5">

            {/* TOP SECTION */}

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 w-full">

              {/* LEFT */}

              <div className="min-w-0">

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight break-words">

                  {title}

                </h1>

                <p className="text-slate-400 mt-1 text-sm sm:text-base lg:text-lg break-words">

                  {subtitle}

                </p>

              </div>

              {/* PROFILE */}

              <motion.div

                whileHover={{
                  scale: 1.03
                }}

                className="flex items-center gap-4 bg-[#0b1120] border border-slate-800 rounded-2xl px-4 py-3 shadow-2xl w-full sm:w-fit"
              >

                {/* AVATAR */}

                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold uppercase flex-shrink-0">

                  {name?.charAt(0)}

                </div>

                {/* INFO */}

                <div className="min-w-0">

                  <h3 className="font-semibold text-white truncate">

                    {name}

                  </h3>

                  <p className="text-slate-400 text-sm capitalize truncate">

                    {role}

                  </p>

                </div>

              </motion.div>

            </div>

            {/* NAVIGATION */}

            <div className="flex flex-wrap items-center justify-center 2xl:justify-end gap-3 w-full">

              <button

                onClick={navigateDashboard}

                className="px-4 sm:px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-xl text-sm sm:text-base font-semibold whitespace-nowrap"
              >

                Dashboard

              </button>

              <button
                className="px-4 sm:px-5 py-2.5 rounded-2xl bg-[#111827] border border-slate-700 hover:bg-[#1f2937] transition-all duration-300 hover:scale-105 text-sm sm:text-base whitespace-nowrap"
              >

                Goals

              </button>

              <button
                className="px-4 sm:px-5 py-2.5 rounded-2xl bg-[#111827] border border-slate-700 hover:bg-[#1f2937] transition-all duration-300 hover:scale-105 text-sm sm:text-base whitespace-nowrap"
              >

                Analytics

              </button>

              <button
                className="px-4 sm:px-5 py-2.5 rounded-2xl bg-[#111827] border border-slate-700 hover:bg-[#1f2937] transition-all duration-300 hover:scale-105 text-sm sm:text-base whitespace-nowrap"
              >

                Reviews

              </button>

              <button

                onClick={() => {

                  localStorage.clear();

                  window.location.href =
                    "http://localhost:5173/";
                }}

                className="px-4 sm:px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-xl text-sm sm:text-base font-semibold whitespace-nowrap"
              >

                Logout

              </button>

            </div>

          </div>

        </div>

      </motion.header>

      {/* PAGE CONTENT */}

      <motion.main

        initial={{
          opacity: 0,
          y: 20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.5
        }}

        className="w-full max-w-[1700px] mx-auto px-3 sm:px-5 md:px-8 lg:px-10 py-6 sm:py-8 lg:py-10"
      >

        {children}

      </motion.main>

    </div>
  );
}

export default DashboardLayout;