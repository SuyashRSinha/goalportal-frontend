import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

import { motion } from "framer-motion";

import { ArrowLeft } from "lucide-react";

import api from "../services/api";

function AdminAnalyticsDashboard() {

  const [goals, setGoals] = useState([]);

  const [governanceTracking, setGovernanceTracking] =
  useState([]);

  const [governanceData, setGovernanceData] = useState({
    totalGoals: 0,
    completedCheckins: 0,
    pendingCheckins: 0,
    completedGoals: 0,
    onTrackGoals: 0,
    delayedGoals: 0,
    completionRate: 0
  });

  const [showDownloadMessage, setShowDownloadMessage] =
  useState(false);


const exportCSV = () => {

  const reportData = goals.map((goal) => ({

    Employee:
      goal.employeeEmail,

    GoalTitle:
      goal.title,

    ThrustArea:
      goal.thrustArea,

    PlannedTarget:
      goal.targetValue,

    ActualAchievement:
      goal.actualAchievement || 0,

    PlannedProgress:
      goal.plannedProgress || 0,

    ProgressScore:
      goal.progressScore || 0,

    ProgressStatus:
      goal.progressStatus,

    ApprovalStatus:
      goal.approvalStatus,

    Quarter:
      goal.quarter

  }));

  const worksheet =
    XLSX.utils.json_to_sheet(reportData);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "KPI_Report"

  );

  const csvBuffer =
    XLSX.write(workbook, {

      bookType: "csv",

      type: "array"

    });

  const blob = new Blob(

    [csvBuffer],

    {
      type:
        "text/csv;charset=utf-8;"
    }

  );

  saveAs(

    blob,

    "KPI_Report.csv"

  );

};

// ===============================
// EXPORT EXCEL FUNCTION
// ===============================

