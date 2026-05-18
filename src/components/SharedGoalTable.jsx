export default function SharedGoalTable() {

  const sharedGoals = [
    {
      id: 1,
      title: "Reduce Operational Cost",
      employees: 3,
      status: "ACTIVE",
    },
    {
      id: 2,
      title: "Improve Customer Satisfaction",
      employees: 5,
      status: "ACTIVE",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-5">

      <h2 className="text-2xl font-bold mb-5">
        Shared KPIs
      </h2>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-gray-200">

            <th className="text-left p-3">
              KPI Title
            </th>

            <th className="text-left p-3">
              Assigned Employees
            </th>

            <th className="text-left p-3">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {sharedGoals.map((goal) => (

            <tr
              key={goal.id}
              className="border-b"
            >

              <td className="p-3">
                {goal.title}
              </td>

              <td className="p-3">
                {goal.employees}
              </td>

              <td className="p-3">
                {goal.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}