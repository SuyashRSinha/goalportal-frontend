import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import EnterpriseLayout from "../components/EnterpriseLayout";

function EmployeeDashboard() {

  // ================================
  // STATES
  // ================================

  const [goals, setGoals] = useState([]);

  const [goalData, setGoalData] = useState({

    employeeEmail:
      localStorage.getItem("email"),

    employeeName: localStorage.getItem("name"),

    thrustArea: "",

    title: "",

    description: "",

    uom: "",

    calculationType:
      "HIGHER_IS_BETTER",

    targetValue: "",

    weightage: "",

    status: "NOT_STARTED",

    approvalStatus: "PENDING",

    locked: false,

    managerComment: ""
  });

  // ================================
  // KPI COUNTS
  // ================================

  const totalGoals =
    goals.length;

  const completedGoals =
    goals.filter(
      (goal) =>
        goal.progressStatus ===
        "COMPLETED"
    ).length;

  const onTrackGoals =
    goals.filter(
      (goal) =>
        goal.progressStatus ===
        "ON_TRACK"
    ).length;

  const delayedGoals =
    goals.filter(
      (goal) =>
        goal.progressStatus ===
        "DELAYED"
    ).length;

  // ================================
  // FETCH GOALS
  // ================================

  const fetchGoals = async () => {

  try {

    const email =
      localStorage.getItem("email");

    const response =
      await api.get(
        `/goals/employee/${email}`
      );

    setGoals(response.data);

  }

  catch (error) {

    console.log(error);

  }

};

  useEffect(() => {

    fetchGoals();

  }, []);

  // ================================
  // HANDLE INPUT CHANGE
  // ================================

  const handleChange = (e) => {

    setGoalData({

      ...goalData,

      [e.target.name]:
        e.target.value
    });
  };

  // ================================
  // MAY 1 RULE
  // ================================

  const isGoalCreationAllowed = () => {

    const today = new Date();

    const currentYear =
      today.getFullYear();

    const mayFirst =
      new Date(currentYear, 4, 1);

    return today >= mayFirst;
  };

  // ================================
  // CREATE GOAL
  // ================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!isGoalCreationAllowed()) {

        alert(
          "Goal creation starts from May 1"
        );

        return;
      }

      try {

        const payload = {

          ...goalData,

          targetValue:
            parseFloat(
              goalData.targetValue
            ),

          weightage:
            parseFloat(
              goalData.weightage
            )
        };

        await api.post(
          "/goals/create",
          payload
        );

        alert(
          "Goal Created Successfully"
        );

        fetchGoals();

        setGoalData({

          employeeEmail:
            localStorage.getItem("email"),

          thrustArea: "",

          title: "",

          description: "",

          uom: "",

          calculationType:
            "HIGHER_IS_BETTER",

          targetValue: "",

          weightage: "",

          status: "NOT_STARTED",

          approvalStatus: "PENDING",

          locked: false,

          managerComment: ""
        });

      }

      catch (error) {

        console.log(error);

        alert(
          "Failed To Create Goal"
        );
      }
    };

  return (

    <EnterpriseLayout>
      {/* HERO SECTION */}

<motion.div

  initial={{
    opacity: 0,
    y: 30
  }}

  animate={{
    opacity: 1,
    y: 0
  }}

  transition={{
    duration: 0.6
  }}

  className="relative overflow-hidden rounded-[32px]
  border border-slate-800
  bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617]
  p-6 sm:p-8 lg:p-10 mb-10
  shadow-[0_0_60px_rgba(59,130,246,0.15)]"
