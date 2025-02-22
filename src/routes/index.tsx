import LandingPage from "@/app/(marketing)/page";
import { Layout } from "@/components/Layout";
import { AuthGuard } from "@/components/auth-guard";
import { ChatInterface } from "@/components/chat/chat-interface";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Suspense } from "react";
import LoginPage from "../app/login/page";
import SignupPage from "../app/signup/page";

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
        <DashboardLayout>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: "/chat/:botId",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <ChatInterface />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
]; 