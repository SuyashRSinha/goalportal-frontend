import { Link } from "react-router-dom";

export default function Sidebar() {

  return (

    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        KPI Portal
      </h1>

      <div className="flex flex-col gap-4">

        <Link
          to="/employee"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Employee Dashboard
        </Link>

        <Link
          to="/manager"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Manager Dashboard
        </Link>

        <Link
          to="/admin"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Admin Dashboard
        </Link>

        <Link
          to="/admin/create-shared-goal"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Create Shared KPI
        </Link>

      </div>

    </div>
  );
}