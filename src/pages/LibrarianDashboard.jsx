import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const LibrarianDashboard = () => {
    const location = useLocation();
    const role = location.state?.role; // Retrieve role from the state passed via Link

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            {/* Dashboard Header */}
            <header className="text-center text-4xl font-bold text-blue-900 mb-10">
                Librarian Dashboard
            </header>

            {/* Main Dashboard Content */}
            <div className="flex flex-wrap justify-center gap-8">
                {/* Link to Library page */}
                <Link
                    to={{ pathname: '/libraryhistory', state: { role: 'Librarian' } }}
                    className="w-60 h-40 flex items-center justify-center bg-white border-4 border-blue-900 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-[-4px] transition transform"
                >
                    <div className="text-2xl font-semibold text-blue-900 text-center">Library History</div>
                </Link>

                {/* Link to Students page */}
                <Link
                    to={{ pathname: '/studentlist', state: { role: 'Librarian' } }}
                    className="w-60 h-40 flex items-center justify-center bg-white border-4 border-blue-900 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-[-4px] transition transform"
                >
                    <div className="text-2xl font-semibold text-blue-900 text-center">Student Details</div>
                </Link>

                {/* Link to fees history page */}
                <Link
                    to={{ pathname: '/feehistory', state: { role: 'Librarian' } }}
                    className="w-60 h-40 flex items-center justify-center bg-white border-4 border-blue-900 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-[-4px] transition transform"
                >
                    <div className="text-2xl font-semibold text-blue-900 text-center">Fees History</div>
                </Link>
            </div>
        </div>
    );
};

export default LibrarianDashboard;
