School Management System - Frontend
///////////////////////
Table of Contents
------------------
Overview
Features
Technologies Used

-----------------------------------------------------------------------------------------------------
Overview
-----------
The frontend for the School Management System is built using React and provides role-based user interfaces for Admin, Office Staff, and Librarian. It enables users to manage student details, fees history, and library records through a responsive and user-friendly dashboard.

---------------------------------------------------------------------------------------------------------
Features
-----------
Role-Based Dashboards:

Admin: Full access to manage staff and student details.
Office Staff: Manage fees and view library records.
Librarian: View-only access to library records and student details.
Responsive Design with Tailwind CSS.
React Router for seamless navigation.
State Management using Redux.

------------------------------------------------------------------------------------------------------------
Technologies Used
------------------
React: Component-based UI.
Redux: State management.
Tailwind CSS: Styling.
Axios: API requests.
React Router: Navigation.

-------------------------------------------------------------------------------------------------------------
Components Overview
--------------------
LoginForm: Handles role-based user authentication.
AdminDashboard: Manage staff accounts and student details.
StaffDashboard: Manage fees and library records.
LibrarianDashboard: View library records and student details.
StudentForm: Form for adding or editing student data.
LibraryHistory: Displays and manages student library records.
FeesHistory: Displays and manages student fees.

-----------------------------------------------------------------------------------------------------------
State Management
----------------
Reducers:
studentReducer: Handles CRUD operations for student data.
libraryReducer: Manages library records.
feesReducer: Manages fees records.
authReducer: Handles authentication and role management.
Redux Store: Centralized store to manage global application state.

-------------------------------------------------------------------------------------------------------------
Future Enhancements
-------------------
Add animations and improved styling for a better user experience.
Enhance error handling and form validations.
Implement analytics for student, fees, and library data.