const exportExcel = () => {

  const reportData = goals.map((goal) => ({

    Employee:
      goal.employeeEmail,

    GoalTitle:
      goal.title,

    ThrustArea:
      goal.thrustArea,

    PlannedTarget:
      goal.targetValue,

    ActualAchievement:
      goal.actualAchievement || 0,

    PlannedProgress:
      goal.plannedProgress || 0,

    ProgressScore:
      goal.progressScore || 0,

    ProgressStatus:
      goal.progressStatus,

    ApprovalStatus:
      goal.approvalStatus,

    Quarter:
      goal.quarter

  }));

  const worksheet =
    XLSX.utils.json_to_sheet(reportData);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "KPI_Analytics"

  );

  const excelBuffer =
    XLSX.write(workbook, {

      bookType: "xlsx",

      type: "array"

    });

  const blob = new Blob(

    [excelBuffer],

    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    }

  );

  saveAs(

    blob,

    "KPI_Analytics_Report.xlsx"

  );

};

  useEffect(() => {

    fetchGoals();

  }, []);

  const fetchGoals = async () => {

    try {

      const response =
        await api.get("/goals");

      setGoals(response.data);

      const governanceSummaryResponse = await api.get("/goals/governance-summary");
      setGovernanceData(governanceSummaryResponse.data);


      const governanceTrackingResponse = await api.get("/goals/governance-tracking");

      setGovernanceTracking(governanceTrackingResponse.data);

    }

    catch (error) {

      console.log(error);

    }
  };

  // APPROVAL DATA

  const approvalData = [

    {
      name: "Approved",
      value: goals.filter(
        (g) =>
          g.approvalStatus === "APPROVED"
      ).length
    },

    {
      name: "Pending",
      value: goals.filter(
        (g) =>
          g.approvalStatus === "PENDING"
      ).length
    },

    {
      name: "Rejected",
      value: goals.filter(
        (g) =>
          g.approvalStatus === "REJECTED"
      ).length
    }

  ];

  // PROGRESS DATA

  const progressData = [

    {

      name: "Not Started",
      value: goals.filter(
        (g) =>
          g.progressStatus?.toUpperCase() === "NOT_STARTED" 
      ).length
    },

    
    {

      name: "Completed",
      value: goals.filter(
        (g) =>
          g.progressStatus?.toUpperCase() === "COMPLETED" 
      ).length
    },

    {
      name: "On Track",
      value: goals.filter(
        (g) =>
          g.progressStatus?.toUpperCase() === "ON_TRACK"
      ).length
    },

    {
      name: "Delayed",
      value: goals.filter(
        (g) =>
          g.progressStatus?.toUpperCase() === "DELAYED"
      ).length
    }

  ];

  // QUARTER DATA

  const quarterData = [

    {
      quarter: "Q1",
      goals: goals.filter(
        (g) => g.quarter === "Q1"
      ).length
    },

    {
      quarter: "Q2",
      goals: goals.filter(
        (g) => g.quarter === "Q2"
      ).length
    },

    {
      quarter: "Q3",
      goals: goals.filter(
        (g) => g.quarter === "Q3"
      ).length
    },

    {
      quarter: "Q4",
      goals: goals.filter(
        (g) => g.quarter === "Q4"
      ).length
    }

  ];

  // COMPLETION RATE

  const completionRate = goals.length > 0

    ? (
        goals.filter(
          (g) =>
            g.progressStatus === "COMPLETED"
        ).length / goals.length
      ) * 100

    : 0;

  const COLORS = [
    "#22c55e",
    "#eab308",
    "#ef4444"
  ];

  return (


    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">

      {
        showDownloadMessage && (

    <motion.div

      initial={{
        opacity: 0,
        y: -30
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      exit={{
        opacity: 0
      }}

      className="fixed top-6 right-6 z-[9999]
      bg-emerald-500/20
      border border-emerald-400/30
      backdrop-blur-2xl
      px-6 py-4 rounded-2xl
      shadow-2xl"
    >

      <p className="text-emerald-300 font-semibold">

        KPI CSV Downloaded Successfully

      </p>

    </motion.div>

  )
      }

      {/* BACKGROUND */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-10 py-6 lg:py-10">

        {/* TOP BAR */}

        <div className="flex items-center justify-between mb-10">

          <motion.button

            whileHover={{
              scale: 1.08
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={() => {

              window.location.href =
                "/admin-dashboard";

            }}

            className="w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl hover:bg-blue-500/20 transition-all duration-300"
          >

            <ArrowLeft size={24} />

          </motion.button>

          <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-sm text-slate-300 font-medium">

            Enterprise Analytics

          </div>
          <button

  onClick={() => {

    window.location.href =
      "/insights-dashboard";

  }}

  className="bg-gradient-to-r
  from-blue-600 to-indigo-700
  hover:from-blue-500 hover:to-indigo-600

  px-6 py-3 rounded-2xl

  font-semibold

  shadow-2xl

  transition-all duration-300
  hover:scale-105"
>

  Graph Insights Dashboard

</button>

          <button

            onClick={() => {

             const link = document.createElement("a");

             link.href = "http://localhost:8080/goals/export/csv";

             link.setAttribute("download", "KPI_Report.csv");

             document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              setShowDownloadMessage(true);

              setTimeout(() => {
                setShowDownloadMessage(false);
              },3000);
            }
          }
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-6 py-3 rounded-2xl font-semibold shadow-2xl transition-all duration-300 hover:scale-105">
            Export KPI CSV
          </button>

          

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

          className="mb-20"
        >

          <h1 className="text-5xl font-black mb-8
          bg-gradient-to-r from-white via-blue-100 to-indigo-300 bg-clip-text text-transparent">

            Admin Analytics Dashboard

          </h1>

          <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">

            Monitor enterprise-wide KPI performance,
            strategic execution,
            quarterly growth,
            and governance controls.

          </p>

        </motion.div>

        {/* TOP STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-14">

          {/* TOTAL */}

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

            <p className="text-slate-400 mb-3">

              Total Goals

            </p>

            <h2 className="text-5xl font-black">

              {goals.length}

            </h2>

          </div>

          {/* APPROVED */}

          <div className="rounded-3xl border border-green-500/20 bg-green-500/10 backdrop-blur-xl p-6">

            <p className="text-green-200 mb-3">

              Approved

            </p>

            <h2 className="text-5xl font-black text-green-300">

              {

                goals.filter(
                  (g) =>
                    g.approvalStatus ===
                    "APPROVED"
                ).length

              }

            </h2>

          </div>

          {/* PENDING */}

          <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 backdrop-blur-xl p-6">

            <p className="text-yellow-200 mb-3">

              Pending

            </p>

            <h2 className="text-5xl font-black text-yellow-300">

              {

                goals.filter(
                  (g) =>
                    g.approvalStatus ===
                    "PENDING"
                ).length

              }

            </h2>

          </div>

          {/* REJECTED */}

          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 backdrop-blur-xl p-6">

            <p className="text-red-200 mb-3">

              Rejected

            </p>

            <h2 className="text-5xl font-black text-red-300">

              {

                goals.filter(
                  (g) =>
                    g.approvalStatus ===
                    "REJECTED"
                ).length

              }

            </h2>

          </div>

          {/* COMPLETION RATE */}

          <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 backdrop-blur-xl p-6">

            <p className="text-blue-200 mb-3">

              Completion Rate

            </p>

            <h2 className="text-5xl font-black text-blue-300">

              {completionRate.toFixed(1)}%

            </h2>

          </div>

        </div>

        <motion.div

  initial={{
    opacity: 0,
    y: 30
  }}

  animate={{
    opacity: 1,
    y: 0
  }}

  className="mt-14"
>

  {/* HEADER */}

  <div className="mt-20">

    <h2 className="text-4xl font-black mb-3">

      Quarterly Governance Tracking

    </h2>

    <p className="text-slate-400 text-lg">

      Real-time enterprise compliance monitoring

    </p>

  </div>

  {/* TABLE */}

  <div className="overflow-x-auto rounded-[32px]
  border border-white/10
  bg-white/5 backdrop-blur-2xl">

    <table className="w-full min-w-[900px]">

      <thead>

        <tr className="border-b border-white/10 text-left">

          <th className="p-6 text-slate-300">
            Employee
          </th>

          <th className="p-6 text-slate-300">
            Goal
          </th>

          <th className="p-6 text-slate-300">
            Quarter
          </th>

          <th className="p-6 text-slate-300">
            Employee Check-in
          </th>

          <th className="p-6 text-slate-300">
            Manager Review
          </th>

          <th className="p-6 text-slate-300">
            Final Status
          </th>

        </tr>

      </thead>

      <tbody>

        {

          governanceTracking.map(

            (item, index) => (

              <tr

                key={index}

                className="border-b border-white/5
                hover:bg-white/5 transition-all duration-300"
              >

                {/* EMPLOYEE */}

                <td className="p-6 font-semibold">

                  {item.employeeEmail}

                </td>

                {/* GOAL */}

                <td className="p-6">

                  {item.goalTitle}

                </td>

                {/* QUARTER */}

                <td className="p-6">

                  {item.quarter || "Q1"}

                </td>

                {/* EMPLOYEE STATUS */}

                <td className="p-6">

                  {

                    item.employeeCompleted

                      ? (

                        <span className="bg-green-500/20
                        text-green-300
                        px-4 py-2 rounded-2xl
                        font-semibold">

                          COMPLETED

                        </span>

                      )

                      : (

                        <span className="bg-red-500/20
                        text-red-300
                        px-4 py-2 rounded-2xl
                        font-semibold">

                          PENDING

                        </span>

                      )

                  }

                </td>

                {/* MANAGER REVIEW */}
                {/* MANAGER REVIEW */}

<td className="p-6">

  {

    item.approvalStatus === "APPROVED"

      ? (

        <span className="bg-green-500/20
        text-green-300
        px-4 py-2 rounded-2xl
        font-semibold">

          APPROVED

        </span>

      )

      : item.approvalStatus === "REJECTED"

      ? (

        <span className="bg-red-500/20
        text-red-300
        px-4 py-2 rounded-2xl
        font-semibold">

          REJECTED

        </span>

      )

      : (

        <span className="bg-yellow-500/20
        text-yellow-300
        px-4 py-2 rounded-2xl
        font-semibold">

          PENDING

        </span>

      )

  }

</td>

{/* FINAL STATUS */}

<td className="p-6">

  <span

    className={`px-5 py-2 rounded-2xl font-bold

    ${
      item.approvalStatus === "APPROVED"

        ? "bg-green-500/20 text-green-300"

        : item.approvalStatus === "REJECTED"

        ? "bg-red-500/20 text-red-300"

        : "bg-yellow-500/20 text-yellow-300"
    }
    `}
  >

    {

      item.approvalStatus === "APPROVED"

        ? "COMPLETED"

        : item.approvalStatus === "REJECTED"

        ? "REJECTED"

        : "MANAGER_PENDING"

    }

  </span>

</td>

                

              </tr>

            )

          )

        }

      </tbody>

    </table>

  </div>

</motion.div>


        {/* GOVERNANCE ANALYTICS */}



<motion.div

  initial={{
    opacity: 0,
    y: 30
  }}

  animate={{
    opacity: 1,
    y: 0
  }}

  className="mt-16 mb-12"
>

  <div className="flex items-center justify-between mb-8">

    <div>

      <h2 className="text-4xl font-black mb-3">

        Governance Overview

      </h2>

      <p className="text-slate-400 text-lg">

        Enterprise quarterly check-in tracking

      </p>

    </div>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

    {/* COMPLETED CHECKINS */}

    <div className="rounded-3xl
    border border-green-500/20
    bg-green-500/10
    backdrop-blur-xl
    p-6 shadow-2xl">

      <p className="text-green-200 mb-3">

        Completed Check-ins

      </p>

      <h2 className="text-5xl font-black text-green-300">

        {
          governanceData.completedCheckins
        }

      </h2>

    </div>

    {/* PENDING */}

    <div className="rounded-3xl
    border border-yellow-500/20
    bg-yellow-500/10
    backdrop-blur-xl
    p-6 shadow-2xl">

      <p className="text-yellow-200 mb-3">

        Pending Check-ins

      </p>

      <h2 className="text-5xl font-black text-yellow-300">

        {
          governanceData.pendingCheckins
        }

      </h2>

    </div>

    {/* COMPLETION RATE */}

    <div className="rounded-3xl
    border border-blue-500/20
    bg-blue-500/10
    backdrop-blur-xl
    p-6 shadow-2xl">

      <p className="text-blue-200 mb-3">

        Completion Rate

      </p>

      <h2 className="text-5xl font-black text-blue-300">

        {
          governanceData.completionRate.toFixed(1)
        }%

      </h2>

    </div>

    {/* DELAYED */}

    <div className="rounded-3xl
    border border-red-500/20
    bg-red-500/10
    backdrop-blur-xl
    p-6 shadow-2xl">

      <p className="text-red-200 mb-3">

        Delayed Goals

      </p>

      <h2 className="text-5xl font-black text-red-300">

        {
          governanceData.delayedGoals
        }

      </h2>

    </div>

  </div>

</motion.div>


        {/* CHARTS */}
        {/* PIE CHART */}

          
          <div className="space-y-8">

  {/* COMPLETED */}

  <div>

    <div className="flex justify-between mb-2">

      <span className="text-green-300 font-semibold">

        Completed Goals

      </span>

      <span className="font-bold">

        {
          goals.filter(
            (g) =>
              g.progressStatus ===
              "COMPLETED"
          ).length
        }

      </span>

    </div>

    <div className="w-full h-4 bg-[#111827] rounded-full overflow-hidden">

      <div
        className="h-4 bg-green-500 rounded-full"
        style={{
          width: `${
            goals.length > 0

              ? (
                  goals.filter(
                    (g) =>
                      g.progressStatus ===
                      "COMPLETED"
                  ).length /

                  goals.length
                ) * 100

              : 0
          }%`
        }}
      />

    </div>

  </div>

  {/* ON TRACK */}

  <div>

    <div className="flex justify-between mb-2">

      <span className="text-blue-300 font-semibold">

        On Track Goals

      </span>

      <span className="font-bold">

        {
          goals.filter(
            (g) =>
              g.progressStatus ===
              "ON_TRACK"
          ).length
        }

      </span>

    </div>

    <div className="w-full h-4 bg-[#111827] rounded-full overflow-hidden">

      <div
        className="h-4 bg-blue-500 rounded-full"
        style={{
          width: `${
            goals.length > 0

              ? (
                  goals.filter(
                    (g) =>
                      g.progressStatus ===
                      "ON_TRACK"
                  ).length /

                  goals.length
                ) * 100

              : 0
          }%`
        }}
      />

    </div>

  </div>

  {/* DELAYED */}

  <div>

    <div className="flex justify-between mb-2">

      <span className="text-red-300 font-semibold">

        Delayed Goals

      </span>

      <span className="font-bold">

        {
          goals.filter(
            (g) =>
              g.progressStatus ===
              "DELAYED"
          ).length
        }

      </span>

    </div>

    <div className="w-full h-4 bg-[#111827] rounded-full overflow-hidden">

      <div
        className="h-4 bg-red-500 rounded-full"
        style={{
          width: `${
            goals.length > 0

              ? (
                  goals.filter(
                    (g) =>
                      g.progressStatus ===
                      "DELAYED"
                  ).length /

                  goals.length
                ) * 100

              : 0
          }%`
        }}
      />

    </div>

  </div>

  {/* NOT STARTED */}

  <div>

    <div className="flex justify-between mb-2">

      <span className="text-slate-300 font-semibold">

        Not Started

      </span>

      <span className="font-bold">

        {
          goals.filter(
            (g) =>
              g.progressStatus ===
              "NOT_STARTED"
          ).length
        }

      </span>

    </div>

    <div className="w-full h-4 bg-[#111827] rounded-full overflow-hidden">

      <div
        className="h-4 bg-slate-500 rounded-full"
        style={{
          width: `${
            goals.length > 0

              ? (
                  goals.filter(
                    (g) =>
                      g.progressStatus ===
                      "NOT_STARTED"
                  ).length /

                  goals.length
                ) * 100

              : 0
          }%`
        }}
      />

    </div>

  </div>

</div>

          {/* BAR CHART */}

          {/* BAR CHART */}


        {/* LINE CHART */}

        {/* LINE CHART */}


        {/* GOAL GOVERNANCE */}

        <div className="mt-20">

          <h2 className="text-4xl font-black mb-8">

            Goal Governance Control

          </h2>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {

              goals.map((goal) => (

                <div
                  key={goal.id}
                  className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8"
                >

                  <div className="flex justify-between items-start mb-6">

                    <div>

                      <h3 className="text-3xl font-black mb-2">

                        {goal.title}

                      </h3>

                      <p className="text-slate-400">

                        {goal.employeeEmail}

                      </p>

                    </div>

                    <div className="px-4 py-2 rounded-2xl bg-blue-500/10 text-blue-300 font-semibold">

                      {goal.progressStatus || "NOT_STARTED"}

                    </div>

                  </div>

                  {/* PLANNED VS ACTUAL */}

                  <div className="grid grid-cols-2 gap-5 mb-6">

                    <div className="bg-[#111827] rounded-2xl p-5">

                      <p className="text-slate-400 mb-2">

                        Planned %

                      </p>

                      <h3 className="text-3xl font-black text-yellow-400">

                        {goal.plannedProgress || 0}%

                      </h3>

                    </div>

                    <div className="bg-[#111827] rounded-2xl p-5">

                      <p className="text-slate-400 mb-2">

                        Actual %

                      </p>

                      <h3 className="text-3xl font-black text-green-400">

                        {goal.actualAchievement || 0}%

                      </h3>

                    </div>

                  </div>

                  {/* LOCK STATUS */}

                  <div className="bg-[#111827] rounded-2xl p-5 mb-6">

                    <p className="text-slate-400 mb-2">

                      Lock Status

                    </p>

                    <h3
                      className={`text-2xl font-black

                      ${
                        goal.locked

                          ? "text-red-400"

                          : "text-green-400"
                      }
                      `}
                    >

                      {
                        goal.locked

                          ? "LOCKED"

                          : "UNLOCKED"
                      }

                    </h3>

                  </div>

                  {/* UNLOCK BUTTON */}

                  {

                    goal.locked && (

                      <button

                        onClick={async () => {

                          try {

                            await api.put(
                              `/goals/unlock/${goal.id}`
                            );

                            alert("Goal Unlocked");

                            fetchGoals();

                          }

                          catch (error) {

                            console.log(error);

                            alert("Failed To Unlock Goal");

                          }

                        }}

                        className="w-full
                        bg-gradient-to-r
                        from-orange-500 to-red-500
                        hover:from-orange-400 hover:to-red-400
                        rounded-2xl p-4
                        font-bold transition-all duration-300"
                      >

                        Unlock Goal

                      </button>

                    )

                  }

                </div>

              ))

            }

          </div>

        </div>

        {/* REAL-TIME GOVERNANCE TRACKING */}



      </div>

    </div>
  );
}

export default AdminAnalyticsDashboard;