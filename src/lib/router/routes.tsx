import type { PathRouteProps } from "react-router-dom";

import Home from "lib/pages/home";
import Login from "lib/pages/login";

export const routes: Array<PathRouteProps> = [
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/signup",
  //   element: <Signup />,
  // },
];

export const privateRoutes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
];
