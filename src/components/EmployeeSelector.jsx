export default function EmployeeSelector({ employees, 
    selectedEmployees,
    setSelectedEmployees }) {

        const handleChange = (email) => {

            if(selectedEmployees.includes(email)) {
                setSelectedEmployees(selectedEmployees.filter((emp) => emp !== email)
            );
            }
            else {
                setSelectedEmployees([...selectedEmployees, 
                    email,
                 ]);
        }
    };

     return (
    <div className="bg-white border rounded-lg p-4">

      <h2 className="text-lg font-semibold mb-4">
        Select Employees
      </h2>

      <div className="flex flex-col gap-3">

        {employees.map((employee) => (

          <label
            key={employee}
            className="flex items-center gap-2"
          >

            <input
              type="checkbox"
              checked={selectedEmployees.includes(employee)}
              onChange={() => handleChange(employee)}
            />

            <span>{employee}</span>

          </label>

        ))}

      </div>
    </div>
  );

}