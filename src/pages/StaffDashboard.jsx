import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const StaffDashboard = () => {
  const location = useLocation();
  const role = location.state?.role; // Retrieve role from the state passed via Link

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Dashboard Header */}
      <header className="text-center text-4xl font-bold text-blue-900 mb-10">
        Office Staff Dashboard
      </header>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {/* Student Details Section */}
        <Link
          to={{ pathname: "/studentlist", state: { role: "OfficeStaff" } }}
          className="w-60 h-40 bg-white border-4 border-yellow-500 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-[-4px] transition transform flex items-center justify-center"
        >
          <div className="text-2xl font-semibold text-yellow-500">
            Student Details
          </div>
        </Link>

        {/* Fees History Section */}
        <Link
          to={{ pathname: "/feehistory", state: { role: "OfficeStaff" } }}
          className="w-60 h-40 bg-white border-4 border-yellow-500 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-[-4px] transition transform flex items-center justify-center"
        >
          <div className="text-2xl font-semibold text-yellow-500">
            Fees History
          </div>
        </Link>

        {/* Library History Section */}
        <Link
          to={{ pathname: "/libraryhistory", state: { role: "OfficeStaff" } }}
          className="w-60 h-40 bg-white border-4 border-yellow-500 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-[-4px] transition transform flex items-center justify-center"
        >
          <div className="text-2xl font-semibold text-yellow-500">
            Library History
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StaffDashboard;
