import { Layout } from "@/components/Layout";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { Suspense } from "react";
import LoginPage from "../app/login/page";
import SignupPage from "../app/signup/page";
import LandingPage from "@/app/(marketing)/page";
import { AuthGuard } from "@/components/auth-guard";

export const publicRoutes = [
  {
    path: "/",
    element: <LandingPage />,
  },
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
    ],
  },
];

// You can add protected routes later
export const protectedRoutes = [
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: "users",
        element: <div>Users Page</div>,
      },
      {
        path: "analytics",
        element: <div>Analytics Page</div>,
      },
      {
        path: "projects",
        element: <div>Projects Page</div>,
      },
      {
        path: "reports",
        element: <div>Reports Page</div>,
      },
      {
        path: "settings",
        element: <div>Settings Page</div>,
      },
    ],
  },
]; 