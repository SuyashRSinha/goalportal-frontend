import { useEffect, useState } from "react";

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

import EnterpriseLayout from "../components/EnterpriseLayout";
import { ArrowLeft } from "lucide-react";

import api from "../services/api";

function InsightsDashboard() {

  const [goals, setGoals] =
    useState([]);

  useEffect(() => {

    fetchGoals();

  }, []);

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

  // =========================
  // APPROVAL DATA
  // =========================

  const approvalData = [

    {
      name: "Approved",
      value: goals.filter(
        (g) =>
          g.approvalStatus ===
          "APPROVED"
      ).length
    },

    {
      name: "Pending",
      value: goals.filter(
        (g) =>
          g.approvalStatus ===
          "PENDING"
      ).length
    },

    {
      name: "Rejected",
      value: goals.filter(
        (g) =>
          g.approvalStatus ===
          "REJECTED"
      ).length
    }

  ];

  // =========================
  // QUARTER DATA
  // =========================

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

  const COLORS = [
    "#22c55e",
    "#eab308",
    "#ef4444"
  ];

  return (

    <EnterpriseLayout
      title="Insights Dashboard"
      subtitle="Enterprise KPI Visualization"
    >

      <div className="space-y-6">

        {/* HEADER */}

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

  className="rounded-[32px]
  border border-white/10
  bg-[#0f172a]
  backdrop-blur-2xl
  p-8"
>

  {/* TOP ROW */}

  <div className="flex items-center justify-between mb-8">

    {/* BACK BUTTON */}

    <button

      onClick={() => {

        window.location.href =
          "/admin-analytics";

      }}

      className="flex items-center gap-3

      bg-gradient-to-r
      from-slate-700 to-slate-800

      hover:from-slate-600
      hover:to-slate-700

      px-6 py-4
      rounded-2xl

      font-bold text-white

      shadow-2xl

      transition-all duration-300
      hover:scale-105"
    >

      ← Back

    </button>

    {/* BADGE */}

    <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold">

      Enterprise Insights

    </div>

  </div>

  {/* TITLE */}



</motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">

          {/* PIE */}

          <div className="rounded-[32px]
          border border-white/10
          bg-white/5
          backdrop-blur-2xl
          p-8">

            <h2 className="text-3xl font-black mb-6">

              Approval Distribution

            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <PieChart>

                <Pie
                  data={approvalData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >

                  {
                    approvalData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[index %
                            COLORS.length]
                          }
                        />

                      )
                    )
                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* BAR */}

          <div className="rounded-[32px]
          border border-white/10
          bg-white/5
          backdrop-blur-2xl
          p-8">

            <h2 className="text-3xl font-black mb-6">

              Quarterly Goal Distribution

            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart
                data={quarterData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="quarter"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Bar
                  dataKey="goals"
                  fill="#3b82f6"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* LINE */}

        <div className="rounded-[32px]
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-8">

          <h2 className="text-3xl font-black mb-6">

            Quarterly Trends

          </h2>

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <LineChart
              data={quarterData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="quarter"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="goals"
                stroke="#22c55e"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </EnterpriseLayout>
  );
}

export default InsightsDashboard;