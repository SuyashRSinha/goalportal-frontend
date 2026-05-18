import { useState } from "react";
import { createGoal } from "../services/goalService";

export default function CreateGoal() {

  const [goal, setGoal] = useState({
    employeeEmail: "",
    thrustArea: "",
    title: "",
    description: "",
    uom: "",
    targetValue: "",
    weightage: "",
    status: "NOT_STARTED",
    approvalStatus: "PENDING",
    locked: false,
    managerComments: ""
  });

  const handleChange = (e) => {
    setGoal({
      ...goal,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createGoal(goal);

      alert("Goal Created Successfully");

    } catch (error) {

      console.log(error);

      alert("Failed to create goal");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex">

      {/* Sidebar */}
      <aside className="w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 hidden lg:flex flex-col justify-between">

        <div>

          <div className="flex items-center gap-3 mb-10">

            <div className="w-10 h-10 rounded-2xl bg-blue-500 flex items-center justify-center font-bold text-lg">
              G
            </div>

            <div>
              <h1 className="text-xl font-bold">GoalPortal</h1>
              <p className="text-sm text-slate-400">
                Performance System
              </p>
            </div>

          </div>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-bold tracking-tight">
            Create New Goal
          </h1>

          <p className="text-slate-400 mt-2 text-lg">
            Define strategic goals aligned with organizational objectives.
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl shadow-2xl shadow-black/20"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Employee Email */}
            <div>

              <label className="block mb-2 text-sm text-slate-300">
                Employee Email
              </label>

              <input
                type="email"
                name="employeeEmail"
                value={goal.employeeEmail}
                onChange={handleChange}
                placeholder="suyash@gmail.com"
                className="w-full px-4 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-blue-500 outline-none"
              />

            </div>

            {/* Thrust Area */}
            <div>

              <label className="block mb-2 text-sm text-slate-300">
                Thrust Area
              </label>

              <input
                type="text"
                name="thrustArea"
                value={goal.thrustArea}
                onChange={handleChange}
                placeholder="Sales Growth"
                className="w-full px-4 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-blue-500 outline-none"
              />

            </div>

            {/* Goal Title */}
            <div className="md:col-span-2">

              <label className="block mb-2 text-sm text-slate-300">
                Goal Title
              </label>

              <input
                type="text"
                name="title"
                value={goal.title}
                onChange={handleChange}
                placeholder="Increase Quarterly Revenue"
                className="w-full px-4 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-blue-500 outline-none"
              />

            </div>

            {/* Description */}
            <div className="md:col-span-2">

              <label className="block mb-2 text-sm text-slate-300">
                Goal Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={goal.description}
                onChange={handleChange}
                placeholder="Describe the goal..."
                className="w-full px-4 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-blue-500 outline-none resize-none"
              />

            </div>

            {/* UOM */}
            <div>

              <label className="block mb-2 text-sm text-slate-300">
                Unit of Measurement
              </label>

              <select
                name="uom"
                value={goal.uom}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-blue-500 outline-none"
              >

                <option value="">Select</option>
                <option value="NUMERIC">Numeric</option>
                <option value="PERCENTAGE">Percentage</option>
                <option value="TIMELINE">Timeline</option>
                <option value="ZERO">Zero Based</option>

              </select>

            </div>

            {/* Target Value */}
            <div>

              <label className="block mb-2 text-sm text-slate-300">
                Target Value
              </label>

              <input
                type="number"
                name="targetValue"
                value={goal.targetValue}
                onChange={handleChange}
                placeholder="20"
                className="w-full px-4 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-blue-500 outline-none"
              />

            </div>

            {/* Weightage */}
            <div>

              <label className="block mb-2 text-sm text-slate-300">
                Weightage
              </label>

              <input
                type="number"
                name="weightage"
                value={goal.weightage}
                onChange={handleChange}
                placeholder="10"
                className="w-full px-4 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-blue-500 outline-none"
              />

            </div>

            {/* Status */}
            <div>

              <label className="block mb-2 text-sm text-slate-300">
                Status
              </label>

              <select
                name="status"
                value={goal.status}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-blue-500 outline-none"
              >

                <option value="NOT_STARTED">
                  Not Started
                </option>

                <option value="ON_TRACK">
                  On Track
                </option>

                <option value="COMPLETED">
                  Completed
                </option>

              </select>

            </div>

          </div>

          {/* Button */}
          <div className="flex justify-end mt-8">

            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 transition-all font-semibold"
            >
              Create Goal
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}