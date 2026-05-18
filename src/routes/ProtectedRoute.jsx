import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (!token || token === "undefined") {
    return <Navigate to="/" />;
  }                 
    return children;
}

export default ProtectedRoute;