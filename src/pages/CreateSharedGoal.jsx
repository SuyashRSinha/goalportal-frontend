import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import EmployeeSelector from "../components/EmployeeSelector";

import { createSharedGoal } from "../services/adminService";

export default function CreateSharedGoal() {

  const [goal, setGoal] = useState({
    thrustArea: "",
    title: "",
    description: "",
    uom: "",
    targetValue: "",
    weightage: 10,
    status: "NOT_STARTED",
    approvalStatus: "PENDING",
    locked: false,
    managerComment: "",
  });

  const [selectedEmployees, setSelectedEmployees] =
    useState([]);

  // TEMPORARY STATIC EMPLOYEE LIST
  const employees = [
    "suyash@gmail.com",
    "employee1@gmail.com",
    "employee2@gmail.com",
  ];

  const handleChange = (e) => {

    setGoal({
      ...goal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {
      goal,
      employeeEmails: selectedEmployees,
    };

    try {

      await createSharedGoal(payload);

      alert("Shared KPI Created Successfully");

    } catch (error) {

      console.error(error);

      alert("Failed To Create Shared KPI");
    }
  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">
            Create Shared KPI
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-5"
          >

            <input
              type="text"
              name="thrustArea"
              placeholder="Thrust Area"
              value={goal.thrustArea}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <input
              type="text"
              name="title"
              placeholder="KPI Title"
              value={goal.title}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={goal.description}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <input
              type="text"
              name="uom"
              placeholder="UOM"
              value={goal.uom}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <input
              type="number"
              name="targetValue"
              placeholder="Target Value"
              value={goal.targetValue}
              onChange={handleChange}
              className="border p-3 rounded"
            />

            <EmployeeSelector
              employees={employees}
              selectedEmployees={selectedEmployees}
              setSelectedEmployees={setSelectedEmployees}
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
            >
              Create Shared KPI
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}