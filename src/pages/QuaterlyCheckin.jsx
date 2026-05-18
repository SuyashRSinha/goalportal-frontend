import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

function QuarterlyCheckin() {

  const [goals, setGoals] = useState([]);

  // FETCH EMPLOYEE GOALS

  const fetchGoals = async () => {

    try {

      const response = await api.get("/goals");

      setGoals(response.data);

    }

    catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchGoals();

  }, []);

  // HANDLE INPUT CHANGE

  const handleChange = (
    id,
    field,
    value
  ) => {

    setGoals((prevGoals) =>

      prevGoals.map((goal) =>

        goal.id === id

          ? {
              ...goal,
              [field]: value
            }

          : goal
      )
    );
  };

  // SUBMIT CHECK-IN

  const submitCheckin = async (goal) => {

    try {

      const payload = {

        plannedProgress:
        parseFloat(goal.plannedProgress),

        actualAchievement:
          parseFloat(goal.actualAchievement),

        quarter:
          goal.quarter,

        progressStatus:
          goal.progressStatus,

        employeeComment:
          goal.employeeComment

      };

      await api.put(

        `/goals/checkin/${goal.id}`,

        payload

      );

      alert(
        "Quarterly Check-in Updated"
      );

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed To Update Check-in"
      );

    }
  };

  const isQuarterAllowed = () => {

    return true;

   /* const month = new Date().getMonth() + 1;

    switch(quarter) {

      case "Q1":
        return month === 7;
      case "Q2":
        return month === 10;
      case "Q3":
        return month === 1;
      case "Q4":
        return month === 3 || month === 4;

      default:
        return false;*/
  };

  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

      {/* BACKGROUND EFFECTS */}

      <div className="fixed inset-0 z-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* HEADER */}

        <motion.div

          initial={{
            opacity: 0,
            y: 30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-gradient-to-br from-[#0f172a]/95 via-[#020617]/95 to-[#0f172a]/95 p-8 md:p-12 mb-12 shadow-[0_0_60px_rgba(37,99,235,0.15)]"
        >

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_35%)]" />

          {/* BACK BUTTON */}

          <button

            onClick={() => {

              window.location.href =
                "/employee-dashboard";

            }}

            className="absolute top-6 left-6 z-20 w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-2xl hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300 hover:scale-110"
          >

            ←

          </button>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mt-10">

            <div>

              <p className="uppercase tracking-[0.25em] text-blue-400 text-sm font-semibold mb-4">

                Quarterly Performance Review

              </p>

              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">

                Quarterly <br />

                Check-In

              </h1>

              <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-8">

                Update KPI achievements, quarterly status,
                and strategic progress aligned with enterprise goals.

              </p>

            </div>

            <div className="grid grid-cols-2 gap-4 min-w-[280px]">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">

                <p className="text-slate-400 text-sm mb-2">

                  Total Goals

                </p>

                <h2 className="text-4xl font-black">

                  {goals.length}

                </h2>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">

                <p className="text-slate-400 text-sm mb-2">

                  Active Quarter

                </p>

                <h2 className="text-4xl font-black text-blue-400">

                  Q4

                </h2>

              </div>

            </div>

          </div>

        </motion.div>

        {/* GOALS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {goals.map((goal, index) => {

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
                  y: 40
                }}

                animate={{
                  opacity: 1,
                  y: 0
                }}

                transition={{
                  delay: index * 0.08
                }}

                whileHover={{
                  y: -6
                }}

                className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-[#081120]/90 backdrop-blur-2xl p-8 shadow-[0_10px_50px_rgba(0,0,0,0.45)]"
              >

                {/* CARD GLOW */}

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />

                <div className="relative z-10">

                  {/* TOP */}

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">

                    <div>

                      <div className="flex items-center gap-3 mb-4">

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl shadow-xl">

                          🎯

                        </div>

                        <div>

                          <p className="text-slate-400 text-sm">

                            KPI Goal

                          </p>

                          <h2 className="text-3xl font-black leading-tight">

                            {goal.title}

                          </h2>

                        </div>

                      </div>

                      <p className="text-slate-400 text-lg">

                        {goal.thrustArea}

                      </p>

                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 text-blue-300 px-5 py-3 rounded-2xl text-sm font-bold tracking-wide">

                      {goal.progressStatus || "NOT UPDATED"}

                    </div>

                  </div>

                  {/* TARGET + PROGRESS */}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

                    <div className="rounded-3xl bg-[#111827]/80 border border-slate-700/50 p-5">

                      <p className="text-slate-400 text-sm mb-2">

                        Target

                      </p>

                      <h3 className="text-3xl font-black">

                        {goal.targetValue}

                      </h3>

                    </div>

                    <div className="rounded-3xl bg-[#111827]/80 border border-slate-700/50 p-5">

                      <p className="text-slate-400 text-sm mb-2">

                        Achievement

                      </p>

                      <h3 className="text-3xl font-black text-green-400">

                        {goal.actualAchievement || 0}

                      </h3>

                    </div>

                    <div className="rounded-3xl bg-[#111827]/80 border border-slate-700/50 p-5">

                      <p className="text-slate-400 text-sm mb-2">

                        Completion

                      </p>

                      <h3 className="text-3xl font-black text-blue-400">

                        {completionPercentage}%

                      </h3>

                    </div>

                  </div>

                  {/* PROGRESS BAR */}

                  <div className="mb-8">

                    <div className="flex justify-between mb-3">

                      <p className="text-slate-400 font-medium">

                        KPI Progress

                      </p>

                      <p className="font-bold">

                        {completionPercentage}%

                      </p>

                    </div>

                    <div className="w-full h-4 bg-[#111827] rounded-full overflow-hidden">

                      <motion.div
                        initial={{
                          width: 0
                        }}
                        animate={{
                          width: `${completionPercentage}%`
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

                            : "bg-gradient-to-r from-red-500 to-rose-500"
                        }
                        `}
                      />

                    </div>

                  </div>

                  {/* FORM */}

                  <div className="space-y-5">

                    <input
  type="number"
  placeholder="Planned Progress %"
  value={goal.plannedProgress || ""}
  onChange={(e) =>
    handleChange(
      goal.id,
      "plannedProgress",
      e.target.value
    )
  }
  className="w-full bg-[#111827]/80 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-500 outline-none focus:border-blue-500"
/>

                    <input
                      type="number"
                      placeholder="Actual Progress %"
                      value={
                        goal.actualAchievement || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          goal.id,
                          "actualAchievement",
                          e.target.value
                        )
                      }
                      className="w-full bg-[#111827]/80 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      <select
                        value={goal.quarter || ""}
                        onChange={(e) =>
                          handleChange(
                            goal.id,
                            "quarter",
                            e.target.value
                          )
                        }
                        className="w-full bg-[#111827]/80 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-blue-500"
                      >

                        <option value="">
                          Select Quarter
                        </option>

                        <option value="Q1">
                          Q1
                        </option>

                        <option value="Q2">
                          Q2
                        </option>

                        <option value="Q3">
                          Q3
                        </option>

                        <option value="Q4">
                          Q4
                        </option>

                      </select>

                      <select
                        value={
                          goal.progressStatus || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            goal.id,
                            "progressStatus",
                            e.target.value
                          )
                        }
                        className="w-full bg-[#111827]/80 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-blue-500"
                      >

                        <option value="">
                          Select Status
                        </option>

                        <option value="ON_TRACK">
                          ON TRACK
                        </option>

                        <option value="AT_RISK">
                          AT RISK
                        </option>

                        <option value="DELAYED">
                          DELAYED
                        </option>

                        <option value="COMPLETED">
                          COMPLETED
                        </option>

                      </select>

                    </div>

                    <textarea
                      placeholder="Employee Comment"
                      value={
                        goal.employeeComment || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          goal.id,
                          "employeeComment",
                          e.target.value
                        )
                      }
                      rows="5"
                      className="w-full bg-[#111827]/80 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />

                    <motion.button

  whileHover={
    isQuarterAllowed(goal.quarter)
      ? { scale: 1.02 }
      : {}
  }

  whileTap={
    isQuarterAllowed(goal.quarter)
      ? { scale: 0.98 }
      : {}
  }

  disabled={
    !isQuarterAllowed(goal.quarter)
  }

  onClick={() =>
    submitCheckin(goal)
  }

  className={`w-full rounded-2xl p-4 font-bold text-lg transition-all duration-300

  ${
    isQuarterAllowed(goal.quarter)

      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-[0_10px_40px_rgba(59,130,246,0.35)]"

      : "bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed opacity-60"
  }
  `}
>

  {
    isQuarterAllowed(goal.quarter)

      ? "Submit Quarterly Check-In"

      : "Check-In Window Closed"
  }

</motion.button>
{
  !isQuarterAllowed(goal.quarter) && (

    <motion.div

      initial={{
        opacity: 0,
        y: 10
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4"
    >

      <p className="text-red-300 text-sm font-medium leading-6">

        Quarterly check-in submission is currently locked for{" "}

        <span className="font-bold text-white">

          {goal.quarter || "this quarter"}

        </span>

        . Please submit updates only during the approved enterprise review window.

      </p>

    </motion.div>
  )
}

                  </div>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </div>
  );
}

export default QuarterlyCheckin;