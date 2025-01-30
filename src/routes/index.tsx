import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import LoginPage from "../app/login/page";
import SignupPage from "../app/signup/page";
import { Layout } from "@/components/Layout";

export const publicRoutes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
];

// You can add protected routes later
export const protectedRoutes = [
  // Example protected route
  // {
  //   path: "/dashboard",
  //   element: <DashboardPage />,
  // },
]; 