>

  {/* GLOW EFFECTS */}

  <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

  <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>

  <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

    {/* LEFT SIDE */}

    <div>

      <p className="text-blue-400 font-semibold tracking-widest uppercase mb-4 text-sm">

        PERFORMANCE MANAGEMENT

      </p>

      <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-tight mb-5">

        Employee <br />

        KPI Dashboard

      </h1>

      <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-8">

        Manage KPIs, track achievements,
        monitor progress and collaborate
        with managers using enterprise-grade
        workflows.

      </p>

    </div>

    {/* RIGHT SIDE */}

    <div className="flex flex-col sm:flex-row gap-4">

      <button

        onClick={() => {

          window.location.href =
            "/quarterly-checkin";

        }}

        className="bg-gradient-to-r
        from-blue-600 to-indigo-700
        hover:from-blue-500 hover:to-indigo-600
        px-8 py-4 rounded-2xl
        font-bold text-white
        shadow-2xl transition-all duration-300
        hover:scale-105"
      >

        Quarterly Check-In

      </button>

    </div>

  </div>

</motion.div>

{/* KPI CARDS */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

  {/* TOTAL GOALS */}

  <motion.div

    initial={{
      opacity: 0,
      y: 20
    }}

    animate={{
      opacity: 1,
      y: 0
    }}

    whileHover={{
      scale: 1.03
    }}

    className="bg-[#0b1120]/90
    backdrop-blur-xl
    border border-slate-800
    rounded-[28px]
    p-7 shadow-2xl"
  >

    <div className="flex items-center justify-between mb-5">

      <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl">

        📊

      </div>

    </div>

    <p className="text-slate-400 text-sm mb-3">

      Total Goals

    </p>

    <h2 className="text-5xl font-black">

      {totalGoals}

    </h2>

  </motion.div>

  {/* COMPLETED */}

  <motion.div

    initial={{
      opacity: 0,
      y: 20
    }}

    animate={{
      opacity: 1,
      y: 0
    }}

    whileHover={{
      scale: 1.03
    }}

    className="bg-[#0b1120]/90
    backdrop-blur-xl
    border border-slate-800
    rounded-[28px]
    p-7 shadow-2xl"
  >

    <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl mb-5">

      ✅

    </div>

    <p className="text-slate-400 text-sm mb-3">

      Completed

    </p>

    <h2 className="text-5xl font-black text-green-400">

      {completedGoals}

    </h2>

  </motion.div>

  {/* ON TRACK */}

  <motion.div

    initial={{
      opacity: 0,
      y: 20
    }}

    animate={{
      opacity: 1,
      y: 0
    }}

    whileHover={{
      scale: 1.03
    }}

    className="bg-[#0b1120]/90
    backdrop-blur-xl
    border border-slate-800
    rounded-[28px]
    p-7 shadow-2xl"
  >

    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl mb-5">

      🚀

    </div>

    <p className="text-slate-400 text-sm mb-3">

      On Track

    </p>

    <h2 className="text-5xl font-black text-blue-400">

      {onTrackGoals}

    </h2>

  </motion.div>

  {/* DELAYED */}

  <motion.div

    initial={{
      opacity: 0,
      y: 20
    }}

    animate={{
      opacity: 1,
      y: 0
    }}

    whileHover={{
      scale: 1.03
    }}

    className="bg-[#0b1120]/90
    backdrop-blur-xl
    border border-slate-800
    rounded-[28px]
    p-7 shadow-2xl"
  >

    <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center text-2xl mb-5">

      ⚠️

    </div>

    <p className="text-slate-400 text-sm mb-3">

      Delayed

    </p>

    <h2 className="text-5xl font-black text-red-400">

      {delayedGoals}

    </h2>

  </motion.div>

</div>
{/* CREATE GOAL SECTION */}

<motion.div

  initial={{
    opacity: 0,
    y: 30
  }}

  animate={{
    opacity: 1,
    y: 0
  }}

  className="bg-[#0b1120]/90
  backdrop-blur-xl
  border border-slate-800
  rounded-[32px]
  p-6 sm:p-8 lg:p-10
  mb-10 shadow-2xl"
>

  {/* HEADER */}

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

    <div>

      <h2 className="text-3xl sm:text-4xl font-black mb-3">

        Create KPI Goal

      </h2>

      <p className="text-slate-400">

        Define measurable enterprise performance objectives.

      </p>

    </div>

  </div>

  {/* FORM */}

  <form

    onSubmit={(e) => {

      if (!isGoalCreationAllowed()) {

        e.preventDefault();

        alert(
          "Goal creation is only allowed from May 1."
        );

        return;

      }

      handleSubmit(e);

    }}

    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
  >

    {/* EMPLOYEE EMAIL */}

    <input
      type="email"
      name="employeeEmail"
      value={goalData.employeeEmail}
      readOnly
      className="bg-[#111827]
      border border-slate-700
      rounded-2xl p-5
      text-slate-400 outline-none"
    />

    {/* THRUST AREA */}

    <input
      type="text"
      name="thrustArea"
      placeholder="Thrust Area"
      value={goalData.thrustArea}
      onChange={handleChange}
      readOnly={goalData.sharedGoal}
      className="bg-[#111827]
      border border-slate-700
      rounded-2xl p-5
      outline-none
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-500/30"
    />

    {/* TITLE */}

    <input
      type="text"
      name="title"
      placeholder="Goal Title"
      value={goalData.title}
      onChange={handleChange}
      readOnly={goalData.sharedGoal}
      className={`bg-[#111827]
      border border-slate-700
      rounded-2xl p-5
      outline-none transition-all duration-300

      ${
        goalData.sharedGoal

          ? "opacity-60 cursor-not-allowed"

          : "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
      }`}
    />

    {/* UOM */}

    <select
      name="uom"
      value={goalData.uom}
      onChange={handleChange}
      className="bg-[#111827]
      border border-slate-700
      rounded-2xl p-5
      outline-none
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-500/30"
    >

      <option value="">
        Select UOM
      </option>

      <option value="NUMBER">
        NUMBER
      </option>

      <option value="PERCENTAGE">
        PERCENTAGE
      </option>

      <option value="CURRENCY">
        CURRENCY
      </option>

      <option value="BOOLEAN">
        BOOLEAN
      </option>

    </select>

    {/* CALCULATION TYPE */}

    <select
      name="calculationType"
      value={goalData.calculationType}
      onChange={handleChange}
      className="bg-[#111827]
      border border-slate-700
      rounded-2xl p-5
      outline-none
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-500/30"
    >

      <option value="HIGHER_IS_BETTER">
        Higher is Better
      </option>

      <option value="LOWER_IS_BETTER">
        Lower is Better
      </option>

      <option value="ZERO_BASED">
        Zero Based
      </option>

      <option value="TIMELINE">
        Timeline Based
      </option>

    </select>

    {/* TARGET VALUE */}

    <input
      type="number"
      name="targetValue"
      placeholder="Target Value"
      value={goalData.targetValue}
      onChange={handleChange}
      readOnly={goalData.sharedGoal}
      className="bg-[#111827]
      border border-slate-700
      rounded-2xl p-5
      outline-none
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-500/30"
    />

    {/* WEIGHTAGE */}

    <input
      type="number"
      name="weightage"
      placeholder="Weightage"
      value={goalData.weightage}
      onChange={handleChange}
      className="bg-[#111827]
      border border-slate-700
      rounded-2xl p-5
      outline-none
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-500/30"
    />

    {/* DESCRIPTION */}

    <textarea
      rows="6"
      name="description"
      placeholder="Goal Description"
      value={goalData.description}
      onChange={handleChange}
      readOnly={goalData.sharedGoal}
      className="bg-[#111827]
      border border-slate-700
      rounded-2xl p-5
      lg:col-span-2
      outline-none
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-500/30"
    />

    {/* BUTTON WRAPPER */}

    <div className="lg:col-span-2 flex justify-center lg:justify-end">

      <button
        type="submit"

        disabled={!isGoalCreationAllowed()}

        className={`w-full sm:w-[350px]
        rounded-2xl p-4
        font-bold text-lg
        transition-all duration-300

        ${
          isGoalCreationAllowed()

            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"

            : "bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed opacity-60"
        }`}
      >

        {
          isGoalCreationAllowed()

            ? "Create KPI Goal"

            : "Goal Creation Opens May 1"
        }

      </button>

    </div>

  </form>

  {/* MAY 1 MESSAGE */}

  {

    !isGoalCreationAllowed() && (

      <div className="mt-6 rounded-2xl
      border border-yellow-500/20
      bg-yellow-500/10
      px-5 py-4">

        <p className="text-yellow-300 text-sm font-medium leading-6">

          KPI Goal creation officially starts from

          <span className="font-bold text-white">

            {" "}May 1{" "}

          </span>

          according to enterprise governance policy.

        </p>

      </div>

    )

  }

</motion.div>
{/* GOALS HEADER */}

<div className="mb-6">

  <h2 className="text-4xl font-black mb-3">

    Your Goals

  </h2>

  <p className="text-slate-400">

    Monitor all KPI performance metrics.

  </p>

</div>

{

  goals.length === 0

    ? (

      <div className="bg-[#0b1120]
      border border-slate-800
      rounded-[32px]
      p-14 text-center">

        <h2 className="text-3xl font-bold mb-3">

          No Goals Available

        </h2>

        <p className="text-slate-400 text-lg">

          Create your first KPI goal
          to begin tracking performance.

        </p>

      </div>

    )

    : (

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

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
                  y: -5
                }}

                className="bg-[#0b1120]/90
                backdrop-blur-xl
                border border-slate-800
                rounded-[32px]
                p-8 shadow-2xl"
              >

                {/* TOP */}

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-8">

                  <div>

                    <h3 className="text-3xl font-black mb-3">

                      {goal.title}

                    </h3>

                    <p className="text-slate-400 text-lg">

                      {goal.thrustArea}

                    </p>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <span className="bg-blue-500/20 text-blue-300 px-5 py-2 rounded-2xl font-bold text-sm">

                      {goal.status}

                    </span>

                    <span className="bg-yellow-500/20 text-yellow-300 px-5 py-2 rounded-2xl font-bold text-sm">

                      {goal.approvalStatus}

                    </span>

                    {

                      goal.locked && (

                        <span
                          className="bg-red-500/20
                          text-red-300
                          px-5 py-2
                          rounded-2xl
                          font-bold
                          text-sm"
                        >

                          GOAL LOCKED

                        </span>

                      )
                    }

                    {

                      goal.sharedGoal && (

                        <span className="bg-violet-500/20 text-violet-300 px-5 py-2 rounded-2xl font-bold text-sm">

                          SHARED KPI

                        </span>

                      )

                    }

                  </div>

                </div>

                {/* DESCRIPTION */}

                <p className="text-slate-300 leading-8 mb-8">

                  {goal.description}

                </p>

                {/* KPI GRID */}

                <div className="grid grid-cols-2 gap-5 mb-8">

                  {/* TARGET */}

                  <div className="bg-[#111827] rounded-2xl p-5">

                    <p className="text-slate-400 text-sm mb-2">

                      Target

                    </p>

                    <h3 className="text-3xl font-black">

                      {goal.targetValue}

                    </h3>

                  </div>

                  {/* ACHIEVEMENT */}

                  <div className="bg-[#111827] rounded-2xl p-5">

                    <p className="text-slate-400 text-sm mb-2">

                      Achievement

                    </p>

                    <h3 className="text-3xl font-black">

                      {goal.actualAchievement || 0}

                    </h3>

                  </div>

                  {/* WEIGHTAGE */}

                  <div className="bg-[#111827] rounded-2xl p-5">

                    <p className="text-slate-400 text-sm mb-3">

                      Weightage

                    </p>
                                        {

                      goal.sharedGoal

                        ? (

                          <div>

                            <input
                              type="number"
                              value={goal.weightage || ""}
                              readOnly={goal.locked}
                              onChange={(e) => {

                                const updatedGoals =
                                  goals.map((g) =>

                                    g.id === goal.id

                                      ? {

                                          ...g,

                                          weightage:
                                            e.target.value

                                        }

                                      : g
                                  );

                                setGoals(updatedGoals);

                              }}

                              className="w-full
                              bg-[#1e293b]
                              border border-violet-500/30
                              rounded-xl p-3
                              text-2xl font-bold
                              outline-none
                              focus:border-violet-500"
                            />

                            <button

                              disabled={goal.locked}

                              onClick={async () => {

                                try {

                                  await api.put(

                                    `/goals/update-weightage/${goal.id}`,

                                    {
                                      weightage:
                                        goal.weightage
                                    }
                                  );

                                  alert(
                                    "Weightage Updated"
                                  );

                                }

                                catch (error) {

                                  console.log(error);

                                  alert(
                                    "Failed To Update Weightage"
                                  );

                                }

                              }}

                              className={`w-full mt-5
                              rounded-2xl p-4
                              font-semibold
                              transition-all duration-300

                              ${
                                goal.locked

                                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"

                                  : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
                              }
                              `}
                            >

                              {
                                goal.locked

                                  ? "Goal Locked"

                                  : "Update Weightage"
                              }

                            </button>

                          </div>

                        )

                        : (

                          <h3 className="text-3xl font-black">

                            {goal.weightage || 0}%

                          </h3>

                        )

                    }

                  </div>

                  {/* PROGRESS SCORE */}

                  <div className="bg-[#111827] rounded-2xl p-5">

                    <p className="text-slate-400 text-sm mb-2">

                      Progress Score

                    </p>

                    <h3 className="text-3xl font-black text-green-400">

                      {

                        goal.progressScore

                          ? goal.progressScore.toFixed(1)

                          : 0

                      }%

                    </h3>

                  </div>

                </div>

                {/* PLANNED VS ACTUAL */}

                <div className="mb-8">

                  <div className="flex justify-between mb-4">

                    <p className="text-slate-300 font-semibold">

                      Planned vs Actual Progress

                    </p>

                    <p className="text-white font-bold">

                      {goal.actualAchievement || 0}% / {goal.plannedProgress || 0}%

                    </p>

                  </div>

                  {/* PLANNED */}

                  <div className="mb-5">

                    <div className="flex justify-between text-sm mb-2">

                      <span className="text-yellow-400 font-semibold">

                        Planned

                      </span>

                      <span className="text-yellow-400 font-bold">

                        {goal.plannedProgress || 0}%

                      </span>

                    </div>

                    <div className="w-full h-3 bg-[#111827] rounded-full overflow-hidden">

                      <div
                        className="h-3 bg-yellow-500 rounded-full"
                        style={{
                          width: `${goal.plannedProgress || 0}%`
                        }}
                      />

                    </div>

                  </div>

                  {/* ACTUAL */}

                  <div>

                    <div className="flex justify-between text-sm mb-2">

                      <span className="text-green-400 font-semibold">

                        Actual

                      </span>

                      <span className="text-green-400 font-bold">

                        {goal.actualAchievement || 0}%

                      </span>

                    </div>

                    <div className="w-full h-3 bg-[#111827] rounded-full overflow-hidden">

                      <div
                        className={`h-3 rounded-full

                        ${
                          goal.actualAchievement >= goal.plannedProgress

                            ? "bg-green-500"

                            : goal.actualAchievement >=
                              goal.plannedProgress * 0.7

                            ? "bg-yellow-500"

                            : "bg-red-500"
                        }
                        `}
                        style={{
                          width: `${goal.actualAchievement || 0}%`
                        }}
                      />

                    </div>

                  </div>

                </div>

                {/* MANAGER COMMENT */}

                <div className="bg-[#111827] rounded-2xl p-5">

                  <p className="text-slate-400 mb-3">

                    Manager Comment

                  </p>

                  <p className="text-slate-300 leading-7">

                    {

                      goal.managerComment

                        ? goal.managerComment

                        : "No comments yet"

                    }

                  </p>

                </div>

              </motion.div>

            );

          })

        }

      </div>

    )

}

</EnterpriseLayout>

  );

}

export default EmployeeDashboard;
