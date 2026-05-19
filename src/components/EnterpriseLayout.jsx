import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
function EnterpriseLayout({
  title,
  subtitle,
  children
}) {

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const name =
    localStorage.getItem("name") || "User";

  const role =
    localStorage.getItem("role") || "EMPLOYEE";

  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

      {/* BACKGROUND EFFECTS */}

      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full" />

      </div>

      {/* NAVBAR */}

      <div className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-2xl bg-[#020617]/80">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-24 flex items-center justify-between">

            {/* LEFT */}

            <div className="flex flex-col">

              <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">

                Atomberg KPI Suite

              </h1>

              <p className="text-slate-400 text-sm mt-1 font-medium tracking-wide">

                Enterprise Performance Platform

              </p>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-3">

              {/* PROFILE */}

              <motion.div

                whileHover={{
                  scale: 1.02
                }}

                className="group relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-2xl
                bg-white/[0.04]
                border border-white/10
                shadow-[0_0_40px_rgba(59,130,246,0.15)]
                hover:border-blue-500/40
                transition-all duration-300"
              >

                {/* GLOW */}

                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* AVATAR */}

                <div
                  className="w-11 h-11 rounded-xl
                  bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600
                  flex items-center justify-center
                  text-white font-bold text-lg"
                >

                  {name.charAt(0).toUpperCase()}

                </div>

                {/* USER INFO */}

                <div className="hidden sm:block leading-tight">

                  <h3 className="text-white font-semibold text-sm">

                    {name}

                  </h3>

                  <p className="text-slate-400 text-[11px] uppercase tracking-[3px] mt-1">

                    {role}

                  </p>

                </div>

              </motion.div>

              {/* LOGOUT */}

              <motion.button

                whileHover={{
                  scale: 1.03
                }}

                whileTap={{
                  scale: 0.96
                }}

                onClick={() =>
                  setShowLogoutModal(true)
                }

                className="h-[62px]
                px-6 rounded-2xl
                font-semibold text-sm
                bg-gradient-to-r from-red-500 to-rose-600
                hover:from-red-400 hover:to-rose-500
                transition-all duration-300
                shadow-[0_0_25px_rgba(239,68,68,0.25)]"
              >

                Logout

              </motion.button>

            </div>

          </div>

        </div>

      </div>

      {/* PAGE HEADER */}

      {

        title && (

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

            <motion.div

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              className="relative overflow-hidden rounded-[32px]
              border border-white/10
              bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#0f172a]
              p-10 md:p-6
              shadow-[0_0_60px_rgba(59,130,246,0.12)]"
            >

              {/* INNER GLOW */}

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_40%)]" />

              <div className="relative z-10">

                <p className="text-blue-400 uppercase tracking-[4px] text-xs font-bold mb-5">

                  PERFORMANCE MANAGEMENT

                </p>

                <h1 className="text-3xl md:text-4xl font-black leading-tight max-w-3xl">

                  {title}

                </h1>

                <p className="text-slate-400 text-lg mt-6 max-w-2xl leading-8">

                  {subtitle}

                </p>

              </div>

            </motion.div>

          </div>

        )

      }

      {/* CONTENT */}
      {/* CONTENT */}

<div className="

w-full
max-w-[1350px]

mx-auto

px-4
sm:px-5
lg:px-6

py-6

">

  {children}

</div>

     

      {/* LOGOUT MODAL */}

      <AnimatePresence>

        {showLogoutModal && (

          <motion.div

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}

            className="fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/60 backdrop-blur-md px-4"
          >

            <motion.div

              initial={{
                opacity: 0,
                scale: 0.9,
                y: 40
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}

              exit={{
                opacity: 0,
                scale: 0.9,
                y: 40
              }}

              transition={{
                duration: 0.25
              }}

              className="relative w-full max-w-md
              overflow-hidden rounded-[32px]
              border border-white/10
              bg-[#0b1120]
              p-8 shadow-[0_0_80px_rgba(59,130,246,0.2)]"
            >

              {/* GLOW */}

              <div
                className="absolute inset-0
                bg-gradient-to-br
                from-red-500/10
                via-transparent
                to-blue-500/10"
              />

              <div className="relative z-10">

                {/* ICON */}

                <div
                  className="w-20 h-20 mx-auto mb-6
                  rounded-3xl
                  bg-gradient-to-br
                  from-red-500 to-rose-600
                  flex items-center justify-center
                  text-4xl shadow-2xl"
                >

                  ⎋

                </div>

                {/* TEXT */}

                <h2 className="text-3xl font-black text-center mb-4">

                  Confirm Logout

                </h2>

                <p className="text-slate-400 text-center leading-7 mb-10">

                  Are you sure you want to logout
                  from your Atomberg KPI account?

                </p>

                {/* ACTIONS */}

                <div className="grid grid-cols-2 gap-4">

                  <button

                    onClick={() =>
                      setShowLogoutModal(false)
                    }

                    className="h-14 rounded-2xl
                    bg-white/5 border border-white/10
                    hover:bg-white/10
                    transition-all duration-300
                    font-semibold"
                  >

                    Cancel

                  </button>

                  <button

                    onClick={() => {

                      localStorage.clear();

                      window.location.href =
                        "https://goalportal-frontend.vercel.app/";

                    }}

                    className="h-14 rounded-2xl
                    bg-gradient-to-r
                    from-red-500 to-rose-600
                    hover:from-red-400 hover:to-rose-500
                    transition-all duration-300
                    font-semibold
                    shadow-[0_0_25px_rgba(239,68,68,0.35)]"
                  >

                    Logout

                  </button>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

}

export default EnterpriseLayout;
