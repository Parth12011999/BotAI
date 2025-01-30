import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { publicRoutes, protectedRoutes } from "./routes";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"
import { AuthGuard } from "./components/auth-guard";

function AppRoutes() {
  const routes = useRoutes([...publicRoutes, ...protectedRoutes]);
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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}

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
