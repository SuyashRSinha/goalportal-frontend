import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import api from "../services/api";

function ManagerReviewDashboard() {

  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {

    try {

      const response =
        await api.get("/goals");

      setGoals(response.data);

    }

    catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchGoals();

  }, []);

  const handleChange = (
    id,
    value
  ) => {

    setGoals((prevGoals) =>

      prevGoals.map((goal) =>

        goal.id === id

          ? {
              ...goal,
              managerReviewComment:
                value
            }

          : goal
      )
    );
  };

  const submitReview = async (
    goal
  ) => {

    try {

      const payload = {

        managerReviewComment:
          goal.managerReviewComment

      };

      await api.put(

        `/goals/manager-review/${goal.id}`,

        payload

      );

      alert(
        "Manager Review Submitted"
      );

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed To Submit Review"
      );

    }
  };

  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">

      {/* BACKGROUND EFFECTS */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 p-4 sm:p-6 lg:p-10">

        {/* TOP BAR */}

        <div className="flex items-center justify-between mb-10">

          {/* BACK BUTTON */}

          <motion.button

            whileHover={{
              scale: 1.08
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={() => {

              window.location.href =
                "/manager-dashboard";

            }}

            className="w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl hover:bg-blue-500/20 transition-all duration-300"
          >

            <ArrowLeft size={24} />

          </motion.button>

          {/* PAGE BADGE */}

          <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-sm text-slate-300 font-medium">

            Manager Review Portal

          </div>

        </div>

        {/* HEADER */}

        <motion.div

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

          className="mb-12"
        >

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 bg-gradient-to-r from-white via-blue-100 to-indigo-300 bg-clip-text text-transparent">

            Manager Review Dashboard

          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-3xl leading-relaxed">

            Review quarterly employee performance,
            analyze KPI execution,
            and provide strategic managerial feedback.

          </p>

        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">

          <motion.div

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
          >

            <p className="text-slate-400 mb-3">

              Total Reviews

            </p>

            <h2 className="text-5xl font-black">

              {goals.length}

            </h2>

          </motion.div>

          <motion.div

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            className="rounded-3xl border border-green-500/20 bg-green-500/10 backdrop-blur-xl p-6 shadow-2xl"
          >

            <p className="text-green-200 mb-3">

              Completed

            </p>

            <h2 className="text-5xl font-black text-green-300">

              {

                goals.filter(
                  (goal) =>
                    goal.managerReviewComment
                ).length

              }

            </h2>

          </motion.div>

          <motion.div

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 backdrop-blur-xl p-6 shadow-2xl"
          >

            <p className="text-yellow-200 mb-3">

              Pending

            </p>

            <h2 className="text-5xl font-black text-yellow-300">

              {

                goals.filter(
                  (goal) =>
                    !goal.managerReviewComment
                ).length

              }

            </h2>

          </motion.div>

          <motion.div

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            className="rounded-3xl border border-blue-500/20 bg-blue-500/10 backdrop-blur-xl p-6 shadow-2xl"
          >

            <p className="text-blue-200 mb-3">

              Active Goals

            </p>

            <h2 className="text-5xl font-black text-blue-300">

              {

                goals.filter(
                  (goal) =>
                    goal.progressStatus !==
                    "COMPLETED"
                ).length

              }

            </h2>

          </motion.div>

        </div>

        {/* GOALS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {goals.map((goal, index) => (

            <motion.div

              key={goal.id}

              initial={{
                opacity: 0,
                y: 30
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                delay: index * 0.05
              }}

              whileHover={{
                y: -6
              }}

              className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-7 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
            >

              {/* TOP */}

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">

                <div>

                  <h2 className="text-3xl font-black mb-2 tracking-tight">

                    {goal.title}

                  </h2>

                  <p className="text-slate-400">

                    {goal.employeeEmail}

                  </p>

                </div>

                <div
                  className={`px-5 py-2 rounded-full text-sm font-bold border

                  ${
                    goal.progressStatus === "COMPLETED"

                      ? "bg-green-500/10 border-green-500/20 text-green-300"

                      : goal.progressStatus === "DELAYED"

                      ? "bg-red-500/10 border-red-500/20 text-red-300"

                      : "bg-blue-500/10 border-blue-500/20 text-blue-300"
                  }
                  `}
                >

                  {goal.progressStatus || "NOT UPDATED"}

                </div>

              </div>

              {/* STATS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">

                <div className="rounded-2xl bg-[#0f172a]/80 border border-white/5 p-5">

                  <p className="text-slate-400 mb-2">

                    Target

                  </p>

                  <h3 className="text-3xl font-black">

                    {goal.targetValue}

                  </h3>

                </div>

                <div className="rounded-2xl bg-[#0f172a]/80 border border-white/5 p-5">

                  <p className="text-slate-400 mb-2">

                    Achievement

                  </p>

                  <h3 className="text-3xl font-black">

                    {goal.actualAchievement || 0}

                  </h3>

                </div>

              </div>

              {/* QUARTER */}

              <div className="rounded-2xl bg-[#0f172a]/80 border border-white/5 p-5 mb-5">

                <p className="text-slate-400 mb-2">

                  Quarter

                </p>

                <h3 className="text-xl font-bold">

                  {goal.quarter || "Not Updated"}

                </h3>

              </div>

              {/* EMPLOYEE COMMENT */}

              <div className="rounded-2xl bg-[#0f172a]/80 border border-white/5 p-5 mb-6">

                <p className="text-slate-400 mb-3">

                  Employee Comment

                </p>

                <p className="text-slate-200 leading-7">

                  {goal.employeeComment

                    ? goal.employeeComment

                    : "No employee comment available."}

                </p>

              </div>

              {/* TEXTAREA */}

              <textarea
                placeholder="Write strategic managerial feedback..."
                value={
                  goal.managerReviewComment || ""
                }
                onChange={(e) =>
                  handleChange(
                    goal.id,
                    e.target.value
                  )
                }
                rows="5"
                className="w-full rounded-2xl bg-[#0f172a]/80 border border-white/10 p-5 mb-6 outline-none focus:border-blue-500 transition-all duration-300 text-slate-200 placeholder:text-slate-500"
              />

              {/* BUTTON */}

              <motion.button

                whileHover={{
                  scale: 1.02
                }}

                whileTap={{
                  scale: 0.98
                }}

                onClick={() =>
                  submitReview(goal)
                }

                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-5 text-lg font-bold shadow-[0_15px_50px_rgba(37,99,235,0.45)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.65)] transition-all duration-300"
              >

                Submit Review

              </motion.button>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default ManagerReviewDashboard;