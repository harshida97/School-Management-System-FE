import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, deleteStudent } from '../../actions/studentActions';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const StudentList = () => {
  const location = useLocation();

  // Try to get the role from location state or fallback to localStorage
  const role = location.state?.role || localStorage.getItem('role') || 'Guest';


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

   // Log role and libraryRecords after they have been fetched
    useEffect(() => {
      console.log('Role:', role);
      console.log('student list:', students);
    }, [role, students]);

  const handleAddStudent = () => {
    navigate('/addstudent'); // Change the URL to the Add Student form page
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id)); // Assumes deleteStudent action is implemented
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-student/${id}`); // Redirect to update form
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
  
    
   <div className="bg-gray-100 min-h-screen flex items-center justify-center">
  <div className="w-full max-w-5xl p-1">
    {/* Heading */}
    <h2 className="text-2xl  font-bold mb-8 text-center">Student List</h2>

    {/* Table */}
    <div className="flex justify-center">
      <table className="table-auto bg-gray-200 w-full shadow-md rounded">
        <thead>
          <tr className="bg-blue-500 text-white text-center">
            <th className="px-4 py-2">Student Id</th>
            <th className="px-4 py-2">Student Name</th>
            <th className="px-4 py-2">Class</th>
            <th className="px-4 py-2">Division</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Email</th>
            {(role === "Admin" || role === "OfficeStaff") && (
              <th className="px-4 py-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr className="text-center" key={student._id}>
              <td className="border px-4 py-2">{student._id}</td>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.class}</td>
              <td className="border px-4 py-2">{student.division}</td>
              <td className="border px-4 py-2">{student.age}</td>
              <td className="border px-4 py-2">{student.email}</td>
              {role !== "Librarian" && (
                <td className="border px-4 py-2">
                  {role === "OfficeStaff" && (
                    <>
                      <button
                        onClick={() => handleUpdate(student._id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-500 text-black px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {role === "Admin" && (
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Add New Student Button */}
    {role === "OfficeStaff" && (
      <div className="text-center mt-6">
        <button
          onClick={handleAddStudent}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New Student
        </button>
      </div>
    )}
  </div>
</div>

  );
};

export default StudentList;
