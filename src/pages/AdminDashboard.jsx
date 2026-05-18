import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import api from "../services/api";

import EnterpriseLayout from "../components/EnterpriseLayout";

function AdminDashboard() {

  const [goals, setGoals] = useState([]);

  const [selectedGoalId, setSelectedGoalId] =
    useState(null);

  const [employeeEmails, setEmployeeEmails] =
    useState("");

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

  const approvedGoals = goals.filter(

    (goal) => goal.approvalStatus === "APPROVED"

  );

  const totalGoals =
    goals.length;

  const approvedCount =
    goals.filter(
      (goal) =>
        goal.approvalStatus ===
        "APPROVED"
    ).length;

  const pendingCount =
    goals.filter(
      (goal) =>
        goal.approvalStatus ===
        "PENDING"
    ).length;

  const sharedGoals =
    goals.filter(
      (goal) =>
        goal.sharedGoal === true
    ).length;

  const handleShareGoal =
    async () => {

      if (!selectedGoalId) {

        alert("Please select a goal");

        return;
      }

      if (!employeeEmails) {

        alert(
          "Please enter employee emails"
        );

        return;
      }

      try {

        const payload = {

          parentGoalId:
            selectedGoalId,

          employeeEmails:
            employeeEmails
              .split(",")
              .map((email) =>
                email.trim()
              )

        };

        await api.post(
          "/goals/shared",
          payload
        );

        alert(
          "Shared KPI Created Successfully"
        );

        setEmployeeEmails("");

        setSelectedGoalId(null);

        fetchGoals();

      }

      catch (error) {

        console.log(error);

        alert(
          "Failed To Share KPI"
        );

      }

    };

  return (

    <EnterpriseLayout

  title="Admin Dashboard"

  subtitle="Enterprise KPI Governance Platform"

>

  <div className="space-y-6">

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

  className="relative w-full overflow-hidden

  rounded-[32px]

  border border-white/10

  bg-gradient-to-br
  from-[#0f172a]
  via-[#111827]
  to-[#020617]

  p-8 md:p-10

  shadow-[0_0_80px_rgba(59,130,246,0.18)]"
>

  {/* PREMIUM GLOWS */}

  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full" />

  <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_40%)]" />

  <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

    {/* LEFT */}

    <div>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-5">

        Enterprise Control Center

      </div>

      <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5 text-white">

        KPI Governance
        <br />

        <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">

          Dashboard

        </span>

      </h1>

      <p className="text-slate-400 text-lg max-w-2xl leading-8">

        Manage enterprise-wide KPIs,
        monitor approvals,
        share strategic goals,
        and drive organizational
        performance through a modern analytics platform.

      </p>

    </div>

    {/* RIGHT ACTIONS */}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 min-w-[340px]">

      {/* ANALYTICS */}

      <button

        onClick={() => {

          window.location.href =
            "/admin-analytics";

        }}

        className="group relative overflow-hidden

        rounded-3xl

        bg-gradient-to-r
        from-blue-600 to-indigo-700

        p-[1px]

        shadow-2xl

        hover:scale-105

        transition-all duration-300"
      >

        <div className="bg-[#0f172a] rounded-3xl px-6 py-6 h-full flex flex-col items-start hover:bg-transparent transition-all duration-300">

          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl mb-4">

            📊

          </div>

          <span className="text-xl font-black text-white">

            View Analytics & Quarterly Governance Tracking

          </span>

          <span className="text-sm text-slate-400 mt-2 leading-6">

            Insights, reports,
            KPI trends and enterprise performance tracking.

          </span>

        </div>

      </button>

      {/* AUDIT LOG */}

      <button

        onClick={() => {

          window.location.href =
            "/audit-logs";

        }}

        className="group relative overflow-hidden

        rounded-3xl

        bg-gradient-to-r
        from-violet-600 to-fuchsia-700

        p-[1px]

        shadow-2xl

        hover:scale-105

        transition-all duration-300"
      >

        <div className="bg-[#0f172a] rounded-3xl px-6 py-6 h-full flex flex-col items-start hover:bg-transparent transition-all duration-300">

          <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center text-2xl mb-4">

            🛡️

          </div>

          <span className="text-xl font-black text-white">

            View Audit Log

          </span>

          <span className="text-sm text-slate-400 mt-2 leading-6">

            Governance tracking,
            compliance monitoring and admin audit visibility.

          </span>

        </div>

      </button>

    </div>

  </div>

</motion.div>

        {/* KPI STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

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

            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7"
          >

            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />

            <p className="text-slate-400 mb-4 text-sm uppercase tracking-widest">

              Total Goals

            </p>

            <h2 className="text-5xl font-black">

              {totalGoals}

            </h2>

          </motion.div>

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

            className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-green-500/5 backdrop-blur-xl p-7"
          >

            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />

            <p className="text-green-300 mb-4 text-sm uppercase tracking-widest">

              Approved

            </p>

            <h2 className="text-5xl font-black text-green-400">

              {approvedCount}

            </h2>

          </motion.div>

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

            className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-xl p-7"
          >

            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl" />

            <p className="text-yellow-300 mb-4 text-sm uppercase tracking-widest">

              Pending

            </p>

            <h2 className="text-5xl font-black text-yellow-400">

              {pendingCount}

            </h2>

          </motion.div>

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

            className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl p-7"
          >

            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />

            <p className="text-cyan-300 mb-4 text-sm uppercase tracking-widest">

              Shared KPIs

            </p>

            <h2 className="text-5xl font-black text-cyan-400">

              {sharedGoals}

            </h2>

          </motion.div>

        </div>

        {/* APPROVED GOALS */}

        <div>

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl md:text-4xl font-black mb-2">

                Approved Strategic KPIs

              </h2>

              <p className="text-slate-400">

                Share approved KPIs across teams and departments

              </p>

            </div>

          </div>

          {

            approvedGoals.length === 0

              ? (

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-16 text-center">

                  <h3 className="text-3xl font-bold mb-4">

                    No Approved Goals

                  </h3>

                  <p className="text-slate-400 text-lg">

                    Approved KPIs will appear here once managers review goals

                  </p>

                </div>

              )

              : (

                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">

                  {

                    approvedGoals.map((goal) => (

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

                        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
                      >

                        <div className="absolute top-0 right-0 w-52 h-52 bg-blue-500/5 rounded-full blur-3xl" />

                        <div className="relative z-10">

                          {/* TOP */}

                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">

                            <div>

                              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm font-bold mb-4">

                                APPROVED KPI

                              </div>

                              <h2 className="text-3xl font-black mb-3 leading-tight">

                                {goal.title}

                              </h2>

                              <p className="text-slate-400 text-lg">

                                {goal.employeeEmail}

                              </p>

                            </div>

                          </div>

                          {/* DESCRIPTION */}

                          <div className="rounded-2xl bg-[#111827]/60 border border-white/5 p-5 mb-7">

                            <p className="text-slate-300 leading-8">

                              {goal.description}

                            </p>

                          </div>

                          {/* METRICS */}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">

                            <div className="rounded-2xl bg-[#111827]/70 border border-white/5 p-5">

                              <p className="text-slate-400 mb-2 text-sm">

                                TARGET VALUE

                              </p>

                              <h3 className="text-3xl font-black">

                                {goal.targetValue}

                              </h3>

                            </div>

                            <div className="rounded-2xl bg-[#111827]/70 border border-white/5 p-5">

                              <p className="text-slate-400 mb-2 text-sm">

                                WEIGHTAGE

                              </p>

                              <h3 className="text-3xl font-black text-blue-400">

                                {goal.weightage}%

                              </h3>

                            </div>

                          </div>

                          {/* THRUST AREA */}

                          <div className="rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/10 p-5 mb-8">

                            <p className="text-blue-300 mb-2 text-sm font-semibold">

                              THRUST AREA

                            </p>

                            <h3 className="text-xl font-bold">

                              {goal.thrustArea}

                            </h3>

                          </div>

                          {/* SHARE */}

                          <div>

                            <p className="text-lg font-semibold mb-4">

                              Share KPI Across Employees

                            </p>

                            <textarea
                              rows="4"
                              placeholder="employee1@gmail.com, employee2@gmail.com"
                              value={
                                selectedGoalId === goal.id
                                  ? employeeEmails
                                  : ""
                              }
                              onChange={(e) => {

                                setSelectedGoalId(
                                  goal.id
                                );

                                setEmployeeEmails(
                                  e.target.value
                                );

                              }}
                              className="w-full bg-[#111827]/80 border border-slate-700 rounded-2xl p-5 mb-5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                            />

                            <button
                              onClick={handleShareGoal}
                              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 p-5 rounded-2xl text-lg font-bold hover:scale-[1.01] transition-all duration-300 shadow-[0_10px_40px_rgba(59,130,246,0.35)]"
                            >

                              Share KPI Enterprise Wide

                            </button>

                          </div>

                        </div>

                      </motion.div>

                    ))

                  }

                </div>

              )

          }

        </div>

      </div>

    </EnterpriseLayout>

  );

}

export default AdminDashboard;