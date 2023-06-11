import React from 'react';
import { Route, Navigate, useNavigate, Link } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the user is authenticated
  const userRoles = localStorage.getItem('role'); // Retrieve the user's roles
  const navigate = useNavigate(); // Hook to navigate to a different route

  if (isAuthenticated && roles.includes(userRoles)) {
    return <Component {...rest} />;
  } else {
    navigate('/login'); // Redirect to the login page
    return <AccessDenied />; // Render a <Navigate> component to perform the redirect
  }
};
function AccessDenied() {
  return (
    <div className="forbiddenPage">
      <div></div>
      <h1>
        <span className="forbiddenTitle">401</span> - Forbidden
      </h1>
      <p>
        You are not allow to access this page. <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
export default PrivateRoute;