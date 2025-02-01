import { BrowserRouter, useRoutes, Navigate } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { publicRoutes, protectedRoutes } from "./routes";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"
import { useAuthStore } from "./store/auth.store";

function AppRoutes() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  // Redirect to dashboard if already authenticated and trying to access public routes
  const routes = useRoutes([
    ...publicRoutes,
    ...protectedRoutes,
    {
      path: "*",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />,
    },
  ]);
  
  return routes;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AppRoutes />
          </ThemeProvider>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
