import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

/*
    Protect any children(react route) from being seen if user is not defined

    - if user is null it redirect to login
    - else the react route is return 
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  console.log("context: ", user);

  useEffect(() => {
    console.log("inside of protected route user = ");
    if (user === null) {
      navigate(`/signin?from=${window.location.pathname}`, { replace: true });
    }
  }, [navigate, user]);

  return children;
};

export default ProtectedRoute;
