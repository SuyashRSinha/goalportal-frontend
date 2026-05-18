export default function Navbar() {

  // GET ROLE FROM LOCAL STORAGE
  const role = localStorage.getItem("role");

  return (

    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-gray-800">
        KPI Management Portal
      </h1>

      <div>

        <span className="text-gray-600 font-medium">

          Welcome{" "}

          {role === "ADMIN" && "Admin"}
          {role === "MANAGER" && "Manager"}
          {role === "EMPLOYEE" && "Employee"}

        </span>

      </div>

    </div>
  );
}