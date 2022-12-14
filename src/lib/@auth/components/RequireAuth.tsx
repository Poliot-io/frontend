import { getJWT } from "lib/@feathers/utils.js";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const RequireAuth = ({
  children,
  redirectTo = "/login",
}: PrivateRouteProps) => {
  let isAuthenticated = null;
  const token = getJWT();

  isAuthenticated = token ? true : false;

  return isAuthenticated ? (
    (children as React.ReactElement)
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RequireAuth;
