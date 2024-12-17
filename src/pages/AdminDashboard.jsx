import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();
  const role = location.state?.role; // Retrieve role from the state passed via Link

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
  {/* Dashboard Header */}
  <header className="text-center text-4xl font-bold text-blue-900 mb-10">
    Admin Dashboard
  </header>

  {/* Main Dashboard Content */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {/* Users Section */}
    <Link
      to="/userlist"
      className="w-60 h-40 bg-white border-4 border-blue-900 rounded-lg shadow-[4px_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_14px_rgba(0,0,0,0.4)] hover:translate-y-[-4px] transition-transform transform flex items-center justify-center"
    >
      <div className="text-2xl font-semibold text-blue-900">Users</div>
    </Link>

    {/* Student Details Section */}
    <Link
      to={{ pathname: '/studentlist', state: { role: 'Admin' } }}
      className="w-60 h-40 bg-white border-4 border-blue-900 rounded-lg shadow-[4px_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_14px_rgba(0,0,0,0.4)] hover:translate-y-[-4px] transition-transform transform flex items-center justify-center"
    >
      <div className="text-2xl font-semibold text-blue-900">Student Details</div>
    </Link>

    {/* Fees History Section */}
    <Link
      to={{ pathname: '/feehistory', state: { role: 'Admin' } }}
      className="w-60 h-40 bg-white border-4 border-blue-900 rounded-lg shadow-[4px_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_14px_rgba(0,0,0,0.4)] hover:translate-y-[-4px] transition-transform transform flex items-center justify-center"
    >
      <div className="text-2xl font-semibold text-blue-900">Fees History</div>
    </Link>

    {/* Library History Section */}
    <Link
      to={{ pathname: '/libraryhistory', state: { role: 'Admin' } }}
      className="w-60 h-40 bg-white border-4 border-blue-900 rounded-lg shadow-[4px_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_14px_rgba(0,0,0,0.4)] hover:translate-y-[-4px] transition-transform transform flex items-center justify-center"
    >
      <div className="text-2xl font-semibold text-blue-900">Library History</div>
    </Link>
  </div>
</div>

  );
};

export default AdminDashboard;
