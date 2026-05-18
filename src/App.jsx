import { Routes , Route } from "react-router-dom";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateGoal from "./pages/CreateGoal";
import CreateSharedGoal from "./pages/CreateSharedGoal";
import QuarterlyCheckin from "./pages/QuaterlyCheckin";
import ManagerReviewDashboard from "./pages/ManagerReviewDashboard";
import AdminAnalyticsDashboard from "./pages/AdminAnalyticsDashboard";
import AuditLogsDashboard from "./pages/AuditLogDashboard";
import MicrosoftLogin from "./pages/MicrosoftLogin";
import InsightsDashboard from "./pages/InsightsDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/employee-dashboard" element={
          <EmployeeDashboard />
      } />
      <Route path="/manager-dashboard" element={
          <ManagerDashboard />
      } />
      <Route path="/admin-dashboard" element={
          <AdminDashboard />
      } />
      <Route path="/create-goal" element={
          <CreateGoal />
      } />
      <Route path="/create-shared-goal" element={
          <CreateSharedGoal />
      } />
      <Route path="/quarterly-checkin" element={
          <QuarterlyCheckin />
      } />
      <Route path="/manager-review" element={
          <ManagerReviewDashboard />
      } />  
      <Route path="/admin-analytics" element={
          <AdminAnalyticsDashboard />
      } />
      <Route path="/audit-logs" element={
          <AuditLogsDashboard />
      } />
      <Route path="/microsoft-login" element={
          <MicrosoftLogin />
      } />
      <Route
  path="/insights-dashboard"
  element={<InsightsDashboard />}
/>
    </Routes> 
  );
}

export default App;
