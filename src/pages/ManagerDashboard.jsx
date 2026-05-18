import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import EnterpriseLayout from "../components/EnterpriseLayout";

import {

  approveGoal,

  rejectGoal,

  reworkGoal

} from "../services/managerService";

export default function ManagerDashboard() {

  const [goals, setGoals] = useState([]);


  const totalGoals =
    goals.length;

  const approvedGoals =
    goals.filter(
      (goal) =>
        goal.approvalStatus ===
        "APPROVED"
    ).length;

  const pendingGoals =
    goals.filter(
      (goal) =>
        goal.approvalStatus ===
        "PENDING"
    ).length;

  const reworkGoals =
    goals.filter(
      (goal) =>
        goal.approvalStatus ===
        "REWORK"
    ).length;

  

  const fetchGoals = async () => {

    try {

      const response =
        await fetch(
          "https://web-production-0f7c0.up.railway.app/goals"
        );

      const data =
        await response.json();

      setGoals(data);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchGoals();

  }, []);



  const handleApprove =
    async (id) => {

      try {

        await approveGoal(id);

        fetchGoals();

      }

      catch (error) {

        console.log(error);

      }

    };



  const handleReject =
    async (id) => {

      try {

        await rejectGoal(id);

        fetchGoals();

      }

      catch (error) {

        console.log(error);

      }

    };

  

  const handleRework =
    async (id) => {

      const comment = prompt(
        "Enter rework comment:"
      );

      if (!comment) return;

      try {

        await reworkGoal(
          id,
          comment
        );

        fetchGoals();

      }

      catch (error) {

        console.log(error);

      }

    };

  return (

    <EnterpriseLayout>

      <div className="relative text-white">

        {/* BACKGROUND GLOW */}

        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 blur-[140px] rounded-full" />

        <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-500/10 blur-[140px] rounded-full" />

        {/* HEADER */}

        <div className="relative z-10 mb-12 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          <div>

            <motion.h1

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
            >

              Manager Dashboard

            </motion.h1>

            <p className="text-slate-400 text-lg sm:text-xl max-w-3xl leading-relaxed">

              AI-powered KPI governance platform for enterprise performance reviews and strategic workforce alignment.

            </p>

          </div>

          <motion.button

            whileHover={{
              scale: 1.04
            }}

            whileTap={{
              scale: 0.97
            }}

            onClick={() => {

              window.location.href =
                "/manager-review";

            }}

            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 px-7 py-4 rounded-2xl font-semibold shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:shadow-blue-500/40 transition-all duration-300"
          >

            Review Quarterly Updates

          </motion.button>

        </div>

        {/* ANALYTICS */}

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6 mb-14">

          {/* CARD */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            whileHover={{
              y: -5
            }}

            className="relative overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[30px] p-7 shadow-2xl"
          >

            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 blur-3xl rounded-full" />

            <p className="text-slate-400 mb-4 text-sm uppercase tracking-widest">

              Total Goals

            </p>

            <h2 className="text-5xl font-black">

              {totalGoals}

            </h2>

          </motion.div>

          {/* CARD */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            whileHover={{
              y: -5
            }}

            className="relative overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[30px] p-7 shadow-2xl"
          >

            <div className="absolute top-0 right-0 w-28 h-28 bg-green-500/10 blur-3xl rounded-full" />

            <p className="text-slate-400 mb-4 text-sm uppercase tracking-widest">

              Approved

            </p>

            <h2 className="text-5xl font-black text-green-400">

              {approvedGoals}

            </h2>

          </motion.div>

          {/* CARD */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            whileHover={{
              y: -5
            }}

            className="relative overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[30px] p-7 shadow-2xl"
          >

            <div className="absolute top-0 right-0 w-28 h-28 bg-yellow-500/10 blur-3xl rounded-full" />

            <p className="text-slate-400 mb-4 text-sm uppercase tracking-widest">

              Pending

            </p>

            <h2 className="text-5xl font-black text-yellow-400">

              {pendingGoals}

            </h2>

          </motion.div>

          {/* CARD */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            whileHover={{
              y: -5
            }}

            className="relative overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[30px] p-7 shadow-2xl"
          >

            <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/10 blur-3xl rounded-full" />

            <p className="text-slate-400 mb-4 text-sm uppercase tracking-widest">

              Rework

            </p>

            <h2 className="text-5xl font-black text-red-400">

              {reworkGoals}

            </h2>

          </motion.div>

        </div>

        {/* GOALS */}

        <div className="relative z-10 grid grid-cols-1 2xl:grid-cols-2 gap-8">

          {

            goals.map((goal) => {

              const completionPercentage =

                goal.actualAchievement &&
                goal.targetValue

                  ? Math.min(

                      (
                        goal.actualAchievement /
                        goal.targetValue
                      ) * 100,

                      100

                    ).toFixed(1)

                  : 0;

              return (

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

                  whileHover={{
                    y: -6
                  }}

                  className="relative overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[34px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
                >

                  {/* GLOW */}

                  <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/5 blur-3xl rounded-full" />

                  {/* TOP */}

                  <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5 mb-8">

                    <div>

                      <h2 className="text-3xl xl:text-4xl font-black mb-3 leading-tight">

                        {goal.title}

                      </h2>

                      <p className="text-slate-400 text-lg">

                        {goal.thrustArea}

                      </p>

                    </div>

                    <div className="mt-3 space-y-2">

  <div className="flex items-center gap-3">

    <span className="text-slate-400 text-sm">

      Employee:

    </span>

    <span className="px-3 py-1 rounded-xl
    bg-blue-500/10
    text-blue-300
    text-sm font-semibold">

      {goal.employeeName || "Employee"}

    </span>

  </div>

  <div className="flex items-center gap-3">

    <span className="text-slate-400 text-sm">

      Email:

    </span>

    <span className="px-3 py-1 rounded-xl
    bg-violet-500/10
    text-violet-300
    text-sm font-semibold">

      {goal.employeeEmail}

    </span>

  </div>

</div>

                    <span
                      className={`px-5 py-3 rounded-2xl text-sm font-bold tracking-wide border

                      ${
                        goal.approvalStatus === "APPROVED"

                          ? "bg-green-500/10 text-green-300 border-green-500/20"

                          : goal.approvalStatus === "REJECTED"

                          ? "bg-red-500/10 text-red-300 border-red-500/20"

                          : goal.approvalStatus === "REWORK"

                          ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"

                          : "bg-blue-500/10 text-blue-300 border-blue-500/20"
                      }
                      `}
                    >

                      {goal.approvalStatus}

                    </span>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="text-slate-300 leading-8 text-[15px] mb-8">

                    {goal.description}

                  </p>

                  {/* INFO */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">

                      <p className="text-slate-500 mb-3 text-sm uppercase tracking-wider">

                        Target

                      </p>

                      <h3 className="text-3xl font-black">

                        {goal.targetValue}

                      </h3>

                    </div>

                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">

                      <p className="text-slate-500 mb-3 text-sm uppercase tracking-wider">

                        Achievement

                      </p>

                      <h3 className="text-3xl font-black">

                        {goal.actualAchievement || 0}

                      </h3>

                    </div>

                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">

                      <p className="text-slate-500 mb-3 text-sm uppercase tracking-wider">

                        Weightage

                      </p>

                      <h3 className="text-3xl font-black">

                        {goal.weightage}%

                      </h3>

                    </div>

                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">

                      <p className="text-slate-500 mb-3 text-sm uppercase tracking-wider">

                        Progress

                      </p>

                      <h3 className="text-2xl font-black">

                        {

                          goal.progressStatus ||
                          "NOT_UPDATED"

                        }

                      </h3>

                    </div>

                  </div>

                  {/* PROGRESS */}

                  <div className="mb-8">

                    <div className="flex justify-between items-center mb-3">

                      <p className="text-slate-400 font-medium">

                        KPI Completion

                      </p>

                      <p className="font-bold text-lg">

                        {completionPercentage}%

                      </p>

                    </div>

                    <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden">

                      <motion.div

                        initial={{
                          width: 0
                        }}

                        animate={{
                          width:
                            `${completionPercentage}%`
                        }}

                        transition={{
                          duration: 1
                        }}

                        className={`h-4 rounded-full

                        ${
                          completionPercentage >= 80

                            ? "bg-gradient-to-r from-green-400 to-emerald-500"

                            : completionPercentage >= 50

                            ? "bg-gradient-to-r from-yellow-400 to-orange-500"

                            : "bg-gradient-to-r from-red-400 to-rose-500"
                        }
                        `}
                      />

                    </div>

                  </div>

                  {/* COMMENT */}

                  <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 mb-8">

                    <p className="text-slate-500 mb-3 uppercase tracking-wider text-sm">

                      Employee Comment

                    </p>

                    <p className="text-slate-300 leading-7">

                      {

                        goal.employeeComment
                          ? goal.employeeComment
                          : "No comment yet"

                      }

                    </p>

                  </div>

                  {/* ACTIONS */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <button
                      onClick={() =>
                        handleApprove(goal.id)
                      }
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 p-4 rounded-2xl font-bold transition-all duration-300 shadow-xl"
                    >

                      Approve

                    </button>

                    <button
                      onClick={() =>
                        handleReject(goal.id)
                      }
                      className="bg-gradient-to-r from-red-500 to-rose-600 hover:scale-105 p-4 rounded-2xl font-bold transition-all duration-300 shadow-xl"
                    >

                      Reject

                    </button>

                    <button
                      onClick={() =>
                        handleRework(goal.id)
                      }
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:scale-105 p-4 rounded-2xl font-bold transition-all duration-300 shadow-xl"
                    >

                      Rework

                    </button>

                  </div>

                </motion.div>

              );

            })

          }

        </div>

      </div>

    </EnterpriseLayout>

  );
}